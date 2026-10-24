import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap">
      <main className="page">
        <article className="panel">
          <div className="ptop">
            <div>
              <div className="eyebrow">404</div>
              <h1>そのページは見つかりません</h1>
              <p className="scene">URLが変わったか、まちがっているかもしれません。</p>
            </div>
          </div>
          <div className="pbody">
            <Link className="next" href="/">ロードマップへ戻る ▶</Link>
          </div>
        </article>
      </main>
    </div>
  );
}
