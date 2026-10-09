"use client";

import Button from "@/components/Button";

// Shown if something unexpected crashes a page. `reset` tries to draw the page again.
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="mt-3 text-muted">The page hit an unexpected problem. Your input was not sent anywhere. Try again, and reload the page if it keeps happening.</p>
      <Button variant="primary" className="mt-6" onClick={reset}>Try again</Button>
    </div>
  );
}
