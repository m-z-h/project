export default function Input({ 
  type = "text",
  value,
  onChange,
  placeholder,
  label,
  error,
  disabled = false,
  style = {},
  className = "",
  ...props
}) {
  return (
    <div style={{ ...styles.container, ...style }} className={`input-container ${className}`}>
      {label && <label style={styles.label}>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          ...styles.input,
          ...(error ? styles.inputError : {}),
          ...(disabled ? styles.inputDisabled : {}),
        }}
        {...props}
      />
      {error && <span style={styles.errorText}>{error}</span>}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    width: "100%",
  },
  label: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#1C1C1E",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid #E5E5EA",
    fontSize: "14px",
    color: "#1C1C1E",
    background: "#FFFFFF",
    outline: "none",
    transition: "all 0.2s ease",
  },
  inputError: {
    borderColor: "#FF3B30",
  },
  inputDisabled: {
    background: "#F2F2F7",
    cursor: "not-allowed",
  },
  errorText: {
    fontSize: "12px",
    color: "#FF3B30",
  },
};
