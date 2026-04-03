export default function Card({ children, style = {}, className = "" }) {
  return (
    <div style={{ ...styles.card, ...style }} className={`card ${className}`}>
      {children}
    </div>
  );
}

const styles = {
  card: {
    background: "#FFFFFF",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
    border: "1px solid #E5E5EA",
    transition: "all 0.2s ease",
  },
};
