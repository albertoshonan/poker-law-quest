import type { Metadata } from "next";
import Link from "next/link";
import { Disclaimer } from "@/components/Disclaimer";
import { Hud } from "@/components/Hud";
import { Small } from "@/components/Ill";
import { CONF } from "@/lib/stages";
import { CHECKED, jpDate, PREFS } from "@/lib/ordinances";

export const metadata: Metadata = {
  title: "都道府県の条例",
  description:
    "アミューズメントポーカー店の営業時間・年少者の立入り・営業制限地域は、風営法ではなく各都道府県の条例で決まります。東京都と神奈川県について、条例本文を確認した要点と公式リンクをまとめています。",
  alternates: { canonical: "/ordinances/" },
};

export default function Ordinances() {
  return (
    <div className="wrap">
      <Hud />
      <main className="page">
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">付録</div>
              <h1>都道府県の条例</h1>
              <p className="scene">
                営業時間・年少者の立入り・営業制限地域は、風営法ではなく条例で決まります。
                いまは東京都と神奈川県の2つです。順に増やします。
              </p>
            </div>
          </div>

          <div className="pbody">
            <section className="law pin">
              <h2 className="head">
                <Small name="book" />
                <span>なぜ条例を見ないといけないか</span>
              </h2>
              <p className="gist">
                風営法第13条第1項は、営業時間を「午前0時から午前6時まで」営んではならないと定め、
                そのうえで条例による延長を認めています。
                条例はこれを<b>緩める方向にも、厳しくする方向にも</b>動かせます。
                たとえば東京都は、終わりの時刻を午前6時ではなく<b>午前10時</b>まで上乗せしています。
                法律だけ読んで「午前6時から開けられる」と考えると、東京都では条例違反になります。
              </p>
            </section>

            <div className="todo pin">
              <b>確認日</b>
              下に書いた要点は、{jpDate(CHECKED)}に各都道府県の例規集で条例本文を取得して確認したものです。
              条例は改正されます。実際に開業・大会開催をするときは、リンク先の本文と所轄警察署（生活安全課）で
              最新の内容を確かめてください。
            </div>

            {PREFS.map((p) => (
              <section className="pref pin" key={p.id}>
                <h2 className="pref-name">{p.name}</h2>
                <p className="pref-ord">{p.ordinanceName}</p>

                <ul className="pref-links">
                  {p.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer">
                        <span className={`kind ${l.kind === "reiki" ? "law" : "police"}`}>
                          {l.kind === "reiki" ? "条例本文" : "警察"}
                        </span>
                        {l.label}
                      </a>
                      {l.note && <p className="pref-note">{l.note}</p>}
                    </li>
                  ))}
                </ul>

                <h3 className="case-h">営業できない時間（5号営業）</h3>
                <div className="tbl">
                  <table>
                    <thead>
                      <tr>
                        <th>地域・日</th>
                        <th>営業してはいけない時間</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.hours.map((h) => (
                        <tr key={h.area}>
                          <td>{h.area}</td>
                          <td>{h.forbidden}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="pref-hnote">{p.hoursNote}</p>

                <h3 className="case-h">年少者の立入り</h3>
                <ul className="pref-list">
                  {p.youth.map((y, i) => (
                    <li key={i}>{y}</li>
                  ))}
                </ul>

                <h3 className="case-h">条例が定める、守るべき事項</h3>
                <ul className="pref-list">
                  {p.duties.map((d, i) => (
                    <li key={i}>
                      {d.text}
                      <span className="basis">{d.art}</span>
                    </li>
                  ))}
                </ul>

                <div className="case-do">
                  <b>読むときの注意</b>
                  <ul className="pref-list">
                    {p.caveats.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}

            <section className="pin">
              <h2 className="lbl">
                <Small name="pen" />
                条例を見て分かったこと
              </h2>
              <p className="kid">
                このクエストでは、賞品を第三者に買い取らせる形が5号営業でどう扱われるかを
                「公開一次資料では確認できなかったこと」としてきました。政府答弁が
                ぱちんこ屋（4号営業）についてのものだったためです。
                条例を読むと、<b>東京都と神奈川県はどちらも、5号営業について賞品の買取りを
                条例で明文で禁じています</b>（東京都 条例第7条第2項第2号、神奈川県 条例第9条第1項第3号）。
                少なくともこの2都県では、条例の段階で答えが出ています。
                ほかの都道府県にも同様の定めがあるかは、まだ確認していません。
              </p>
              <p className="pref-hnote">
                関連：
                <Link href="/step/s6/">賞品を出さない（BOSS）</Link>
                　/
                <Link href="/unconfirmed/">まだはっきりしないこと</Link>
              </p>
            </section>

            <div className="todo pin">
              <b>これから足す予定</b>
              いまは東京都と神奈川県だけです。条例本文を確認できたものから順に増やします。
              推測で埋めると、場所によって違うという一番大事なところが崩れるので、
              確認できていない県は載せません。
            </div>
          </div>
        </article>
      </main>
      <Disclaimer conf={CONF} />
    </div>
  );
}
