import Link from "next/link";
import { CONF, KIND, type Cite, type Stage, type Verbatim } from "@/lib/stages";
import { Small, Tiny } from "./Ill";

/** 出典1件。法令は条文番号と確認日、業界内資料は破線のバッジで区別する */
function CiteRow({ c }: { c: Cite }) {
  const bits: string[] = [];
  if (c.tier === "law") {
    if (c.no) bits.push(c.no);
    bits.push(`原文確認日 ${CONF}`);
  }
  if (c.meta) bits.push(c.meta);
  return (
    <li className={`cite${c.tier === "ind" ? " ind" : ""}`}>
      <span className={`kind ${c.tier}`}>{KIND[c.tier]}</span>
      <span className="lawname">{c.short || c.name}</span>
      {c.art && <>　<span className="art">{c.art}</span></>}
      {c.what && <>　{c.what}</>}
      {(bits.length > 0 || c.url) && (
        <span className="meta">
          {bits.join("　・　")}
          {bits.length > 0 && c.url ? "　・　" : ""}
          {c.url && (
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              {c.tier === "law" ? "e-Gov法令検索で条文を見る" : "出典を開く"}
            </a>
          )}
        </span>
      )}
    </li>
  );
}

/** 法律の文そのまま。「／」で改行する */
function VerbatimBlock({ v }: { v: Verbatim }) {
  return (
    <blockquote className="verbatim">
      <span className="src">法律の文そのまま　{v[0]}</span>
      {v[1].split("／").map((t, i) => (
        <p key={i}>{t}</p>
      ))}
    </blockquote>
  );
}

/** 条文の要旨と出典。クイズより前に置く */
export function LawSummary({ stage: s }: { stage: Stage }) {
  return (
    <section className="law pin">
      <h2 className="head">
        <Small name="book" />
        <span>どんなルールなの？</span>
      </h2>
      <p className="gist">{s.gist}</p>
      <ul className="cites">
        {s.cites.map((c, i) => (
          <CiteRow key={i} c={c} />
        ))}
      </ul>
    </section>
  );
}

/**
 * ステップの本文のうち、クイズより後に出る部分。
 * サーバーで描画するので、条文も解説も生成されたHTMLに入る。
 * 検索エンジンとOGPに中身が渡るのは、ここがサーバー側だから。
 */
export function StepBody({ stage: s }: { stage: Stage }) {
  const lawCite = s.cites.find((c) => c.tier === "law");
  return (
    <>
      {s.verbatim && s.verbatim.length > 0 && (
        <section className="pin">
          <h2 className="lbl">
            <Small name="quote" />
            法律の文を、そのまま
          </h2>
          {s.verbatim.map((v, i) => (
            <VerbatimBlock key={i} v={v} />
          ))}
        </section>
      )}

      <section className="pin">
        <h2 className="lbl">
          <Small name="talk" />
          むずかしい言葉
        </h2>
        <div className="words">
          {s.words.map(([w, r, d], i) => (
            <div className="word" key={i}>
              <b>
                {r ? (
                  <ruby>
                    {w}
                    <rt>{r}</rt>
                  </ruby>
                ) : (
                  w
                )}
              </b>
              <span>{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="pin">
        <h2 className="lbl">
          <Small name="kid" />
          かんたんに言うと
        </h2>
        <p className="kid">{s.kid}</p>
      </section>

      <section className="pin">
        <h2 className="lbl">
          <Small name="tablei" />
          ポーカー店でいうと
        </h2>
        <div className="okng">
          <div className="ok">
            <span className="pill">
              <Tiny name="okc" />
              OK
            </span>
            <ul>
              {s.ok.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
          <div className="ng">
            <span className="pill">
              <Tiny name="ngx" />
              NG
            </span>
            <ul>
              {s.ng.map((x, i) => (
                <li key={i}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {s.penalty && (
        <div className="pen pin">
          <b>やぶったときは</b>　{s.penalty}
        </div>
      )}

      <section className="say pin">
        <h2 className="lbl">
          <Small name="staff" />
          お店からの説明
        </h2>
        <p>{s.say}</p>
      </section>

      {s.todo && (
        <div className="todo pin">
          <b>まだはっきりしないこと</b>　{s.todo}
        </div>
      )}

      <section className="pin">
        <h2 className="lbl">
          <Small name="book" />
          もっと知りたいとき
        </h2>
        <div className="deep">
          <Link href="/unconfirmed/">まだはっきりしないこと</Link>
          <Link href="/sources/">どこに書いてある？</Link>
          {lawCite?.url && (
            <a href={lawCite.url} target="_blank" rel="noopener noreferrer">
              法律の原文を読む
            </a>
          )}
        </div>
      </section>
    </>
  );
}
