import { CodeBlock } from "../shared";

interface Props {
  code: string;
  lang: "py" | "js";
  height?: number;
  title?: string;
  showLines?: boolean;
}

export default function CodeRunner({ code, lang, height: _height, title, showLines }: Props) {
  return (
    <CodeBlock
      code={code}
      lang={lang}
      runnable
      title={title}
      showLines={showLines}
    />
  );
}
