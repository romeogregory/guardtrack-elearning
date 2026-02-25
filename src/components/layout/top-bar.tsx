"use client";

import { usePathname } from "next/navigation";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/catalogus": "Cursuscatalogus",
  "/profiel": "Profiel",
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.startsWith("/cursus")) return "Cursussen";
  return "Dashboard";
}

interface TopBarProps {
  notificationCount?: number;
}

export function TopBar({ notificationCount = 3 }: TopBarProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header
      className="sticky top-0 z-40 flex items-center shrink-0"
      style={{
        backgroundColor: "var(--briefing-elevated)",
        borderBottom: "1px solid var(--perimeter-soft)",
        height: 56,
        padding: "0 var(--space-5)",
      }}
    >
      <h1
        className="hidden md:block text-xl font-semibold shrink-0"
        style={{
          color: "var(--uniform)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h1>

      <div className="flex-1" />

      <div className="flex items-center" style={{ gap: "var(--space-4)" }}>
        <div className="relative w-full md:w-[280px]">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            size={16}
            style={{ color: "var(--uniform-muted)" }}
          />
          <Input
            placeholder="Zoek cursussen..."
            className="pl-9"
            style={{
              backgroundColor: "var(--control-bg)",
              borderColor: "var(--control-border)",
              borderRadius: "var(--radius-md)",
            }}
          />
        </div>

        <button
          className="relative flex items-center justify-center shrink-0 transition-colors ease-out"
          style={{
            width: 36,
            height: 36,
            borderRadius: "var(--radius-md)",
            color: "var(--uniform-secondary)",
            transitionDuration: "var(--duration-micro)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--vest-subtle)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span
              className="absolute flex items-center justify-center font-semibold text-white"
              style={{
                top: 2,
                right: 2,
                minWidth: 18,
                height: 18,
                fontSize: "0.6875rem",
                lineHeight: "1",
                borderRadius: "var(--radius-full)",
                backgroundColor: "var(--alert)",
                padding: "0 4px",
              }}
            >
              {notificationCount}
            </span>
          )}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="shrink-0 focus:outline-none focus-visible:ring-2"
              style={{ borderRadius: "var(--radius-full)" }}
            >
              <Avatar>
                <AvatarFallback
                  style={{
                    backgroundColor: "var(--vest)",
                    color: "white",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                  }}
                >
                  JV
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8}>
            <DropdownMenuItem>Mijn Profiel</DropdownMenuItem>
            <DropdownMenuItem>Instellingen</DropdownMenuItem>
            <DropdownMenuItem>Uitloggen</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
