import type { Metadata } from "next";
import { AppendixSection, TODO_COUNT } from "@/components/Appendix";
import { Disclaimer } from "@/components/Disclaimer";
import { Hud } from "@/components/Hud";
import { Small } from "@/components/Ill";
import { CONF } from "@/lib/stages";

export const metadata: Metadata = {
  title: `まだはっきりしないこと（${TODO_COUNT}項目）`,
  description:
    "アミューズメントポーカー店の運営で、公開されている一次資料では確かめられなかった事項をまとめています。開業・大会開催の前に、このリストを持って所轄警察署と弁護士に確認してください。",
  alternates: { canonical: "/unconfirmed/" },
};

export default function Unconfirmed() {
  return (
    <div className="wrap">
      <Hud />
      <main className="page">
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">付録</div>
              <h1>まだはっきりしないこと</h1>
              <p className="scene">
                「確認できなかった」「断定できない」と書いた{TODO_COUNT}項目を、ここに全部集めました。
              </p>
            </div>
          </div>
          <div className="pbody">
            <section className="pin">
              <h2 className="lbl">
                <Small name="pen" />
                一覧
              </h2>
              <AppendixSection which="todo" />
            </section>
          </div>
        </article>
      </main>
      <Disclaimer conf={CONF} />
    </div>
  );
}
