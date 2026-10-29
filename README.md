# ポーカー法令クエスト

アミューズメントポーカー店の運営者・スタッフ・お客さん向けに、風営法と刑法のルールを
お客さんの来店の流れにそって1ステップずつ確かめるロードマップです。

- **条文確認日：2026年10月24日**
- 条文は e-Gov法令検索のAPIから原文を取得し、ルビのみ除いて引用しています
- 法定刑は2025年6月1日施行の「拘禁刑」で記載しています

## 動かす

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # out/ に静的ファイルを書き出す
npm start       # 書き出したものをローカルで確認
```

`next.config.mjs` で `output: "export"` にしてあるので、`out/` をそのまま
Vercel / Netlify / Cloudflare Pages / S3 などどこにでも置けます。サーバーは要りません。

## デプロイ（Vercel）

```bash
npx vercel          # 初回。プレビュー環境に出る
npx vercel --prod   # 本番へ
```

GitHub と連携した場合は、main に push するたびに自動でデプロイされます。

公開URLは `app/layout.tsx` の `SITE` が決めます。手で書き換える必要はありません。

| 優先 | 変数 | いつ使われるか |
| --- | --- | --- |
| 1 | `NEXT_PUBLIC_SITE_URL` | 独自ドメインを使うとき、Vercel の環境変数に設定する |
| 2 | `VERCEL_PROJECT_PRODUCTION_URL` | Vercel が本番ビルド時に自動で入れる |
| 3 | `http://localhost:3000` | 手元での開発 |

sitemap.xml・robots.txt・canonical・OGP のURLは、すべてこの値から作られます。
静的書き出しなのでビルド時に埋め込まれます。ドメインを変えたら再デプロイしてください。

## 構成

```
app/
  layout.tsx            サイト共通のメタデータ。SITE はここ
  page.tsx              トップ（3つの関門の説明とステップ一覧）
  step/[id]/page.tsx    各ステップ。generateStaticParams で10ページを静的生成
  signs/page.tsx        こんなお店は要注意（お客さん向け）
  cases/page.tsx        これってOK？NG？（ケース集）
  ordinances/page.tsx   都道府県の条例。確認できた県の要点
  unconfirmed/page.tsx  まだはっきりしないこと。件数は付録から算出
  sources/page.tsx      どこに書いてあるか（出典一覧）
  history/page.tsx      更新履歴
  favicon.ico           ファビコン。icon.png / apple-icon.png と同じ図版
  icon.png              512px。Next が <link rel="icon"> を自動で付ける
  apple-icon.png        180px。ホーム画面用
  sitemap.ts robots.ts
  globals.css           デザイン定義。ALBERTO の青 #2A4D69 を主色にした同系2トーン＋生成り
components/
  StepBody.tsx          条文・解説。サーバー描画（←検索エンジンに渡るのはここ）
  StepHeading.tsx       ステップの見出し
  Quiz.tsx              クイズ（リテラシー＝知っているか）。クライアント
  Checklist.tsx         チェック項目（クリーン判定＝できているか）。クライアント
  CleanReport.tsx       クリーン判定の結果。クライアント
  Pager.tsx             まえ／つぎのステップ。クライアント
  Roadmap.tsx           左のレールと駅。クライアント
  Hud.tsx               店舗の明かりと進捗。クライアント
  ScoreCard.tsx         リテラシーチェックの結果。クライアント
  Appendix.tsx          付録の表。TODO_COUNT もここで算出
  Disclaimer.tsx        各ページ下部の注意書きと出典ラベルの凡例
  Ill.tsx               ラインアートと案内役のキャラクター
lib/
  stages.json           ステージの中身（条文・出典・クイズ）
  stages.ts             その型定義
  appendix.json         付録の中身（まだはっきりしないこと／出典一覧）
  checks.ts             チェック項目（55項目／必須38）
  cases.ts              ケース集
  signs.ts              要注意サイン
  ordinances.ts         条例を確認できた県の中身
  history.ts            更新履歴
  modeLabels.ts         運営者／お客さんモードの言い換え
  illustrations.ts      ラインアートのパス
  progress.ts           進捗・リテラシー・クリーン判定の共有ストア
```

件数（チェック項目・まだはっきりしないこと・クイズ数）は、すべてデータから
算出して表示しています。文章の中に数字を書き足さないでください。ずれます。

## 中身を直すとき

**`lib/stages.json` の `verbatim`（法律の文そのまま）を書き換えるときは、
必ず e-Gov法令検索の原文と突き合わせてください。** ここだけが原文の引用で、
ほかの文（`gist` など）はやさしく言い換えたものです。

出典ラベル（`tier`）の意味：

| tier | 意味 |
| --- | --- |
| `law` | e-Gov法令検索で現行条文を原文確認したもの |
| `notice` | 警察庁の解釈運用基準（令和8年7月1日付け 丙保発第3号ほか・現行版） |
| `police` | 警察庁・都道府県警察の公式サイト |
| `diet` | 衆議院・参議院の質問答弁情報 |
| `ind` | **公開一次資料で裏付けを確認できていないもの。**聴講メモ・未公表資料に基づく |

## 注意

このクエストは学習用のまとめで、法律相談の代わりではありません。
都道府県の条例は場所ごとに違うので、営業時間・年少者・営業制限地域は各条例を確認してください。
最終的な判断は、所轄警察署（生活安全課）と弁護士に確認してください。
