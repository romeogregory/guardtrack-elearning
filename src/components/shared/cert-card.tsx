import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { BadgeTag } from "./badge-tag";

type CertStatus = "geldig" | "verloopt" | "verlopen";

interface CertCardProps {
  name: string;
  issuingBody: string;
  earnedDate: string;
  expiryDate: string;
  status: CertStatus;
  daysUntilExpiry?: number;
  className?: string;
}

const statusColors: Record<CertStatus, string> = {
  geldig: "var(--cleared)",
  verloopt: "var(--vest)",
  verlopen: "var(--alert)",
};

export function CertCard({
  name,
  issuingBody,
  earnedDate,
  expiryDate,
  status,
  daysUntilExpiry,
  className,
}: CertCardProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      style={{
        backgroundColor: "var(--briefing-elevated)",
        border: "1px solid var(--perimeter)",
        borderLeft: `3px solid ${statusColors[status]}`,
        borderRadius: "var(--radius-lg)",
        padding: "var(--space-5)",
        boxShadow: "var(--shadow-lifted)",
      }}
    >
      <div className="flex items-start" style={{ gap: "var(--space-3)" }}>
        <ShieldCheck
          size={24}
          className="shrink-0"
          style={{ color: statusColors[status], marginTop: 2 }}
        />
        <div className="flex-1 min-w-0">
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "var(--uniform)",
            }}
          >
            {name}
          </h3>
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              color: "var(--uniform-tertiary)",
            }}
          >
            {issuingBody}
          </span>
        </div>
        <BadgeTag variant={status}>
          {status === "geldig"
            ? "Geldig"
            : status === "verloopt"
              ? "Verloopt"
              : "Verlopen"}
        </BadgeTag>
      </div>

      <div
        className="grid grid-cols-2"
        style={{
          marginTop: "var(--space-4)",
          gap: "var(--space-3)",
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              color: "var(--uniform-tertiary)",
            }}
          >
            Behaald
          </span>
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--uniform-secondary)",
            }}
          >
            {earnedDate}
          </span>
        </div>
        <div>
          <span
            style={{
              display: "block",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              color: "var(--uniform-tertiary)",
            }}
          >
            Verloopt
          </span>
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--uniform-secondary)",
            }}
          >
            {expiryDate}
          </span>
        </div>
      </div>

      {status === "verloopt" && daysUntilExpiry !== undefined && (
        <span
          style={{
            marginTop: "var(--space-3)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--vest)",
          }}
        >
          Verloopt over {daysUntilExpiry} dagen
        </span>
      )}

      {status === "verlopen" && daysUntilExpiry !== undefined && (
        <span
          style={{
            marginTop: "var(--space-3)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--alert)",
          }}
        >
          Verlopen {Math.abs(daysUntilExpiry)} dagen geleden
        </span>
      )}
    </div>
  );
}
