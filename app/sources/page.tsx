import type { Metadata } from "next";
import { AppendixSection } from "@/components/Appendix";
import { Disclaimer } from "@/components/Disclaimer";
import { Hud } from "@/components/Hud";
import { Small } from "@/components/Ill";
import { CONF } from "@/lib/stages";

export const metadata: Metadata = {
  title: "どこに書いてあるか（出典一覧）",
  description:
    "このクエストが根拠にした法令・警察庁通達・警察サイト・国会答弁書の一覧です。条文はe-Gov法令検索のAPIから原文を取得し、機械照合で一致を確認しています。",
  alternates: { canonical: "/sources/" },
};

export default function Sources() {
  return (
    <div className="wrap">
      <Hud />
      <main className="page">
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">付録</div>
              <h1>どこに書いてあるか</h1>
              <p className="scene">
                根拠にした資料の一覧です。すべて{CONF}に確認しました。
              </p>
            </div>
          </div>
          <div className="pbody">
            <section className="pin">
              <h2 className="lbl">
                <Small name="quote" />
                出典
              </h2>
              <AppendixSection which="src" />
            </section>
          </div>
        </article>
      </main>
      <Disclaimer conf={CONF} />
    </div>
  );
}
