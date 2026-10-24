"use client";

import Link from "next/link";
import { STAGES, type Stage } from "@/lib/stages";
import { stepNo } from "@/lib/modeLabels";
import { GATE_STEPS, useProgress } from "@/lib/progress";

/**
 * まえ／つぎのステップ。
 *
 * ロードマップでは未開放のステップを押せなくしているので、ここも同じ扱いにする。
 * 片方だけ飛べてしまうと、順番に意味がなくなる。
 */
export function Pager({ stage: s }: { stage: Stage }) {
  const { ready, cleared } = useProgress();
  const idx = STAGES.findIndex((x) => x.id === s.id);
  const prev = idx > 0 ? STAGES[idx - 1] : null;
  const next = idx < STAGES.length - 1 ? STAGES[idx + 1] : null;
  // いまは順番を強制していない（GATE_STEPS）。戻したくなったらフラグだけ変える
  const nextOpen = !GATE_STEPS || !ready || cleared.has(s.id);

  return (
    <nav className="pager" aria-label="ステップの移動">
      {prev ? (
        <Link className="pg prev" href={`/step/${prev.id}/`}>
          <span className="dir">◀　まえのステップ</span>
          <span className="st">{stepNo(prev.tag)}</span>
          <span className="nm">{prev.name}</span>
        </Link>
      ) : (
        <Link className="pg prev" href="/">
          <span className="dir">◀　もどる</span>
          <span className="st">はじめに</span>
          <span className="nm">3つの関門を、1つずつ</span>
        </Link>
      )}

      {next ? (
        nextOpen ? (
          <Link className="pg next" href={`/step/${next.id}/`}>
            <span className="dir">つぎのステップ　▶</span>
            <span className="st">{stepNo(next.tag)}</span>
            <span className="nm">{next.name}</span>
          </Link>
        ) : (
          <span className="pg next lock" aria-disabled="true">
            <span className="dir">つぎのステップ　▶</span>
            <span className="st">{stepNo(next.tag)}</span>
            <span className="nm">{next.name}</span>
            <span className="why">上のクイズに正解すると開きます</span>
          </span>
        )
      ) : (
        <Link className="pg next" href="/">
          <span className="dir">おわり　▶</span>
          <span className="st">ロードマップ</span>
          <span className="nm">はじめに戻る</span>
        </Link>
      )}
    </nav>
  );
}
