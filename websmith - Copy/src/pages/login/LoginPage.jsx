import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../core/services/apiService";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", formData);
      
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.data));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>Sign in to your Websmith account</p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />

          {error && <div style={styles.error}>{error}</div>}

          <Button 
            type="submit" 
            loading={loading} 
            style={{ width: "100%", marginTop: "16px" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account?{" "}
            <span 
              style={styles.link} 
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "40px",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  title: {
    margin: "0 0 8px 0",
    fontSize: "28px",
    fontWeight: 600,
    color: "#1C1C1E",
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    color: "#8E8E93",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  error: {
    padding: "12px",
    background: "#FFE5E5",
    color: "#FF3B30",
    borderRadius: "10px",
    fontSize: "13px",
  },
  footer: {
    marginTop: "24px",
    textAlign: "center",
  },
  footerText: {
    margin: 0,
    fontSize: "14px",
    color: "#8E8E93",
  },
  link: {
    color: "#007AFF",
    fontWeight: 500,
    cursor: "pointer",
    textDecoration: "underline",
  },
};
