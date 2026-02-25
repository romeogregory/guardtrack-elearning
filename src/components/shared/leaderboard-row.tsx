import { Trophy, Shield, Flame, Medal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface LeaderboardRowProps {
  rank: number;
  name: string;
  avatarInitials: string;
  points: number;
  badgeCount: number;
  streak: number;
  isCurrentUser?: boolean;
  className?: string;
}

function RankDisplay({ rank }: { rank: number }) {
  if (rank <= 3) {
    const colors: Record<number, string> = {
      1: "var(--vest)",
      2: "var(--uniform-tertiary)",
      3: "var(--vest-hover)",
    };
    return <Medal size={20} style={{ color: colors[rank] }} />;
  }
  return (
    <span
      className="flex items-center justify-center"
      style={{
        width: 20,
        fontSize: "0.9375rem",
        fontWeight: 600,
        color: "var(--uniform-tertiary)",
      }}
    >
      {rank}
    </span>
  );
}

export function LeaderboardRow({
  rank,
  name,
  avatarInitials,
  points,
  badgeCount,
  streak,
  isCurrentUser = false,
  className,
}: LeaderboardRowProps) {
  return (
    <div
      className={cn("flex items-center", className)}
      style={{
        padding: "var(--space-3) var(--space-4)",
        borderBottom: "1px solid var(--perimeter-soft)",
        backgroundColor: isCurrentUser ? "var(--vest-subtle)" : "transparent",
        borderLeft: isCurrentUser
          ? "3px solid var(--perimeter-emphasis)"
          : "3px solid transparent",
        borderRadius: isCurrentUser ? "var(--radius-md)" : undefined,
        gap: "var(--space-3)",
      }}
    >
      <div className="flex items-center justify-center" style={{ width: 24 }}>
        <RankDisplay rank={rank} />
      </div>

      <Avatar>
        <AvatarFallback
          style={{
            backgroundColor: "var(--vest-light)",
            color: "var(--vest-hover)",
            fontSize: "0.8125rem",
            fontWeight: 600,
          }}
        >
          {avatarInitials}
        </AvatarFallback>
      </Avatar>

      <span
        className="flex-1 min-w-0 truncate"
        style={{
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--uniform)",
        }}
      >
        {name}
      </span>

      <div className="hidden sm:flex items-center" style={{ gap: "var(--space-4)" }}>
        <div
          className="flex items-center"
          style={{
            gap: "var(--space-1)",
            fontSize: "0.9375rem",
            color: "var(--uniform-secondary)",
          }}
        >
          <Trophy size={14} />
          {points}
        </div>

        <div
          className="flex items-center"
          style={{
            gap: "var(--space-1)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--uniform-tertiary)",
          }}
        >
          <Shield size={14} />
          {badgeCount}
        </div>

        <div
          className="flex items-center"
          style={{
            gap: "var(--space-1)",
            fontSize: "0.8125rem",
            fontWeight: 500,
            color: "var(--vest)",
          }}
        >
          <Flame size={14} />
          {streak}
        </div>
      </div>
    </div>
  );
}
