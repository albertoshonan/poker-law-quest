import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { Hud } from "@/components/Hud";
import { Small } from "@/components/Ill";
import { CONF, byId } from "@/lib/stages";
import { CASES, CASE_COUNT, GRAY_COUNT, VERDICT_LABEL } from "@/lib/cases";

export const metadata: Metadata = {
  title: `これってOK？NG？（${CASE_COUNT}のケース）`,
  description:
    "アミューズメントポーカー店の現場でよく出る場面を、風営法と刑法に照らして整理しました。サテライトの出場権、店外での賭けの約束、SNSの告知、来店ポイント、スポンサーの賞品。結論が出ないものは、出ないと書いています。",
  alternates: { canonical: "/cases/" },
};

export default function Cases() {
  return (
    <div className="wrap">
      <Hud />
      <main className="page">
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">付録</div>
              <h1>これってOK？NG？</h1>
              <p className="scene">
                現場でよく出る{CASE_COUNT}の場面を、条文に照らして整理しました。
              </p>
            </div>
          </div>

          <div className="pbody">
            <div className="todo pin">
              <b>先に書いておきます</b>
              {CASE_COUNT}件のうち<b>{GRAY_COUNT}件は、公開されている一次資料では答えが出ません。</b>
              このページでは、裏付けのあることと、確かめられなかったことを分けて書いています。
              それらしい答えを書くほうが、ケース集としては危ないと考えているためです。
              答えが出ないものは、所轄警察署（生活安全課）と弁護士への確認をお勧めします。
            </div>

            {CASES.map((c) => (
              <section className="case pin" key={c.id}>
                <h2 className="case-q">{c.q}</h2>
                <p className={`case-v v-${c.verdict}`}>{VERDICT_LABEL[c.verdict]}</p>
                <p className="case-short">{c.short}</p>

                <h3 className="case-h">条文・資料から言えること</h3>
                <ul className="case-can">
                  {c.canSay.map((s, i) => (
                    <li key={i}>
                      {s.text}
                      <span className="basis">{s.basis}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="case-h">公開資料では確かめられなかったこと</h3>
                <ul className="case-cannot">
                  {c.cannotSay.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>

                <div className="case-do">
                  <b>現場ではどうするか</b>
                  <p>{c.advice}</p>
                </div>

                <p className="case-steps">
                  くわしく：
                  {c.steps.map((id, i) => {
                    const s = byId(id);
                    return (
                      s && (
                        <span key={id}>
                          {i > 0 && "、"}
                          <Link href={`/step/${id}/`}>{s.name}</Link>
                        </span>
                      )
                    );
                  })}
                </p>
              </section>
            ))}

            <div className="pin">
              <Link className="next" href="/unconfirmed/">
                ほかに確認できていないこと ▶
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Disclaimer conf={CONF} />
    </div>
  );
}
