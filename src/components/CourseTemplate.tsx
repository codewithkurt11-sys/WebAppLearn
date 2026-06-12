import { useState } from "react";
import { T, CodeBlock, InfoBox, Card, CardTitle, IC, TabBar, PageHeader, Quiz, Tab, Question } from "../shared";

export interface CourseExample {
  title: string;
  /** Plain-English explanation displayed inline above the code (no collapsibles). */
  explanation: string;
  code: string;
  lang?: string;
}

export interface CourseSection {
  id: string;
  label: string;
  /** Short intro paragraph in plain English. */
  intro: string;
  examples: CourseExample[];
  tips?: { type: "tip" | "warn" | "info" | "note"; text: string }[];
}

export interface CourseConfig {
  title: string;
  subtitle: string;
  tagColor: string;
  lang: string;
  trackKey: string;
  pageId: string;
  sections: CourseSection[];
  quiz: Question[];
}

export function CourseTemplate({ config }: { config: CourseConfig }) {
  const tabs: Tab[] = [
    ...config.sections.map(s => ({ id: s.id, label: s.label })),
    { id: "quiz", label: "Quiz 🎯" },
  ];
  const [tab, setTab] = useState(tabs[0].id);
  const current = config.sections.find(s => s.id === tab);

  return (
    <div style={{ padding: "16px 18px 60px", maxWidth: 1100, margin: "0 auto" }}>
      <PageHeader title={config.title} subtitle={config.subtitle} color={config.tagColor} />
      <TabBar tabs={tabs} active={tab} onChange={setTab} pageId={config.pageId} />

      {tab === "quiz" ? (
        <Quiz questions={config.quiz} trackKey={config.trackKey} />
      ) : current ? (
        <>
          <Card>
            <CardTitle color={config.tagColor}>{current.label}</CardTitle>
            <p style={{ fontSize: 13, color: T.muted2, lineHeight: 1.7, marginBottom: 6 }}>
              {current.intro}
            </p>
          </Card>

          {current.examples.map((ex, i) => (
            <Card key={i}>
              <CardTitle color={config.tagColor}>
                {i + 1}. {ex.title}
              </CardTitle>
              <p style={{ fontSize: 12.5, color: T.muted2, lineHeight: 1.65, marginBottom: 10 }}>
                {ex.explanation}
              </p>
              <CodeBlock lang={ex.lang ?? config.lang} showLines code={ex.code} />
            </Card>
          ))}

          {current.tips && current.tips.length > 0 && (
            <Card>
              <CardTitle color={config.tagColor}>Tips &amp; Pitfalls</CardTitle>
              {current.tips.map((t, i) => (
                <InfoBox key={i} type={t.type}>{t.text}</InfoBox>
              ))}
            </Card>
          )}
        </>
      ) : null}
    </div>
  );
}

// Re-export so pages can keep one import line
export { T, IC };
