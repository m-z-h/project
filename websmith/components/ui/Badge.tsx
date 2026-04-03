"use client";

import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "warning" | "error" | "info";
}

export default function Badge({ children, variant = "info" }: BadgeProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case "success":
        return { background: "#E8F5E9", color: "#34C759" };
      case "warning":
        return { background: "#FFF4E5", color: "#FF9500" };
      case "error":
        return { background: "#FFE5E5", color: "#FF3B30" };
      case "info":
      default:
        return { background: "#E3F2FF", color: "#007AFF" };
    }
  };

  return (
    <span style={{ ...styles.badge, ...getVariantStyle() }}>
      {children}
    </span>
  );
}

const styles: any = {
  badge: {
    padding: "4px 10px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "-0.2px",
  },
};
