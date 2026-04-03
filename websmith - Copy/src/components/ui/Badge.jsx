export default function Badge({ 
  children, 
  variant = "default",
  size = "medium",
  style = {},
  className = "",
}) {
  const baseStyles = {
    ...styles.base,
    ...styles[variant],
    ...styles[size],
    ...style,
  };

  return (
    <span style={baseStyles} className={`badge ${className}`}>
      {children}
    </span>
  );
}

const styles = {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100px",
    fontWeight: 500,
  },
  default: {
    background: "#F2F2F7",
    color: "#1C1C1E",
  },
  primary: {
    background: "#E3F2FF",
    color: "#007AFF",
  },
  success: {
    background: "#E8F5E9",
    color: "#34C759",
  },
  warning: {
    background: "#FFF4E5",
    color: "#FF9500",
  },
  danger: {
    background: "#FFE5E5",
    color: "#FF3B30",
  },
  medium: {
    padding: "4px 12px",
    fontSize: "13px",
  },
  small: {
    padding: "2px 8px",
    fontSize: "11px",
  },
};
