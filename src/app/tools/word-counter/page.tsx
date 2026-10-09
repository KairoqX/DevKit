import CounterTool from "@/components/tools/CounterTool";
import ToolLayout from "@/components/ToolLayout";
import { buildMetadata } from "@/lib/metadata";
import { getTool, toolPath } from "@/lib/tools";

const tool = getTool("word-counter");

export const metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: toolPath(tool),
});

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <CounterTool />
    </ToolLayout>
  );
}
