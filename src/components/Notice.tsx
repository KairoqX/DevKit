import type { ReactNode } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";

interface NoticeProps {
  kind: "error" | "success";
  children: ReactNode;
}

// Errors use role="alert" so screen readers announce them straight away.
export default function Notice({ kind, children }: NoticeProps) {
  const isError = kind === "error";
  return (
    <div
      role={isError ? "alert" : "status"}
      className={`flex items-start gap-2.5 rounded-md border px-3.5 py-3 text-sm ${
        isError ? "border-danger/30 bg-danger-soft text-danger" : "border-accent/30 bg-accent-soft text-accent-strong"
      }`}
    >
      {isError ? <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden /> : <CircleCheck size={18} className="mt-0.5 shrink-0" aria-hidden />}
      <p className="min-w-0 break-words">{children}</p>
    </div>
  );
}
