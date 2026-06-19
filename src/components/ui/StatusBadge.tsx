import type { Character } from "@/types";
import { cn } from "@/lib/utils";

type CharacterStatus = Character["status"];

const statusStyles: Record<CharacterStatus, { dot: string; badge: string; label: string }> = {
  Alive: {
    dot: "bg-status-alive",
    badge: "border-status-alive/25 bg-status-alive/10 text-status-alive",
    label: "Alive",
  },
  Dead: {
    dot: "bg-status-dead",
    badge: "border-status-dead/25 bg-status-dead/10 text-status-dead",
    label: "Dead",
  },
  unknown: {
    dot: "bg-status-unknown",
    badge: "border-status-unknown/25 bg-status-unknown/10 text-status-unknown",
    label: "Unknown",
  },
};

export function StatusBadge({
  status,
  className,
}: {
  status: CharacterStatus;
  className?: string;
}) {
  const styles = statusStyles[status];

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-black uppercase tracking-wider",
        styles.badge,
        className
      )}
    >
      <span className={cn("h-2.5 w-2.5 rounded-full shadow-sm", styles.dot)} aria-hidden="true" />
      {styles.label}
    </span>
  );
}
