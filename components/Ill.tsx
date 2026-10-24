import { ILL } from "@/lib/illustrations";

/** ラインアートのアイコン。viewBox を変えるだけで大小を使い分ける */
export function Ill({ name, size = 64 }: { name: string; size?: 64 | 36 | 24 }) {
  return (
    <svg
      className="ill"
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ILL[name] ?? "" }}
    />
  );
}

export const Small = ({ name }: { name: string }) => <Ill name={name} size={36} />;
export const Tiny = ({ name }: { name: string }) => <Ill name={name} size={24} />;

export type Mood = "idle" | "happy" | "sad" | "cheer";

/**
 * 案内役のキャラクター。
 *
 * もらった Ema.svg はレイヤーごとの PNG を8枚埋め込んだ 722KB のファイルで
 * ベクターのパスを持っていなかったため、同じ絵柄をベクターに起こし直している。
 * レイヤー名（ear / body / hand / eyes）の分け方はそのまま踏襲した。
 * 線は currentColor なので、置き場所の color で紺にも金にもなる。
 */
export function Ema({ mood = "idle" }: { mood?: Mood }) {
  const L = { idle: -13, happy: -7, sad: -40, cheer: -24 }[mood];
  const R = -L;
  const eyes =
    mood === "happy" || mood === "cheer" ? (
      <>
        <path className="eye" d="M23.2 45c1.3-1.8 3.2-1.8 4.5 0" />
        <path className="eye" d="M36.3 45c1.3-1.8 3.2-1.8 4.5 0" />
      </>
    ) : mood === "sad" ? (
      <>
        <path className="eye" d="M23.2 46.2c1.3 1.6 3.2 1.6 4.5 0" />
        <path className="eye" d="M36.3 46.2c1.3 1.6 3.2 1.6 4.5 0" />
      </>
    ) : (
      <>
        <circle className="dot" cx="25.5" cy="45" r="2" />
        <circle className="dot" cx="38.5" cy="45" r="2" />
      </>
    );
  // ばんざいのときだけ手を上げる
  const paws =
    mood === "cheer" ? (
      <>
        <circle className="wf paw" cx="11.6" cy="36" r="3.8" />
        <circle className="wf paw" cx="52.4" cy="36" r="3.8" />
      </>
    ) : (
      <>
        <circle className="wf paw" cx="13.4" cy="52.6" r="3.8" />
        <circle className="wf paw" cx="50.6" cy="52.6" r="3.8" />
      </>
    );
  return (
    <svg className={`ill ema mood-${mood}`} viewBox="0 0 64 64" aria-hidden="true">
      <g className="ear" transform={`rotate(${L} 26 32)`}>
        <ellipse className="wf" cx="26" cy="20" rx="6.3" ry="13.2" />
        <ellipse className="ear-in" cx="26.7" cy="21.4" rx="3.1" ry="9" />
      </g>
      <g className="ear" transform={`rotate(${R} 38 32)`}>
        <ellipse className="wf" cx="38" cy="20" rx="6.3" ry="13.2" />
        <ellipse className="ear-in" cx="37.3" cy="21.4" rx="3.1" ry="9" />
      </g>
      <ellipse className="wf body" cx="32" cy="42" rx="18" ry="14.6" />
      {paws}
      {eyes}
    </svg>
  );
}
