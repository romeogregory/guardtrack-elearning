"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  User,
} from "lucide-react";

const tabItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Catalogus", icon: BookOpen, href: "/catalogus" },
  { label: "Cursussen", icon: GraduationCap, href: "/cursus" },
  { label: "Profiel", icon: User, href: "/profiel" },
];

export function BottomTabs() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex md:hidden items-center justify-around z-50"
      style={{
        backgroundColor: "var(--briefing-elevated)",
        borderTop: "1px solid var(--perimeter-soft)",
        boxShadow: "var(--shadow-lifted)",
        paddingBottom: "env(safe-area-inset-bottom)",
        height: 64,
      }}
    >
      {tabItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px]"
            style={{
              color: active ? "var(--vest)" : "var(--uniform-tertiary)",
              gap: "var(--space-1)",
            }}
          >
            <item.icon size={20} />
            <span
              className="font-medium"
              style={{
                fontSize: "0.8125rem",
                lineHeight: "1",
                letterSpacing: "0.01em",
              }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
