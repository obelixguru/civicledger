import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center">
        <svg
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          aria-hidden
        >
          <circle
            cx="14"
            cy="14"
            r="13"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-foreground"
          />
          <path
            d="M9 14.5L12.5 18L19 11.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-emerald"
          />
          <circle
            cx="14"
            cy="14"
            r="6"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeDasharray="2 2"
            className="text-foreground/40"
          />
        </svg>
      </span>
      <span className="text-[15px] tracking-tight">
        Civic<span className="text-brand-emerald">Ledger</span>
      </span>
    </Link>
  );
}
