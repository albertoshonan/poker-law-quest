/**
 * ラインアートのパス定義。
 * 既存の1枚HTMLから機械的に書き出したもので、手で写していない。
 * .g=金の線 / .gf=金の塗り / .nf=紺の塗り / .wf=白の塗り
 */
export const ILL: Record<string, string> = {
  "intro": "<rect x=\"10\" y=\"14\" width=\"26\" height=\"36\" rx=\"3\" class=\"wf\"/><rect x=\"28\" y=\"20\" width=\"26\" height=\"36\" rx=\"3\" class=\"wf\"/>\n   <path d=\"M34 30 c-3-4-8-1-4 4 l6 6 l6-6 c4-5-1-8-4-4z\" class=\"gf\"/><path d=\"M16 22 h12 M16 28 h8\" class=\"g\"/>\n   <circle cx=\"12\" cy=\"56\" r=\"3\" class=\"g\"/><circle cx=\"56\" cy=\"10\" r=\"2.5\" class=\"g\"/>",
  "phone": "<rect x=\"18\" y=\"6\" width=\"28\" height=\"52\" rx=\"4\" class=\"wf\"/><path d=\"M28 11 h8\"/>\n   <rect x=\"23\" y=\"17\" width=\"18\" height=\"14\" rx=\"1\" class=\"g\"/><path d=\"M23 37 h18 M23 43 h12\"/>\n   <circle cx=\"32\" cy=\"52\" r=\"2\"/><path d=\"M50 18 l8-4 M50 26 h9 M50 34 l8 4\" class=\"g\"/>",
  "permit": "<path d=\"M6 54 V22 L32 8 L58 22 V54\" class=\"wf\"/><path d=\"M2 54 h60\"/>\n   <rect x=\"14\" y=\"26\" width=\"18\" height=\"22\" rx=\"1\" class=\"wf\"/><path d=\"M18 32 h10 M18 37 h10 M18 42 h6\"/>\n   <circle cx=\"29\" cy=\"44\" r=\"4\" class=\"gf\"/><path d=\"M40 54 V34 h12 V54\"/><circle cx=\"49\" cy=\"45\" r=\"1.4\" class=\"nf\"/>\n   <path d=\"M32 14 l2 4 h-4 z\" class=\"gf\"/>",
  "reception": "<rect x=\"8\" y=\"34\" width=\"48\" height=\"20\" class=\"wf\"/><path d=\"M4 34 h56\"/>\n   <circle cx=\"20\" cy=\"18\" r=\"10\" class=\"wf\"/><path d=\"M20 12 v6 l4 3\"/>\n   <rect x=\"36\" y=\"14\" width=\"20\" height=\"14\" rx=\"2\" class=\"wf\"/><circle cx=\"42\" cy=\"21\" r=\"3\" class=\"g\"/>\n   <path d=\"M47 19 h6 M47 23 h4\"/><path d=\"M14 44 h14\" class=\"g\"/>",
  "room": "<path d=\"M32 4 v8\"/><path d=\"M22 12 h20 l-4 8 h-12 z\" class=\"wf\"/>\n   <path d=\"M26 20 l-10 18 M38 20 l10 18\" class=\"g\" stroke-dasharray=\"2 4\"/>\n   <ellipse cx=\"32\" cy=\"44\" rx=\"24\" ry=\"8\" class=\"wf\"/><ellipse cx=\"32\" cy=\"44\" rx=\"16\" ry=\"4\" class=\"g\"/>\n   <path d=\"M14 50 v8 M50 50 v8\"/>",
  "chips": "<ellipse cx=\"26\" cy=\"44\" rx=\"14\" ry=\"5\" class=\"wf\"/><path d=\"M12 44 v-6 M40 44 v-6\"/>\n   <ellipse cx=\"26\" cy=\"38\" rx=\"14\" ry=\"5\" class=\"wf\"/><path d=\"M12 38 v-6 M40 38 v-6\"/>\n   <ellipse cx=\"26\" cy=\"32\" rx=\"14\" ry=\"5\" class=\"wf\"/><path d=\"M20 32 h12\" class=\"g\"/>\n   <path d=\"M44 18 h12 v18 h-12 z\" class=\"wf\"/><path d=\"M47 18 v-4 a3 3 0 0 1 6 0 v4\"/><circle cx=\"50\" cy=\"27\" r=\"2\" class=\"gf\"/>",
  "castle": "<path d=\"M10 54 V26 h6 v5 h5 v-5 h6 v28\" class=\"wf\"/><path d=\"M37 54 V26 h6 v5 h5 v-5 h6 v28\" class=\"wf\"/>\n   <path d=\"M24 54 V18 h4 v4 h3 v-4 h2 v4 h3 v-4 h4 v36\" class=\"wf\"/><path d=\"M28 54 v-9 a4 4 0 0 1 8 0 v9\"/>\n   <path d=\"M32 18 V6 l9 3 l-9 3\" class=\"g\"/><path d=\"M6 54 h52\"/>",
  "scale": "<path d=\"M32 8 v46\"/><path d=\"M14 18 h36\"/><path d=\"M14 18 l-7 16 h14 z\" class=\"wf\"/>\n   <path d=\"M50 18 l-7 16 h14 z\" class=\"wf\"/><path d=\"M7 34 a7 3 0 0 0 14 0 M43 34 a7 3 0 0 0 14 0\" class=\"g\"/>\n   <path d=\"M22 54 h20\"/><circle cx=\"32\" cy=\"8\" r=\"3\" class=\"gf\"/>",
  "trophy": "<path d=\"M22 10 h20 v10 a10 10 0 0 1-20 0z\" class=\"wf\"/>\n   <path d=\"M22 13 h-7 v3 a9 9 0 0 0 8 9\" class=\"g\"/><path d=\"M42 13 h7 v3 a9 9 0 0 1-8 9\" class=\"g\"/>\n   <path d=\"M32 30 v10\"/><path d=\"M24 40 h16 v8 h-16z\" class=\"wf\"/><path d=\"M18 52 h28\"/><path d=\"M28 18 l3 3 l6-6\" />",
  "seal": "<circle cx=\"32\" cy=\"28\" r=\"20\" class=\"wf\"/><circle cx=\"32\" cy=\"28\" r=\"14\" class=\"g\" stroke-dasharray=\"3 4\"/>\n   <path d=\"M24 28 l6 6 l11-12\"/>\n   <path d=\"M22 44 l-6 14 l8-3 l4 7 l4-12 M42 44 l6 14 l-8-3 l-4 7 l-4-12\" class=\"g\"/>",
  "book": "<path d=\"M6 10 h8 a4 4 0 0 1 4 4 v20 a3 3 0 0 0-3-3 H6 z M30 10 h-8 a4 4 0 0 0-4 4 v20 a3 3 0 0 1 3-3 h9 z\"/>",
  "quote": "<rect x=\"5\" y=\"6\" width=\"26\" height=\"24\" rx=\"2\"/><path d=\"M10 13 h16 M10 19 h16 M10 25 h10\" class=\"g\"/>",
  "talk": "<path d=\"M6 8 h24 v16 h-14 l-6 5 v-5 h-4 z\"/>",
  "kid": "<circle cx=\"18\" cy=\"12\" r=\"6\"/><path d=\"M8 32 c0-7 4-11 10-11 s10 4 10 11\"/>",
  "tablei": "<ellipse cx=\"18\" cy=\"18\" rx=\"14\" ry=\"8\"/><path d=\"M12 18 h12\"/>",
  "staff": "<circle cx=\"14\" cy=\"11\" r=\"5\"/><path d=\"M5 30 c0-6 4-10 9-10 s9 4 9 10\"/><path d=\"M24 8 h9 v8 h-5 l-3 3 v-3 h-1 z\"/>",
  "pen": "<path d=\"M6 30 l4-10 L26 4 l6 6 L16 26 z\"/><path d=\"M22 8 l6 6\" class=\"g\"/><path d=\"M6 30 h26\" />",
  "q": "<circle cx=\"18\" cy=\"18\" r=\"13\"/><path d=\"M14 14 a4 4 0 1 1 5 4 v3 M19 25 v1\"/>",
  "lock": "<rect x=\"5\" y=\"11\" width=\"14\" height=\"10\" rx=\"1.5\"/><path d=\"M8 11 V8 a4 4 0 0 1 8 0 v3\"/>",
  "check": "<path d=\"M5 12 l5 5 l9-10\"/>",
  "okc": "<circle cx=\"12\" cy=\"12\" r=\"8\"/>",
  "ngx": "<path d=\"M6 6 l12 12 M18 6 l-12 12\"/>",
};

export type IllKey = keyof typeof ILL;
