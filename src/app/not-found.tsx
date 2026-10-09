import Link from "next/link";
import PageShell from "@/components/PageShell";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <PageShell title="Page not found" intro="This page doesn’t exist or has moved.">
      <p>
        Go back to the <Link href="/">home page</Link> or browse <Link href="/#tools">all tools</Link>.
      </p>
    </PageShell>
  );
}
