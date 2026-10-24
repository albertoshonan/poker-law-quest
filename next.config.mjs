/** @type {import('next').NextConfig} */
const nextConfig = {
  // 静的書き出し。生成物（out/）はどのホスティングにも置ける。
  output: "export",
  // 静的書き出しでは画像最適化サーバーが使えないため無効化する
  images: { unoptimized: true },
  // out/step/s0/index.html の形にして、拡張子なしURLでも開けるようにする
  trailingSlash: true,
};

export default nextConfig;
