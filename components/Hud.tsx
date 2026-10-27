"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { N, QT, STAGES } from "@/lib/stages";
import { cleanLabel, useProgress } from "@/lib/progress";
import { HUD_SUB } from "@/lib/modeLabels";
import { Ema } from "./Ill";

/**
 * 店の明かりは「できているか」で灯す。
 * 知っているか（クイズ）では灯さない。そこを混ぜると、
 * 全問正解しただけでクリーンな店に見えてしまう。
 */
function Storefront({ lit, max, allDone }: { lit: number; max: number; allDone: boolean }) {
  const wins = [
    [17, 35], [27, 35], [37, 35], [47, 35], [57, 35],
    [17, 46], [27, 46], [50, 46], [60, 46],
  ];
  // 点検の達成率に応じて、窓を順に灯す
  const on = max > 0 ? Math.round((lit / max) * wins.length) : 0;
  return (
    <div className={`store${allDone ? " done" : ""}`} aria-hidden="true">
      <svg className="ill" viewBox="0 0 84 72">
        <path d="M8 30 L14 14 H70 L76 30" />
        <path d="M12 30 V64 H72 V30" />
        <path d="M4 64 H80" />
        {wins.map(([x, y], i) => (
          <rect key={i} className={`win${i < on ? " on" : ""}`} x={x} y={y} width="7" height="7" />
        ))}
        <rect className={`win${allDone ? " on" : ""}`} x="38" y="18" width="8" height="8" rx="4" />
        <path d="M36 64 V48 h10 V64" />
        <path className="spark" d="M6 8 v8 M2 12 h8" />
        <path className="spark" d="M78 6 v8 M74 10 h8" />
        <path className="spark" d="M42 0 v6 M39 3 h6" />
      </svg>
    </div>
  );
}

const TITLE = "ポーカー法令クエスト";

export function Hud() {
  const { ready, mode, setMode, clean, score, learned, reset } = useProgress();
  const allDone = clean.target > 0 && clean.todo === 0 && clean.criticalClear;
  /* HUD はどのページにも出る。トップ以外では、ここがホームへの戻り口になる。
     トップで自分自身へのリンクを出しても意味がないので、そこだけ素のままにする。 */
  const atHome = usePathname() === "/";

  return (
    <header className="hud">
      <Storefront lit={clean.done} max={clean.target} allDone={allDone} />
      <div>
        <div className="ttl">
          <span className="guide">
            <Ema mood={allDone ? "cheer" : "idle"} />
          </span>
          <h1>{atHome ? TITLE : <Link href="/">{TITLE}</Link>}</h1>
        </div>
        <p className="sub">{HUD_SUB[mode]}</p>
        {!atHome && (
          <Link className="tohome" href="/">
            ← ロードマップへもどる
          </Link>
        )}
      </div>

      <div className="meter">
        {/* ① できているか＝クリーン判定。店の明かりはこちらで灯る */}
        <div className="row">
          <span className="rank">{ready ? cleanLabel(clean) : "読み込み中"}</span>
          <span className="cnt">
            クリーン判定　できている {ready ? clean.done : 0} / {ready ? clean.target : 0} 項目
            {ready && clean.openCritical.length > 0 && (
              <b className="warn">　必須の未点検 {clean.openCritical.length}</b>
            )}
          </span>
        </div>
        <div className="segs">
          {STAGES.map((s, i) => {
            const filled = clean.target > 0 && i < Math.round((clean.done / clean.target) * N);
            return <i key={s.id} className={filled ? "on" : ""} />;
          })}
        </div>

        {/* ② 知っているか＝リテラシー。明かりとは関係させない */}
        <div className="row">
          <span className="cnt alt">
            リテラシー　1回で正解 {ready ? score.good : 0} / {QT} 問
            <span className="dim">　／　読んだステップ {ready ? learned : 0} / {N}</span>
          </span>
        </div>

        <div className="row">
          <div className="modesw" role="group" aria-label="モードの切り替え">
            <button
              type="button"
              className={mode === "shop" ? "on" : ""}
              onClick={() => setMode("shop")}
            >
              運営者
            </button>
            <button
              type="button"
              className={mode === "both" ? "on" : ""}
              onClick={() => setMode("both")}
            >
              お客さん
            </button>
          </div>
          <button
            className="reset"
            type="button"
            onClick={() => {
              if (confirm("点検結果・クイズの点・進み具合を、すべて消します。よろしいですか？")) reset();
            }}
          >
            はじめから
          </button>
        </div>
      </div>
    </header>
  );
}
