/**
 * モードごとの言い方。
 *
 * もともとの tag / scene は「お客さんの来店の流れ」で書かれている
 * （来店のまえに → 受付 → テーブル → 精算）。
 * 運営者にとっては「来店のまえに」ではないので、同じステップでも
 * 店をやる側の場面（集客と告知 → 許可と掲示 → チップの運用）に言い換える。
 *
 * 中身の法律は同じ。呼び方と導入文だけを切り替える。
 */
import type { Who } from "./checks";

export type ModeLabel = {
  /** 「STEP 8 ・ ○○」の ○○ の部分 */
  scene: string;
  /** 見出しの下の導入文 */
  text: string;
};

export const LABELS: Record<string, Record<Who, ModeLabel>> = {
  s0: {
    both: {
      scene: "来店のまえに",
      text: "来店する前に、ポーカー店がどんな場所なのかを知っておこう。",
    },
    shop: {
      scene: "考え方の土台",
      text: "お店を始める前に、関わる法律が2つあることを押さえます。刑法の賭博罪と、風営法です。",
    },
  },
  s1: {
    both: {
      scene: "お店を見つける",
      text: "SNSでお店を見つけました。その投稿、賞品や賞金を期待させていない？",
    },
    shop: {
      scene: "集客と告知",
      text: "広告やSNSの書き方を点検します。賞品が出ると読める表現は、禁止行為の予告になります。",
    },
  },
  s2: {
    both: {
      scene: "お店の入口",
      text: "お店に着きました。入口に許可証は貼ってある？",
    },
    shop: {
      scene: "許可と掲示",
      text: "どの許可が必要で、何を掲示しなければならないのかを確かめます。",
    },
  },
  s3: {
    both: {
      scene: "受付",
      text: "受付に通されました。いま何時？ 身分証の確認はある？",
    },
    shop: {
      scene: "営業時間と年齢確認",
      text: "営業できる時間と、年少者についてのルールを確かめます。条例で変わる部分があります。",
    },
  },
  s4: {
    both: {
      scene: "店内",
      text: "店内に入りました。明るさや見通しは、許可のときのまま保たれている？",
    },
    shop: {
      scene: "構造と設備",
      text: "許可を受けたときの造りを保てているか、設備の基準を確かめます。",
    },
  },
  s5: {
    both: {
      scene: "テーブル",
      text: "テーブルでチップを受け取りました。このチップ、持ち帰れる？",
    },
    shop: {
      scene: "チップの運用",
      text: "チップの持ち出し、預かり証、残高の記録について確かめます。",
    },
  },
  s6: {
    both: {
      scene: "精算",
      text: "ゲームが終わりました。ここがこのクエストで一番大事な関門です。",
    },
    shop: {
      scene: "賞品と精算",
      text: "ここが一番大事な関門です。遊技の結果に応じた提供になっていないかを確かめます。",
    },
  },
  s7: {
    both: {
      scene: "お店の外でも",
      text: "お店の中か外かに関係なく、賭けをしてはいけない理由を知ろう。",
    },
    shop: {
      scene: "賭博の3つの罪",
      text: "賭けた人・くりかえした人・場を開いた人。お店にとって一番重いのはどれかを確かめます。",
    },
  },
  s8: {
    both: {
      scene: "大会の日",
      text: "トーナメントの日。賞金は出るの？ 参加費はどうなっている？",
    },
    shop: {
      scene: "大会の企画",
      text: "トーナメントを開くとき、刑法 → 風営法 → スポンサーとの関係、の順に確かめます。",
    },
  },
  s9: {
    both: {
      scene: "見分けかたのまとめ",
      text: "ここまで見てきたことを、お店を選ぶときの目印としてまとめます。",
    },
    shop: {
      scene: "自己点検のまとめ",
      text: "点検の結果とリテラシーの点を、まとめて確認します。",
    },
  },
};

/** 「STEP 8 ・ イベント」→「STEP 8」。番号の部分はモードで変わらない */
export const stepNo = (tag: string) => tag.split("・")[0].trim();

/** モードに応じた「STEP 8 ・ 大会の企画」 */
export function fullTag(id: string, tag: string, mode: Who) {
  const l = LABELS[id]?.[mode];
  return l ? `${stepNo(tag)} ・ ${l.scene}` : tag;
}

export function label(id: string, mode: Who, fallback: { tag: string; scene: string }): ModeLabel {
  return LABELS[id]?.[mode] ?? { scene: stepNo(fallback.tag), text: fallback.scene };
}

/** HUD の説明文 */
export const HUD_SUB: Record<Who, string> = {
  shop: "お店をやる流れにそって、ルールを知り（クイズ）、できているかを点検する（チェック）",
  both: "来店の流れにそって、このお店がルールを守っているかを確かめよう",
};

/** トップページの導入 */
export const INTRO: Record<Who, string> = {
  shop: "各ステップの「お店からの説明」のとおりに話せば、クリーンな理由をお客さんに説明できます。チェック項目は、実際にできているかの自己点検です。",
  both: "来店の順にたどると、このお店がルールを守っているかが分かります。チェック項目は、お店の外から見分けられるものだけに絞られます。",
};
