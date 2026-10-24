"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { N, QT, STAGES } from "./stages";
import { allChecks, CHECKS, type Check, type Who } from "./checks";

const KEY = "pq-state-v4";
/** 旧バージョンの保存キー。進み具合だけ引き継ぐ */
const LEGACY_V3 = "pq-state-v3";
const LEGACY_V2 = "pq-clean-v2";

/**
 * ステップを順番どおりにしか開けなくするか。
 * いまは false。どのステップにも直接いけるようにしている。
 * 順番を強制したくなったら true に戻す（ロードマップとページ送りの両方が追従する）。
 */
export const GATE_STEPS = false;

export const qkey = (id: string, i: number) => `${id}:${i}`;

/** チェック項目の状態。「該当しない」を用意しないと、大会をやらない店が永久にクリーンにならない */
export type CheckState = "yes" | "na";

export type Progress = {
  /** クイズをクリアしたステップ（＝学習の進み。クリーン判定とは別） */
  cleared: string[];
  /** 1回目で正解できた設問（＝リテラシーの点） */
  first: string[];
  /** 一度でも間違えた設問 */
  missed: string[];
  /** チェック項目の状態（＝クリーン判定のもと） */
  checks: Record<string, CheckState>;
  /** 運営者モードか、お客さんモードか */
  mode: Who;
  /** localStorage を読み終えたか */
  ready: boolean;
};

const EMPTY: Progress = {
  cleared: [],
  first: [],
  missed: [],
  checks: {},
  mode: "shop",
  ready: false,
};

/* ── モジュール内に1つだけ状態を置き、全コンポーネントで共有する。
      各コンポーネントの useState にすると、クイズに正解しても
      HUD やロードマップが更新されない。 ── */
let state: Progress = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const o = JSON.parse(raw) as Partial<Progress>;
      return {
        cleared: (o.cleared ?? []).filter((id) => STAGES.some((s) => s.id === id)),
        first: o.first ?? [],
        missed: o.missed ?? [],
        checks: o.checks ?? {},
        mode: o.mode === "both" ? "both" : "shop",
        ready: true,
      };
    }
    const v3 = localStorage.getItem(LEGACY_V3);
    if (v3) {
      const o = JSON.parse(v3) as Partial<Progress>;
      return { ...EMPTY, cleared: o.cleared ?? [], first: o.first ?? [], missed: o.missed ?? [], ready: true };
    }
    const v2 = localStorage.getItem(LEGACY_V2);
    if (v2) return { ...EMPTY, cleared: JSON.parse(v2) as string[], ready: true };
  } catch {
    /* 壊れた保存データは無視して、まっさらから始める */
  }
  return { ...EMPTY, ready: true };
}

function setState(next: Progress) {
  state = next;
  try {
    const { ready: _ready, ...rest } = next;
    localStorage.setItem(KEY, JSON.stringify(rest));
  } catch {
    /* プライベートモード等で保存できなくても、画面は動かす */
  }
  emit();
}

/** 見るべきチェック項目。お客さんモードでは、客が見分けられる項目だけ */
export function visibleChecks(mode: Who, stageId?: string): Check[] {
  const list = stageId ? (CHECKS[stageId] ?? []) : allChecks();
  return mode === "shop" ? list : list.filter((c) => c.who === "both");
}

export type CleanResult = {
  /** 「該当しない」を除いた対象の数 */
  target: number;
  /** できている数 */
  done: number;
  /** まだ見ていない数 */
  todo: number;
  /** できていない、かつ critical な項目 */
  openCritical: Check[];
  /** 0〜1 */
  rate: number;
  /** critical がすべて埋まっているか */
  criticalClear: boolean;
};

function evaluate(p: Progress, mode: Who): CleanResult {
  const list = visibleChecks(mode);
  let target = 0;
  let done = 0;
  const openCritical: Check[] = [];
  for (const c of list) {
    const st = p.checks[c.id];
    if (st === "na") continue;
    target++;
    if (st === "yes") done++;
    else if (c.critical) openCritical.push(c);
  }
  return {
    target,
    done,
    todo: target - done,
    openCritical,
    rate: target ? done / target : 0,
    criticalClear: openCritical.length === 0,
  };
}

/**
 * 進み具合・リテラシー・クリーン判定。
 * サーバー描画との食い違いを避けるため、サーバー側は必ず空を返す。
 */
export function useProgress() {
  const p = useSyncExternalStore(
    subscribe,
    () => state,
    () => EMPTY,
  );

  useEffect(() => {
    if (loaded) return;
    loaded = true;
    state = load();
    emit();
  }, []);

  // 別のタブで進めた場合にも追従する
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      state = load();
      emit();
    };
    addEventListener("storage", onStorage);
    return () => removeEventListener("storage", onStorage);
  }, []);

  const clearStage = useCallback((id: string) => {
    setState({ ...state, cleared: [...new Set([...state.cleared, id])] });
  }, []);

  /** 一度も間違えずに当てた設問だけを点にする */
  const answer = useCallback((id: string, i: number, correct: boolean) => {
    const k = qkey(id, i);
    if (correct) {
      if (state.missed.includes(k)) return;
      setState({ ...state, first: [...new Set([...state.first, k])] });
      return;
    }
    setState({ ...state, missed: [...new Set([...state.missed, k])] });
  }, []);

  /** チェック項目を 未 → できている → 該当しない → 未 と回す */
  const toggleCheck = useCallback((id: string, to?: CheckState | "clear") => {
    const cur = state.checks[id];
    const next: CheckState | undefined =
      to === "clear" ? undefined : to ? to : cur === undefined ? "yes" : cur === "yes" ? "na" : undefined;
    const checks = { ...state.checks };
    if (next) checks[id] = next;
    else delete checks[id];
    setState({ ...state, checks });
  }, []);

  const setMode = useCallback((mode: Who) => setState({ ...state, mode }), []);

  const reset = useCallback(() => setState({ ...EMPTY, mode: state.mode, ready: true }), []);
  const resetChecks = useCallback(() => setState({ ...state, checks: {} }), []);

  const cleared = new Set(p.cleared);
  const isOpen = (i: number) => !GATE_STEPS || i === 0 || cleared.has(STAGES[i - 1].id);
  /** まだクリアしていない最初のステップ＝次にやるところ。ここだけ目立たせる */
  const nextIdx = STAGES.findIndex((s) => !cleared.has(s.id));
  const answered = new Set([...p.first, ...p.missed]).size;
  const rate = answered ? p.first.length / answered : 0;

  return {
    ready: p.ready,
    progress: p,
    mode: p.mode,
    setMode,
    cleared,
    isOpen,
    nextIdx,
    clearStage,
    answer,
    toggleCheck,
    reset,
    resetChecks,
    /** リテラシー＝知っているか */
    score: { good: p.first.length, answered, rate, total: QT },
    /** クリーン判定＝できているか */
    clean: evaluate(p, p.mode),
    /** 学習の進み */
    learned: cleared.size,
    learnedAll: cleared.size === N,
  };
}

/** リテラシーの評価。答えた数に対する「1回で正解」の割合で決める */
export function gradeLabel(rate: number, answered: number) {
  if (!answered) return "これから";
  if (rate >= 1) return "よく分かっています";
  if (rate >= 0.8) return "だいたい分かっています";
  if (rate >= 0.5) return "もう少し";
  return "読み直してみよう";
}

/** クリーン判定の見出し。自己点検の結果であって、適法性の保証ではない */
export function cleanLabel(c: CleanResult) {
  if (!c.target) return "これから";
  if (c.todo > 0 && !c.criticalClear) return "直すところがあります";
  if (c.todo > 0) return "あと少し";
  return "点検ずみ";
}
