"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, [pathname]); // also re-run auth check on path change just in case but usually localStorage triggers are sufficient

  // Render a clean structure before mounting avoiding massive React hydration errors
  if (!mounted) {
    return (
      <main style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </main>
    );
  }

  // Core Login paths always strip out sidebars.
  const isAuthPage = pathname === "/login" || pathname === "/register";
  
  // Conditionally hide sidebar on root ("/") ONLY if no valid token is found.
  const hideSidebar = isAuthPage || (pathname === "/" && !isLoggedIn);

  if (hideSidebar) {
    return (
      <main style={{ flex: 1, overflow: "hidden" }}>
        {children}
      </main>
    );
  }

  return (
    <>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "30px",
          height: "100vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {children}
      </main>
    </>
  );
}
