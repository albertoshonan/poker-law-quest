"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { STAGES } from "@/lib/stages";
import { fullTag } from "@/lib/modeLabels";
import type { Who } from "@/lib/checks";
import { useProgress } from "@/lib/progress";
import { Ema, Ill, Tiny } from "./Ill";

/**
 * ステップのカード。
 * まだ開いていないステップはリンクにしない（押せてしまうと順番の意味が消えるため）。
 * ただし localStorage を読む前は「全部ロック」に見えてしまうので、
 * 読み込みが終わるまではリンクとして描く。
 */
function NodeCard({
  stage: s,
  cleared,
  open,
  here,
  ready,
  mode,
  isNext,
}: {
  stage: (typeof STAGES)[number];
  cleared: boolean;
  open: boolean;
  here: boolean;
  ready: boolean;
  mode: Who;
  /** 次にやるところ。ここだけ金色で目立たせる */
  isNext: boolean;
}) {
  const cls =
    "node" +
    (s.boss ? " boss" : "") +
    (cleared ? " clear" : "") +
    (isNext && !cleared ? " open" : "") +
    (here ? " sel" : "") +
    (!open && ready ? " lock" : "");
  const inner = (
    <>
      <span className="pic">
        <Ill name={s.ill} />
      </span>
      <span>
        <span className="tag">
          {fullTag(s.id, s.tag, mode)}
          {cleared ? " ・ CLEAN" : ""}
        </span>
        <span className="nm">{s.name}</span>
      </span>
    </>
  );
  if (!open && ready) {
    return (
      <span className={cls} aria-disabled="true" title="前のステップをクリアすると開きます">
        {inner}
      </span>
    );
  }
  return (
    <Link href={`/step/${s.id}/`} className={cls} aria-current={here ? "page" : undefined}>
      {inner}
    </Link>
  );
}

/**
 * 来店の流れ。左に縦のレールを置き、各ステップを「駅」で表す。
 * カードはレールの上に乗せないので、線が隠れない。
 * レールと進捗線の始点・終点は、最初と最後の駅の中心に JS で合わせる。
 */
export function Roadmap({ current }: { current?: string }) {
  const olRef = useRef<HTMLOListElement>(null);
  const [rail, setRail] = useState({ top: 0, height: 0, trail: 0 });
  const { ready, cleared, isOpen, nextIdx, clean, mode } = useProgress();
  // GOAL が灯るのは「点検がそろったとき」。クイズに正解しただけでは灯さない
  const allClean = clean.target > 0 && clean.todo === 0 && clean.criticalClear;

  useEffect(() => {
    const ol = olRef.current;
    if (!ol) return;
    const items = Array.from(ol.querySelectorAll("li"));
    if (!items.length) return;
    const mid = (el: HTMLElement) => el.offsetTop + el.offsetHeight / 2;
    const head = mid(items[0]);
    const tail = mid(items[items.length - 1]);
    const k = cleared.size;
    setRail({
      top: head,
      height: Math.max(0, tail - head),
      trail: k === 0 ? 0 : Math.max(0, mid(items[Math.min(k, STAGES.length) - 1]) - head),
    });
  }, [cleared.size, ready]);

  return (
    <nav className={`map${allClean ? " done" : ""}`} aria-label="来店の流れ">
      <div className="cap start">START ・ 来店</div>
      <ol ref={olRef}>
        <span className="rail" style={{ top: rail.top, height: rail.height }} />
        {rail.trail > 0 && (
          <span className="trail" style={{ top: rail.top, height: rail.trail }} />
        )}
        {STAGES.map((s, i) => {
          const cl = cleared.has(s.id);
          const open = isOpen(i);
          const here = s.id === current;
          const isNext = ready && i === nextIdx;
          const cls =
            (cl ? "is-clear" : isNext ? "is-open" : open ? "is-todo" : "is-lock") +
            (here ? " is-sel is-here" : "");
          return (
            <li key={s.id} className={cls}>
              <span className="station">{cl && <Tiny name="check" />}</span>
              {here && (
                <span className="here">
                  <Ema mood={cl ? "happy" : "idle"} />
                </span>
              )}
              <NodeCard
                stage={s}
                cleared={cl}
                open={open}
                here={here}
                ready={ready}
                mode={mode}
                isNext={isNext}
              />
            </li>
          );
        })}
      </ol>
      <div className="cap goal">
        <span className="goal-ema">{allClean && <Ema mood="cheer" />}</span>
        GOAL ・ クリーン店舗
      </div>
    </nav>
  );
}
