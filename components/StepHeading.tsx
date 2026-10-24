"use client";

import type { Stage } from "@/lib/stages";
import { label, stepNo } from "@/lib/modeLabels";
import { useProgress } from "@/lib/progress";
import { Ill } from "./Ill";

/**
 * ステップの見出し。
 *
 * 「STEP 3 ・ 受付」はお客さん視点の言い方なので、
 * 運営者モードでは「STEP 3 ・ 営業時間と年齢確認」に切り替える。
 * サーバー側は既定の運営者モードで描かれる（保存値を読む前の状態と一致させ、
 * 画面のちらつきを防ぐため）。
 */
export function StepHeading({ stage: s }: { stage: Stage }) {
  const { mode } = useProgress();
  const l = label(s.id, mode, { tag: s.tag, scene: s.scene });
  return (
    <div className="ptop">
      <div>
        <div className="eyebrow">
          {stepNo(s.tag)} ・ {l.scene}
        </div>
        <h1>{s.name}</h1>
        <p className="scene">{l.text}</p>
      </div>
      <div className="big">
        <Ill name={s.ill} />
      </div>
    </div>
  );
}
