"use client";

import { useState } from "react";
import { AppSidebar } from "./app-sidebar";
import { BottomTabs } from "./bottom-tabs";
import { TopBar } from "./top-bar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AppSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <div className="flex flex-1 flex-col min-h-screen min-w-0">
        <TopBar />
        <main
          className="flex-1 overflow-y-auto pb-20 md:pb-0"
          style={{ padding: "var(--space-6)" }}
        >
          {children}
        </main>
      </div>

      <BottomTabs />
    </div>
  );
}
