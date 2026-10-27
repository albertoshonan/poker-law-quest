/**
 * ステージの定義。
 *
 * 本文のうち `verbatim`（法律の文そのまま）は e-Gov法令検索のAPIから取得した原文、
 * および警察庁通達PDF・警察サイト・答弁書の実テキストと機械照合して一致を確認済み。
 * 書き換えるときは必ず原典と突き合わせること。
 */
import raw from "./stages.json";

/** 出典の種類。画面ではバッジの文言と見た目が変わる */
export type Tier = "law" | "notice" | "police" | "diet" | "ind";

export const KIND: Record<Tier, string> = raw.KIND as Record<Tier, string>;

/** 条文の原文を確認した日 */
export const CONF: string = raw.CONF;

export type Cite = {
  tier: Tier;
  /** 法令名・文書名 */
  name: string;
  /** 略称（風営法 など）。あれば画面ではこちらを使う */
  short?: string;
  /** 法令番号 */
  no?: string;
  /** 条文番号、通達の節番号、答弁書番号 */
  art?: string;
  /** 何の話か */
  what?: string;
  /** 発出日・更新日などの補足 */
  meta?: string;
  url?: string;
};

export type Quiz = {
  q: string;
  /** 選択肢 */
  a: string[];
  /** 正解の添字 */
  c: number;
  /** 正解したときの解説 */
  e: string;
};

/** [見出し, 本文]。本文の「／」は改行として扱う */
export type Verbatim = [string, string];

/** [語, ふりがな, 説明] */
export type Word = [string, string, string];

export type Stage = {
  id: string;
  /** ラインアートの種類 */
  ill: string;
  /** STEP 0 ・ 来店のまえに */
  tag: string;
  name: string;
  /** 最後の関門か */
  boss?: boolean;
  /** 最終ステージか */
  final?: boolean;
  /** 場面の説明 */
  scene: string;
  /** 条文の要旨（原文ではない） */
  gist: string;
  cites: Cite[];
  verbatim?: Verbatim[];
  words: Word[];
  /** かんたんに言うと */
  kid: string;
  ok: string[];
  ng: string[];
  /** お店からの説明 */
  say: string;
  /** 自己点検のまとめの1行 */
  check: string;
  /** やぶったときは */
  penalty?: string;
  /** まだはっきりしないこと */
  todo?: string;
  quiz: Quiz[];
};

export const STAGES: Stage[] = raw.STAGES as Stage[];

/** ステップ数 */
export const N = STAGES.length;

/** クイズの総数（リテラシーチェックの満点） */
export const QT = STAGES.reduce((a, s) => a + s.quiz.length, 0);

export const byId = (id: string) => STAGES.find((s) => s.id === id);

/** 「STEP 0 ・ 来店のまえに」→「STEP 0」 */
export const shortTag = (tag: string) => tag.split("・")[0].trim();
