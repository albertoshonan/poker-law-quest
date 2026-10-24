"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { STAGES, type Stage } from "@/lib/stages";
import { qkey, useProgress } from "@/lib/progress";
import { Ema, type Mood, Small, Ill } from "./Ill";

/**
 * ステップのクイズ。
 * 正解するとそのステップがクリアになり、次のステップが開く。
 * 「1回目で正解できたか」だけをリテラシーチェックの点として数える。
 */
export function Quiz({ stage: s }: { stage: Stage }) {
  const { ready, cleared, clearStage, answer, progress } = useProgress();
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number[]>([]);
  const [mood, setMood] = useState<Mood>("idle");

  const done = cleared.has(s.id);
  const idx = STAGES.findIndex((x) => x.id === s.id);
  const nextStage = idx >= 0 && idx < STAGES.length - 1 ? STAGES[idx + 1] : null;

  // ステップを移ったら状態を戻す
  useEffect(() => {
    setQi(0);
    setPicked(null);
    setWrong([]);
    setMood("idle");
  }, [s.id]);

  if (!ready) {
    return <div className="quiz quiz-wait">クイズを読み込んでいます…</div>;
  }

  if (done) {
    return (
      <>
        <div className="cleared">
          <div className="badge">
            <Ill name="seal" />
          </div>
          <div>
            <b>CLEAN CHECK!</b>
            <span>{s.check}</span>
          </div>
        </div>
        {nextStage && (
          <Link className="next" href={`/step/${nextStage.id}/`}>
            つぎのステップへ ▶
          </Link>
        )}
      </>
    );
  }

  const q = s.quiz[qi];
  const correct = picked === q.c;

  const pick = (i: number) => {
    if (correct) return;
    setPicked(i);
    const isRight = i === q.c;
    answer(s.id, qi, isRight);
    setMood(isRight ? "happy" : "sad");
    if (!isRight) {
      setWrong((w) => (w.includes(i) ? w : [...w, i]));
      return;
    }
    setTimeout(() => {
      if (qi < s.quiz.length - 1) {
        setQi(qi + 1);
        setPicked(null);
        setWrong([]);
        setMood("idle");
      } else {
        clearStage(s.id);
      }
    }, 1500);
  };

  const firstTry = progress.first.includes(qkey(s.id, qi));

  return (
    <div className="quiz">
      <div className="lbl">
        <Small name="q" />
        <span>
          クイズ {qi + 1} / {s.quiz.length}　正解するとチェックが灯ります
        </span>
        <span className="react">
          <Ema mood={mood} />
        </span>
      </div>
      <p className="q">{q.q}</p>
      <div className="opts">
        {q.a.map((a, i) => (
          <button
            key={i}
            className={"opt" + (correct && i === q.c ? " right" : wrong.includes(i) ? " wrong" : "")}
            type="button"
            disabled={correct || wrong.includes(i)}
            onClick={() => pick(i)}
          >
            {a}
          </button>
        ))}
      </div>
      <div className="fbrow">
        <p className={"fb" + (correct ? " good" : picked !== null ? " bad" : "")}>
          {correct
            ? q.e + (firstTry ? "" : "（1回目でないので、点には入りません）")
            : picked !== null
              ? "ざんねん。上の「どんなルールなの？」と、下の「法律の文を、そのまま」を読んで、もう一度考えてみよう。"
              : ""}
        </p>
      </div>
      <p className="hint">
        わからなくても大丈夫。下の「法律の文を、そのまま」と解説に答えがあります。
      </p>
    </div>
  );
}
