import type { Metadata } from "next";
import "./globals.css";

/**
 * 公開先のURL。sitemap・robots・canonical・OGP のURLが、すべてここから作られる。
 *
 * 優先順位：
 *   1. NEXT_PUBLIC_SITE_URL      独自ドメインを使うときに設定する
 *   2. VERCEL_PROJECT_PRODUCTION_URL   Vercel が本番ビルド時に自動で入れる
 *   3. localhost                 手元での開発用
 *
 * 静的書き出しなので、この値はビルド時に埋め込まれる。
 * ドメインを変えたら、再ビルド（再デプロイ）が必要。
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE =
  process.env.NEXT_PUBLIC_SITE_URL ?? fromVercel ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "ポーカー法令クエスト｜アミューズメントポーカー店のルールを1歩ずつ",
    template: "%s｜ポーカー法令クエスト",
  },
  description:
    "アミューズメントポーカー店の運営者・スタッフ・お客さん向けに、風営法と刑法のルールを来店の流れにそって1ステップずつ確かめられます。条文はe-Gov法令検索で原文を確認済み。",
  keywords: [
    "アミューズメントポーカー",
    "アミューズメントカジノ",
    "風営法",
    "5号営業",
    "ゲームセンター等営業",
    "賭博罪",
    "賞品提供",
    "ポーカー 大会 法律",
  ],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ポーカー法令クエスト",
    title: "ポーカー法令クエスト",
    description:
      "お客さんの来店の流れにそって、クリーンなポーカー店のルールを1つずつ確かめよう。条文はe-Gov法令検索で原文を確認済み。",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Noto+Sans+JP:wght@400;500;700;900&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
