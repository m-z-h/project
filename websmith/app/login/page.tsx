"use client";

import { useState } from "react";
import { login } from "../../core/services/authService";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div style={styles.container}>
      {/* Background gradient */}
      <div style={styles.background}></div>

      {/* Main content */}
      <div style={styles.card}>
        {/* Logo - Circle Mask with WSD */}
        <div style={styles.logoContainer}>
          <div 
            style={styles.circleMask}
            className="circle-mask-hover"
          >
            <span style={styles.circleText}>WSD</span>
          </div>
          <h1 
            style={styles.logoText}
            className="logo-text-hover"
          >
            Web Smith Digital
          </h1>
        </div>

        {/* Welcome text */}
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome back</h2>
          <p style={styles.subtitle}>Sign in to continue to your workspace</p>
        </div>

        {/* Error message */}
        {error && (
          <div style={styles.errorContainer}>
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        {/* Email input */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email address</label>
          <div style={styles.inputWrapper}>
            <Mail size={18} style={styles.inputIcon} />
            <input
              type="email"
              placeholder="hello@websmith.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
              disabled={isLoading}
              className="input-focus"
            />
          </div>
        </div>

        {/* Password input */}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <div style={styles.inputWrapper}>
            <Lock size={18} style={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
              disabled={isLoading}
              className="input-focus"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              style={styles.eyeButton}
              type="button"
              className="eye-button-hover"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Forgot password link */}
        <div style={styles.forgotContainer}>
          <a 
            href="#" 
            style={styles.forgotLink}
            className="forgot-link-hover"
          >
            Forgot password?
          </a>
        </div>

        {/* Sign In button - Gray with Green hover + Sidebar animation */}
        <button
          onClick={handleLogin}
          disabled={isLoading}
          style={{
            ...styles.signinButton,
            ...(isLoading ? styles.signinButtonDisabled : {}),
          }}
          className="signin-button"
        >
          {isLoading ? (
            <div style={styles.spinner}></div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div style={styles.dividerContainer}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>or continue with</span>
          <div style={styles.dividerLine}></div>
        </div>

        {/* Google Btn */}
        <button
          onClick={() => console.log("Google Signup Triggered")}
          style={styles.googleBtn}
          className="google-btn-hover"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
          </svg>
          Google
        </button>

        {/* Sign up link with Sidebar animation */}
        <div style={styles.signupContainer}>
          <span style={styles.signupText}>Don&apos;t have an account?</span>
          <button 
            onClick={() => router.push("/register")} 
            style={styles.signupButton}
            className="signup-button"
          >
            Create one
          </button>
        </div>
      </div>

      {/* Footer - Copyright */}
      <div style={styles.footer}>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} Websmith. All rights reserved.
        </p>
      </div>

      {/* All Animations */}
      <style>{`
        /* Circle Mask Hover - Zoom In */
        .circle-mask-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        
        .circle-mask-hover:hover {
          transform: scale(1.1) translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        
        /* Logo Text Hover */
        .logo-text-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          display: inline-block;
        }
        
        .logo-text-hover:hover {
          transform: scale(1.05) translateY(-2px);
        }
        
        /* Input Focus Effect */
        .input-focus:focus {
          border-color: #007AFF !important;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1) !important;
        }
        
        /* Eye Button Hover */
        .eye-button-hover {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .eye-button-hover:hover {
          transform: scale(1.1);
          color: #007AFF;
        }
        
        /* Forgot Link Hover */
        .forgot-link-hover {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-block;
        }
        
        .forgot-link-hover:hover {
          transform: translateX(4px);
          color: #ee3902e7 !important;
          text-decoration: underline !important;
        }
        
        /* SIGN IN BUTTON - Sidebar Style Animation */
        .signin-button {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          position: relative;
          overflow: hidden;
        }
        
        .signin-button:hover:not(:disabled) {
          background-color: #34C759 !important;
          transform: translateX(4px) translateY(-2px) !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05) !important;
          border-left: 3px solid #1C1C1E !important;
          padding-left: 11px !important;
        }
        
        .signin-button:active:not(:disabled) {
          transform: scale(0.98) !important;
        }
        
        /* SIGN UP BUTTON - Sidebar Style Animation */
        .signup-button {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
          display: inline-block !important;
          position: relative !important;
        }
        
        .signup-button:hover {
          transform: translateX(4px) translateY(-2px) !important;
          color: #34C759 !important;
          border-left: 3px solid #34C759 !important;
          padding-left: 8px !important;
        }
        
        .signup-button:active {
          transform: scale(0.98) !important;
        }

        /* Google button hover */
        .google-btn-hover {
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .google-btn-hover:hover {
           background-color: #F9F9F9 !important;
           transform: translateY(-2px);
           box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .google-btn-hover:active {
           transform: scale(0.98);
        }
        
        /* Spinner Animation */
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F7",
    position: "relative",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "radial-gradient(circle at 20% 50%, rgba(0,122,255,0.08) 0%, rgba(242,242,247,0) 50%)",
    pointerEvents: "none",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: "28px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)",
    border: "1px solid rgba(224,224,230,0.5)",
    position: "relative",
    zIndex: 1,
  },

  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "32px",
  },

  circleMask: {
    width: "64px",
    height: "64px",
    backgroundColor: "#1C1C1E",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
  },

  circleText: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#FFFFFF",
    letterSpacing: "0.5px",
  },

  logoText: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#1C1C1E",
    letterSpacing: "-0.3px",
    margin: 0,
  },

  header: {
    textAlign: "center",
    marginBottom: "32px",
  },

  title: {
    fontSize: "28px",
    fontWeight: 600,
    color: "#1C1C1E",
    letterSpacing: "-0.5px",
    margin: 0,
    marginBottom: "8px",
  },

  subtitle: {
    fontSize: "15px",
    color: "#8E8E93",
    margin: 0,
  },

  errorContainer: {
    backgroundColor: "#FFE5E5",
    border: "1px solid #FF3B30",
    borderRadius: "12px",
    padding: "12px 16px",
    marginBottom: "24px",
  },

  errorText: {
    color: "#FF3B30",
    fontSize: "13px",
    fontWeight: 500,
    margin: 0,
  },

  inputGroup: {
    marginBottom: "20px",
  },

  label: {
    display: "block",
    fontSize: "13px",
    fontWeight: 500,
    color: "#1C1C1E",
    marginBottom: "8px",
    letterSpacing: "-0.2px",
  },

  inputWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  inputIcon: {
    position: "absolute",
    left: "16px",
    color: "#8E8E93",
    pointerEvents: "none",
  },

  input: {
    width: "100%",
    padding: "14px 16px 14px 44px",
    fontSize: "16px",
    border: "1.5px solid #E5E5EA",
    borderRadius: "12px",
    backgroundColor: "#FFFFFF",
    color: "#1C1C1E",
    transition: "all 0.2s ease",
    outline: "none",
    fontFamily: "inherit",
  },

  eyeButton: {
    position: "absolute",
    right: "16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#8E8E93",
    padding: 0,
    display: "flex",
    alignItems: "center",
  },

  forgotContainer: {
    textAlign: "right",
    marginBottom: "28px",
  },

  forgotLink: {
    fontSize: "13px",
    color: "#007AFF",
    textDecoration: "none",
    fontWeight: 500,
  },

  signinButton: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#FFFFFF",
    backgroundColor: "#8E8E93",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "20px",
    fontFamily: "inherit",
  },

  signinButtonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },

  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#FFFFFF",
    borderRadius: "50%",
    margin: "0 auto",
    animation: "spin 0.8s linear infinite",
  },
  dividerContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#E5E5EA",
  },
  dividerText: {
    margin: "0 14px",
    fontSize: "13px",
    color: "#8E8E93",
    fontWeight: 500,
  },
  googleBtn: {
    width: "100%",
    padding: "14px",
    fontSize: "15px",
    fontWeight: 600,
    color: "#1C1C1E",
    backgroundColor: "#FFFFFF",
    border: "1.5px solid #E5E5EA",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "24px",
    fontFamily: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  },
  signupContainer: {
    textAlign: "center",
    marginBottom: "0",
  },
  signupText: {
    fontSize: "14px",
    color: "#8E8E93",
    marginRight: "6px",
  },

  signupButton: {
    background: "none",
    border: "none",
    fontSize: "14px",
    color: "#007AFF",
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
    fontFamily: "inherit",
  },

  footer: {
    position: "absolute",
    bottom: "24px",
    left: 0,
    right: 0,
    textAlign: "center",
    zIndex: 1,
  },

  copyright: {
    fontSize: "12px",
    color: "#8E8E93",
    margin: 0,
  },
};