import type { MetadataRoute } from "next";
import { STAGES } from "@/lib/stages";
import { SITE } from "./layout";

/** 静的書き出しでも sitemap.xml が out/ に生成される */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ["", "sources/", "unconfirmed/"].map((p) => ({
    url: `${SITE}/${p}`,
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.6,
  }));
  const steps = STAGES.map((s) => ({
    url: `${SITE}/step/${s.id}/`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  return [...fixed, ...steps];
}
