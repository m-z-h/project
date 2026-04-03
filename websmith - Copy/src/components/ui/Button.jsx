export default function Button({ 
  children, 
  onClick, 
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style = {},
  className = "",
}) {
  const baseStyles = {
    ...styles.base,
    ...styles[variant],
    ...styles[size],
    ...(disabled ? styles.disabled : {}),
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={baseStyles}
      className={`${className} ${loading ? "loading" : ""}`}
    >
      {loading && <span style={styles.spinner}></span>}
      {children}
    </button>
  );
}

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    border: "none",
    borderRadius: "10px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
  },
  primary: {
    background: "#007AFF",
    color: "#FFFFFF",
  },
  secondary: {
    background: "#F2F2F7",
    color: "#1C1C1E",
  },
  success: {
    background: "#34C759",
    color: "#FFFFFF",
  },
  danger: {
    background: "#FF3B30",
    color: "#FFFFFF",
  },
  medium: {
    padding: "10px 20px",
    fontSize: "14px",
  },
  large: {
    padding: "14px 28px",
    fontSize: "16px",
  },
  small: {
    padding: "6px 14px",
    fontSize: "12px",
  },
  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#FFFFFF",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};
