import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { Hud } from "@/components/Hud";
import { Small } from "@/components/Ill";
import { CONF } from "@/lib/stages";
import { SIGN_COUNT, signsByWhen } from "@/lib/signs";

export const metadata: Metadata = {
  title: `こんなお店は要注意（${SIGN_COUNT}のサイン）`,
  description:
    "アミューズメントポーカー店をお客さんとして見分けるためのリストです。許可証が見当たらない、チップの換金や持ち帰りをほのめかす、順位で賞品が出る告知がある。外から見て分かるサインだけに絞っています。",
  alternates: { canonical: "/signs/" },
};

export default function Signs() {
  const groups = signsByWhen();
  return (
    <div className="wrap">
      <Hud />
      <main className="page">
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">お客さん向け</div>
              <h1>こんなお店は要注意</h1>
              <p className="scene">
                お客さんが<b>自分の目で見て分かること</b>だけを、{SIGN_COUNT}項目に絞りました。
                届出や名簿、お金の流れのように外から見えないものは、ここには入れていません。
              </p>
            </div>
          </div>

          <div className="pbody">
            <section className="law pin">
              <h2 className="head">
                <Small name="book" />
                <span>このリストの使い方</span>
              </h2>
              <p className="gist">
                ひとつ当てはまったからといって、そのお店が違法だと決まるわけではありません。
                条例で扱いが変わるものや、事情を聞かないと判断できないものもあります。
                ただし<b>「強いサイン」</b>と書いたものは、条文からまっすぐ説明できるものです。
                気になったら、そのお店で遊ばないという判断をしてかまいません。
                おかしいと思ったときの相談先は、所轄の警察署（生活安全課）です。
              </p>
            </section>

            {groups.map((g) => (
              <section className="pin" key={g.when}>
                <h2 className="lbl">
                  <Small name="check" />
                  {g.when}
                </h2>
                <ul className="signs">
                  {g.items.map((s) => (
                    <li key={s.id} className={s.strong ? "strong" : ""}>
                      <p className="sign-head">
                        {s.sign}
                        {s.strong && <span className="sign-tag">強いサイン</span>}
                      </p>
                      <p className="sign-why">{s.why}</p>
                      <p className="sign-foot">
                        <span className="basis">{s.basis}</span>
                        <Link href={`/step/${s.step}/`}>くわしく</Link>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <div className="pin">
              <Link className="next" href="/">
                ロードマップで最初から確かめる ▶
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Disclaimer conf={CONF} />
    </div>
  );
}
