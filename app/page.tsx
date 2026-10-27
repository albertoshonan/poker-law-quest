import type { Metadata } from "next";
import Link from "next/link";
import { Hud } from "@/components/Hud";
import { Roadmap } from "@/components/Roadmap";
import { Disclaimer } from "@/components/Disclaimer";
import { Ill, Small } from "@/components/Ill";
import { CONF, N, QT, STAGES, shortTag } from "@/lib/stages";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "トランプ台でポーカーをさせる営業は、原則として風営法第2条第1項第5号のゲームセンター等営業の許可が必要です。許可・賭博・賞品提供という3つの別々の関門を、来店の流れにそって1ステップずつ確かめられます。",
};

export default function Home() {
  return (
    <div className="wrap">
      <Hud />

      <p className="intro">
        <span>
          <b>お客さんは</b>：来店の順にたどると、このお店がルールを守っているかが分かります。
        </span>
        <span>
          <b>お店は</b>：各ステップの「お店からの説明」の通りに話せば、クリーンな理由を説明できます。
        </span>
      </p>

      <main className="game">
        <Roadmap />
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">はじめに</div>
              <h1>3つの関門を、1つずつ</h1>
              <p className="scene">
                ポーカー店に関係するルールは、ぜんぶで3つの関門に分かれます。
                ひとつクリアしても、ほかがアウトなら違法になります。
              </p>
            </div>
            <div className="big">
              <Ill name="intro" />
            </div>
          </div>

          <div className="pbody">
            <section className="law pin">
              <h2 className="head">
                <Small name="book" />
                <span>3つの関門</span>
              </h2>
              <p className="gist">
                1つめは「許可を取る」。トランプ台でポーカーをさせる営業は、原則として風営法第2条第1項第5号のゲームセンター等営業の許可が必要です。
                2つめは「お客さんに賭けさせない」。賭博は刑法で罰せられます。
                3つめは「勝った人に何も渡さない」。5号営業のお店は、遊技の結果に応じて賞品を提供してはいけません。
                この3つは別々の法律による別々の関門で、どれか1つを満たせばよい、というものではありません。
              </p>
            </section>

            <section className="pin">
              <h2 className="lbl">
                <Small name="tablei" />
                ステップ一覧
              </h2>
              <div className="tbl">
                <table>
                  <thead>
                    <tr>
                      <th>ステップ</th>
                      <th>内容</th>
                      <th>ここで分かること</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STAGES.map((s) => (
                      <tr key={s.id}>
                        <td className="st">{shortTag(s.tag)}</td>
                        <td>
                          <Link href={`/step/${s.id}/`}>{s.name}</Link>
                        </td>
                        <td>{s.check}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="pin">
              <h2 className="lbl">
                <Small name="q" />
                リテラシーチェック
              </h2>
              <p className="kid">
                各ステップにクイズがあり、ぜんぶで{QT}問です。
                <b>1回目で正解できた数</b>だけを点として数えます。
                最後の{N}番目のステップまで進むと、どこを読み直すとよいかが一覧で出ます。
              </p>
            </section>

            <section className="pin">
              <h2 className="lbl">
                <Small name="book" />
                こんな読み方もできます
              </h2>
              <div className="deep">
                <Link href="/signs/">こんなお店は要注意（お客さん向け）</Link>
                <Link href="/cases/">これってOK？NG？（ケース集）</Link>
                <Link href="/ordinances/">都道府県の条例</Link>
                <Link href="/unconfirmed/">まだはっきりしないこと</Link>
              </div>
            </section>

            <div className="pin">
              <Link className="next" href={`/step/${STAGES[0].id}/`}>
                はじめる ▶
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Disclaimer conf={CONF} />
    </div>
  );
}
