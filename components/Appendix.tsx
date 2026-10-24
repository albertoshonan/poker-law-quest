import { Fragment } from "react";
import data from "@/lib/appendix.json";

type Group = {
  title: string;
  badges: string[];
  head?: string[];
  rows?: string[][];
  note?: string;
};
type Section = { lead: string; groups: Group[] };

const APPENDIX = data as unknown as { todo: Section; src: Section };

/**
 * セル内の軽い記法を描く。
 * 元の1枚HTMLから機械的に書き出した際、**強調** と [文言](URL) と `コード` に落としてある。
 */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("**") && p.endsWith("**")) return <b key={i}>{p.slice(2, -2)}</b>;
        if (p.startsWith("`") && p.endsWith("`")) return <code key={i}>{p.slice(1, -1)}</code>;
        const m = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m)
          return (
            <a key={i} href={m[2]} target="_blank" rel="noopener noreferrer">
              {m[1]}
            </a>
          );
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

function GroupBlock({ g }: { g: Group }) {
  return (
    <>
      <div className="grp">
        {g.badges.map((b) => (
          <span key={b} className={`kind${b === "業界内" ? " ind" : ""}`}>
            {b}
          </span>
        ))}
        {g.title}
      </div>
      {g.note ? (
        <p className="lead">
          <Rich text={g.note} />
        </p>
      ) : (
        <div className="tbl">
          <table>
            <thead>
              <tr>
                {g.head?.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {g.rows?.map((r, i) => (
                <tr key={i}>
                  {r.map((c, j) => (
                    <td key={j} className={j === 0 && /^\d+$/.test(c) ? "num" : ""}>
                      <Rich text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export function AppendixSection({ which }: { which: "todo" | "src" }) {
  const sec = APPENDIX[which];
  return (
    <>
      <p className="lead">
        <Rich text={sec.lead} />
      </p>
      {sec.groups.map((g, i) => (
        <GroupBlock key={i} g={g} />
      ))}
    </>
  );
}

/** 要確認の項目数（見出しに出す） */
export const TODO_COUNT = APPENDIX.todo.groups.reduce(
  (a, g) => a + (g.rows?.length ?? 0),
  0,
);
