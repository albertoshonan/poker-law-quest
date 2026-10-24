import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Hud } from "@/components/Hud";
import { Quiz } from "@/components/Quiz";
import { Roadmap } from "@/components/Roadmap";
import { ScoreCard, Declaration } from "@/components/ScoreCard";
import { LawSummary, StepBody } from "@/components/StepBody";
import { StepHeading } from "@/components/StepHeading";
import { Pager } from "@/components/Pager";
import { Checklist } from "@/components/Checklist";
import { CleanReport } from "@/components/CleanReport";
import { Disclaimer } from "@/components/Disclaimer";
import { byId, CONF, STAGES } from "@/lib/stages";
import { LABELS, stepNo } from "@/lib/modeLabels";

/** 10ステップぶんのHTMLを、ビルド時に静的生成する */
export function generateStaticParams() {
  return STAGES.map((s) => ({ id: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const s = byId(id);
  if (!s) return {};
  const title = `${stepNo(s.tag)}　${s.name}`;
  // 既定（運営者モード）の導入文＋要旨を説明文に使う。条文の原文ではない
  const lead = LABELS[s.id]?.shop.text ?? s.scene;
  const description = `${lead} ${s.gist}`.slice(0, 118);
  return {
    title,
    description,
    alternates: { canonical: `/step/${s.id}/` },
    openGraph: {
      title: `${title}｜ポーカー法令クエスト`,
      description,
      url: `/step/${s.id}/`,
      type: "article",
    },
  };
}

export default async function StepPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = byId(id);
  if (!s) notFound();


  return (
    <div className="wrap">
      <Hud />
      <main className="game">
        <Roadmap current={s.id} />
        <article className="panel">
          <StepHeading stage={s} />
          <div className="pbody">
            {/* 読んでから試すのではなく、まず試してから読めるようにクイズを先に置く */}
            <LawSummary stage={s} />
            <Quiz stage={s} />
            <StepBody stage={s} />
            {/* 知っているか（クイズ）とは別に、できているかを点検する */}
            <Checklist stageId={s.id} />
            {s.final && (
              <>
                <CleanReport />
                <ScoreCard />
                <Declaration />
              </>
            )}
            <Pager stage={s} />
          </div>
        </article>
      </main>
      <Disclaimer conf={CONF} />
    </div>
  );
}
