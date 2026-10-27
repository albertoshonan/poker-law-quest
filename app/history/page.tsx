import type { Metadata } from "next";
import { Disclaimer } from "@/components/Disclaimer";
import { Hud } from "@/components/Hud";
import { Small } from "@/components/Ill";
import { CONF } from "@/lib/stages";
import { HISTORY, jpDate, KIND_LABEL, LAST_UPDATED } from "@/lib/history";

export const metadata: Metadata = {
  title: "更新履歴",
  description:
    "ポーカー法令クエストの更新履歴です。法改正・通達の改定・ガイドラインの公表に合わせて、いつ何を直したかを残しています。とくに解釈や表現を弱めた変更は、読んだ時期によって内容が違うため記録しています。",
  alternates: { canonical: "/history/" },
};

export default function History() {
  return (
    <div className="wrap">
      <Hud />
      <main className="page">
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">付録</div>
              <h1>更新履歴</h1>
              <p className="scene">
                最終更新日は{jpDate(LAST_UPDATED)}です。条文の原文確認日は{CONF}です。
              </p>
            </div>
          </div>

          <div className="pbody">
            <section className="law pin">
              <h2 className="head">
                <Small name="book" />
                <span>なぜ履歴を残すか</span>
              </h2>
              <p className="gist">
                法令の内容は、いつの時点のものかで意味が変わります。
                とくに<b>解釈を変えた変更や、言い切りを弱めた変更</b>は、
                読んだ時期によって受け取った内容が違います。
                あとから「あのとき何と書いてあったか」をたどれるように、理由も含めて残しています。
              </p>
            </section>

            {HISTORY.map((e) => (
              <section className="pin" key={e.date}>
                <h2 className="lbl">
                  <Small name="pen" />
                  {jpDate(e.date)}
                </h2>
                <ul className="hist">
                  {e.items.map((c, i) => (
                    <li key={i}>
                      <span className={`hist-kind k-${c.kind}`}>{KIND_LABEL[c.kind]}</span>
                      <div>
                        <p className="hist-what">{c.what}</p>
                        {c.why && <p className="hist-why">理由：{c.why}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <div className="todo pin">
              <b>これから反映する予定</b>
              日本ポーカー事業者連盟（JPBA）の店舗運用ガイドラインは2026年10月31日公表予定とされています。
              公表後に内容を照らし合わせ、ここに記録します。
            </div>
          </div>
        </article>
      </main>
      <Disclaimer conf={CONF} />
    </div>
  );
}
