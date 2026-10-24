"use client";

import Link from "next/link";
import { QT, STAGES, shortTag } from "@/lib/stages";
import { gradeLabel, qkey, useProgress } from "@/lib/progress";
import { Ema, Small } from "./Ill";

/**
 * リテラシーチェックの結果。
 * 「1回目で正解できた数」だけを点にする。正解するまで選び直せる作りなので、
 * 単純な正解数にすると全員が満点になり、チェックとして意味をなさないため。
 */
export function ScoreCard() {
  const { ready, progress, score } = useProgress();
  if (!ready) return null;

  const first = new Set(progress.first);
  const missed = new Set(progress.missed);
  const weak = STAGES.filter((st) => st.quiz.some((_, i) => missed.has(qkey(st.id, i))));

  return (
    <section className="report pin">
      <h2 className="lbl">
        <Small name="q" />
        リテラシーチェックの結果
      </h2>
      <div className="rtop">
        <div className="big-score">
          <b>{score.good}</b>
          <span>/ {QT} 問</span>
        </div>
        <div className="rnote">
          <b>{gradeLabel(score.rate, score.answered)}</b>
          <span>
            1回目で正解できた数です。まちがえてから正解した問題は、ここには入りません。
          </span>
        </div>
      </div>
      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>ステップ</th>
              <th>内容</th>
              <th>結果</th>
            </tr>
          </thead>
          <tbody>
            {STAGES.map((st) => {
              const isWeak = st.quiz.some((_, i) => missed.has(qkey(st.id, i)));
              return (
                <tr key={st.id} className={isWeak ? "weak" : ""}>
                  <td className="st">{shortTag(st.tag)}</td>
                  <td>
                    <Link href={`/step/${st.id}/`}>{st.name}</Link>
                  </td>
                  <td className="mk">
                    {st.quiz.map((_, i) => {
                      const k = qkey(st.id, i);
                      return first.has(k) ? (
                        <i key={i} className="m ok" title="1回で正解">○</i>
                      ) : missed.has(k) ? (
                        <i key={i} className="m ng" title="まちがえた">△</i>
                      ) : (
                        <i key={i} className="m no" title="まだ">－</i>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="rlegend">
        <i className="m ok">○</i>1回で正解　<i className="m ng">△</i>まちがえた（読み直し推奨）
        <i className="m no">－</i>まだ
      </p>
      {weak.length > 0 && (
        <p className="rweak">
          <b>読み直すとよいところ</b>
          {weak.map((st, i) => (
            <span key={st.id}>
              {i > 0 && "、"}
              <Link href={`/step/${st.id}/`}>{st.name}</Link>
            </span>
          ))}
        </p>
      )}
    </section>
  );
}

/** クリーン店舗宣言。クリアした項目だけが濃く出る */
export function Declaration() {
  const { ready, cleared, clean } = useProgress();
  // 宣言のキャラクターは、点検がそろったときに喜ぶ（クイズの正解数ではない）
  const allClean = clean.target > 0 && clean.todo === 0 && clean.criticalClear;
  return (
    <section className="decl pin">
      <div className="decl-top">
        <span className="decl-ema">
          <Ema mood={allClean ? "cheer" : "idle"} />
        </span>
        <h2>クリーン店舗宣言</h2>
      </div>
      <ol>
        {STAGES.map((x) => (
          <li key={x.id} className={ready && cleared.has(x.id) ? "" : "off"}>
            {x.check}
          </li>
        ))}
      </ol>
    </section>
  );
}
