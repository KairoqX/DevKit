import JsonTool from "@/components/tools/JsonTool";
import ToolLayout from "@/components/ToolLayout";
import { buildMetadata } from "@/lib/metadata";
import { getTool, toolPath } from "@/lib/tools";

const tool = getTool("json-formatter");

export const metadata = buildMetadata({
  title: tool.seoTitle,
  description: tool.seoDescription,
  path: toolPath(tool),
});

export default function Page() {
  return (
    <ToolLayout tool={tool}>
      <JsonTool />
    </ToolLayout>
  );
}
