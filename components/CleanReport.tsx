"use client";

import Link from "next/link";
import { CHECKS } from "@/lib/checks";
import { STAGES, shortTag } from "@/lib/stages";
import { cleanLabel, useProgress, visibleChecks } from "@/lib/progress";
import { Ema, Small } from "./Ill";

/**
 * クリーン判定の結果。
 *
 * これは自己点検の集計であって、適法性のお墨付きではない。
 * 「できている」が全部そろっても「問題が見つかりませんでした」までしか言わない。
 */
export function CleanReport() {
  const { ready, mode, progress, clean } = useProgress();
  if (!ready) return null;

  const rows = STAGES.filter((s) => (CHECKS[s.id] ?? []).length > 0).map((s) => {
    const list = visibleChecks(mode, s.id);
    const done = list.filter((c) => progress.checks[c.id] === "yes").length;
    const na = list.filter((c) => progress.checks[c.id] === "na").length;
    const target = list.length - na;
    const open = list.filter((c) => c.critical && progress.checks[c.id] === undefined);
    return { s, list, done, na, target, open };
  });

  return (
    <section className="report pin">
      <h2 className="lbl">
        <Small name="seal" />
        クリーン判定の結果
      </h2>

      <div className="rtop">
        <div className="big-score">
          <b>{clean.done}</b>
          <span>/ {clean.target} 項目</span>
        </div>
        <div className="rnote">
          <b>{cleanLabel(clean)}</b>
          <span>
            「できている」と答えた数です。「該当しない」にしたものは、母数から外しています。
          </span>
        </div>
        <span className="rep-ema">
          <Ema mood={clean.criticalClear && clean.todo === 0 ? "cheer" : "idle"} />
        </span>
      </div>

      {clean.openCritical.length > 0 ? (
        <div className="rfix">
          <b>先に直すところ（必須の項目）</b>
          <ul>
            {clean.openCritical.map((c) => (
              <li key={c.id}>
                {c.label}
                {c.basis && <span className="basis">{c.basis}</span>}
              </li>
            ))}
          </ul>
        </div>
      ) : clean.target > 0 && clean.todo === 0 ? (
        <div className="rok">
          <b>必須の項目に、未点検はありません</b>
          <span>
            ただしこれは<b>自己点検の集計</b>であって、適法であることの保証ではありません。
            公開されている資料では線が引かれていない論点も残っています。
            最終的な判断は、所轄警察署（生活安全課）と弁護士に確認してください。
          </span>
        </div>
      ) : null}

      <div className="tbl">
        <table>
          <thead>
            <tr>
              <th>ステップ</th>
              <th>内容</th>
              <th>できている</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ s, done, target, na, open }) => (
              <tr key={s.id} className={open.length > 0 ? "weak" : ""}>
                <td className="st">{shortTag(s.tag)}</td>
                <td>
                  <Link href={`/step/${s.id}/`}>{s.name}</Link>
                </td>
                <td className="mk">
                  {done} / {target}
                  {na > 0 && <span className="na">　該当なし {na}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="rlegend">
        未点検の必須項目があるうちは、店の明かりは全部灯りません。
        クイズの点（リテラシー）とは別の指標です。
      </p>
    </section>
  );
}
