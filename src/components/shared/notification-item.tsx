import { cn } from "@/lib/utils";

interface NotificationItemProps {
  icon: React.ReactNode;
  message: string;
  timeAgo: string;
  isRead: boolean;
  variant?: "default" | "warning" | "danger" | "info";
}

const variantColors: Record<string, string> = {
  default: "var(--uniform-tertiary)",
  warning: "var(--caution)",
  danger: "var(--alert)",
  info: "var(--dispatch)",
};

export function NotificationItem({
  icon,
  message,
  timeAgo,
  isRead,
  variant = "default",
}: NotificationItemProps) {
  return (
    <div
      className={cn("flex items-start")}
      style={{
        padding: "var(--space-3) var(--space-4)",
        borderBottom: "1px solid var(--perimeter-soft)",
        backgroundColor: isRead ? "transparent" : "var(--vest-subtle)",
        gap: "var(--space-3)",
      }}
    >
      <div
        className="shrink-0 flex items-center justify-center"
        style={{ color: variantColors[variant], marginTop: 2 }}
      >
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <p
          style={{
            fontSize: "0.9375rem",
            lineHeight: "1.4",
            fontWeight: isRead ? 400 : 500,
            color: "var(--uniform)",
          }}
        >
          {message}
        </p>
        <span
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            letterSpacing: "0.01em",
            color: "var(--uniform-tertiary)",
          }}
        >
          {timeAgo}
        </span>
      </div>

      {!isRead && (
        <div
          className="shrink-0 rounded-full"
          style={{
            width: 8,
            height: 8,
            backgroundColor: "var(--vest)",
            marginTop: 6,
          }}
        />
      )}
    </div>
  );
}
