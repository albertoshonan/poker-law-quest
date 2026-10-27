"use client";

import { checkLabel, GROUP_NOTE, type Check } from "@/lib/checks";
import { visibleChecks, useProgress } from "@/lib/progress";
import { Small } from "./Ill";

/**
 * クリーン判定のチェック項目。
 *
 * クイズ（知っているか）とは別で、こちらは「実際にできているか」を見る。
 * 3つの状態を持たせている：未・できている・該当しない。
 * 「該当しない」がないと、大会をやらない店やスポンサーのいない店が
 * 永久にクリーンにならない。
 *
 * 項目が多いステップでは group ごとにまとめる。並びは法律から店舗の具体へ。
 */
export function Checklist({ stageId }: { stageId: string }) {
  const { ready, mode, progress, toggleCheck } = useProgress();
  const list = visibleChecks(mode, stageId);

  if (!ready || list.length === 0) return null;

  // group の出現順を保ったまま、まとまりに分ける
  const groups: { name: string | null; items: Check[] }[] = [];
  for (const c of list) {
    const name = c.group ?? null;
    const last = groups[groups.length - 1];
    if (last && last.name === name) last.items.push(c);
    else groups.push({ name, items: [c] });
  }

  const Item = ({ c }: { c: Check }) => {
    const st = progress.checks[c.id];
    return (
      <li className={`chk-item ${st ?? "none"}${c.critical ? " crit" : ""}`}>
        <button
          type="button"
          className="chk-box"
          onClick={() => toggleCheck(c.id)}
          aria-pressed={st === "yes"}
          title="押すたびに　未 → できている → 該当しない　と変わります"
        >
          {st === "yes" ? "✓" : st === "na" ? "－" : ""}
        </button>
        <div className="chk-body">
          <p className="chk-label">
            {checkLabel(c, mode)}
            {c.critical && <span className="chk-crit">必須</span>}
          </p>
          {c.hint && <p className="chk-hint">{c.hint}</p>}
          {c.basis && <p className="chk-basis">{c.basis}</p>}
        </div>
        <span className="chk-state">
          {st === "yes" ? "できている" : st === "na" ? "該当しない" : "まだ"}
        </span>
      </li>
    );
  };

  return (
    <section className="chk pin">
      <h2 className="lbl">
        <Small name="check" />
        <span>できているか、点検する</span>
        <span className="chk-mode">{mode === "shop" ? "運営者モード" : "お客さんモード"}</span>
      </h2>

      {groups.map((g, i) => (
        <div className="chk-group" key={g.name ?? `g${i}`}>
          {g.name && (
            <>
              <h3 className="chk-gname">{g.name}</h3>
              {GROUP_NOTE[g.name] && <p className="chk-gnote">{GROUP_NOTE[g.name]}</p>}
            </>
          )}
          <ul className="chk-list">
            {g.items.map((c) => (
              <Item key={c.id} c={c} />
            ))}
          </ul>
        </div>
      ))}

      {mode === "both" && (
        <p className="chk-note">
          お客さんモードでは、<b>お客さんが自分の目で確かめられる項目だけ</b>を出しています。
          届出・名簿・お金の流れのように店でないと分からないものや、ほかのお客さんの年齢、
          照度の数値のように見ただけでは判断がつかないものは、運営者モードで見られます。
        </p>
      )}
    </section>
  );
}
