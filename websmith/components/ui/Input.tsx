"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  style,
  ...props
}: InputProps) {
  return (
    <div style={styles.container}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        style={{
          ...styles.input,
          border: error ? "1.5px solid #FF3B30" : "1.5px solid #E5E5EA",
          ...style,
        }}
        onFocus={(e) => {
          if (!error) e.currentTarget.style.borderColor = "#007AFF";
          e.currentTarget.style.boxShadow = "0 0 0 4px rgba(0, 122, 255, 0.1)";
        }}
        onBlur={(e) => {
          if (!error) e.currentTarget.style.borderColor = "#E5E5EA";
          e.currentTarget.style.boxShadow = "none";
        }}
        {...props}
      />
      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}

const styles: any = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
    marginBottom: "16px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#86868b",
    marginLeft: "4px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "10px",
    fontSize: "15px",
    background: "#fff",
    color: "#1d1d1f",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    width: "100%",
  },
  errorText: {
    fontSize: "12px",
    color: "#FF3B30",
    marginLeft: "4px",
  },
};