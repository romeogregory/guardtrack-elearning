"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  User,
  ChevronsLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Catalogus", icon: BookOpen, href: "/catalogus" },
  { label: "Cursussen", icon: GraduationCap, href: "/cursus" },
  { label: "Profiel", icon: User, href: "/profiel" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function AppSidebar({ collapsed, onToggleCollapse }: AppSidebarProps) {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 border-r transition-[width] ease-in-out"
      )}
      style={{
        width: collapsed ? 64 : 240,
        backgroundColor: "var(--briefing)",
        borderColor: "var(--perimeter)",
        transitionDuration: "var(--duration-expand)",
      }}
    >
      <div
        className="flex items-center overflow-hidden whitespace-nowrap shrink-0"
        style={{
          padding: "var(--space-5)",
          height: 56,
        }}
      >
        <span
          className="text-xl font-bold shrink-0"
          style={{ color: "var(--vest)" }}
        >
          {collapsed ? "GT" : "GuardTrack"}
        </span>
      </div>

      <TooltipProvider>
        <nav
          className="flex flex-col flex-1"
          style={{ gap: "var(--space-2)", padding: "0 var(--space-3)" }}
        >
          {navItems.map((item) => {
            const active = isActive(item.href);
            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center transition-colors ease-out"
                )}
                style={{
                  gap: "var(--space-3)",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-md)",
                  color: active ? "var(--vest)" : "var(--uniform-secondary)",
                  backgroundColor: active ? "var(--vest-subtle)" : "transparent",
                  transitionDuration: "var(--duration-micro)",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "var(--vest-subtle)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <item.icon className="shrink-0" size={20} />
                <span
                  className={cn(
                    "text-base font-semibold transition-opacity ease-in-out overflow-hidden whitespace-nowrap"
                  )}
                  style={{
                    opacity: collapsed ? 0 : 1,
                    transitionDuration: "var(--duration-expand)",
                    width: collapsed ? 0 : "auto",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );

            if (collapsed) {
              return (
                <Tooltip key={item.href}>
                  <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              );
            }

            return <div key={item.href}>{linkContent}</div>;
          })}
        </nav>
      </TooltipProvider>

      <button
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Sidebar uitklappen" : "Sidebar inklappen"}
        className="mt-auto flex items-center justify-center transition-colors ease-out"
        style={{
          margin: "var(--space-3)",
          padding: "var(--space-3)",
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
        <ChevronsLeft
          size={20}
          className="transition-transform ease-in-out"
          style={{
            transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
            transitionDuration: "var(--duration-expand)",
          }}
        />
      </button>
    </aside>
  );
}
