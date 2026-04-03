"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case "primary":
        return {
          background: "#007AFF",
          color: "#fff",
          border: "none",
        };
      case "secondary":
        return {
          background: "rgba(0,122,255,0.1)",
          color: "#007AFF",
          border: "none",
        };
      case "danger":
        return {
          background: "#FF3B30",
          color: "#fff",
          border: "none",
        };
      case "ghost":
        return {
          background: "transparent",
          color: "#1d1d1f",
          border: "none",
        };
      default:
        return {};
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return { padding: "8px 16px", fontSize: "13px" };
      case "md":
        return { padding: "10px 20px", fontSize: "14px" };
      case "lg":
        return { padding: "14px 28px", fontSize: "16px" };
      default:
        return {};
    }
  };

  return (
    <button
      disabled={disabled || loading}
      style={{
        ...styles.button,
        ...getVariantStyle(),
        ...getSizeStyle(),
        opacity: disabled || loading ? 0.6 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.filter = "brightness(0.9)";
          e.currentTarget.style.transform = "translateY(-1px)";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.filter = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }
      }}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

const styles: any = {
  button: {
    borderRadius: "10px",
    fontWeight: 600,
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: "-0.2px",
  },
};