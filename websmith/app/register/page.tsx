"use client";

import { useState } from "react";
import { register, verifyOtp, resendOtp as resendOtpService } from "../../core/services/authService";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  // Step 1: Form, Step 2: OTP
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await register(name, email, password);
      // OTP_DISABLED: setMessage(res.message || "OTP sent to your email.");
      // OTP_DISABLED: setStep(2);

      // Save token and redirect directly
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyOtp(email, otp);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await resendOtpService(email);
      setMessage(res.message || "New OTP sent.");
      setOtp("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error resending OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (step === 1) handleRegister();
      else handleVerifyOtp();
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>

      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.circleMask} className="circle-mask-hover">
            <span style={styles.circleText}>WSD</span>
          </div>
          <h1 style={styles.logoText} className="logo-text-hover">Web Smith Digital</h1>
        </div>

        <div style={styles.header}>
          <h2 style={styles.title}>{step === 1 ? "Create account" : "Verify Email"}</h2>
          <p style={styles.subtitle}>
            {step === 1 
              ? "Join Websmith to start building" 
              : `A code has been sent to ${email}`}
          </p>
        </div>

        {error && (
          <div style={styles.errorContainer}>
            <span style={styles.errorText}>{error}</span>
          </div>
        )}

        {message && !error && (
          <div style={styles.messageContainer}>
            <span style={styles.messageText}>{message}</span>
          </div>
        )}

        {step === 1 ? (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                  disabled={isLoading}
                  className="input-focus"
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email address</label>
              <div style={styles.inputWrapper}>
                <Mail size={18} style={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="hello@websmith.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  disabled={isLoading}
                  className="input-focus"
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="6+ characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  disabled={isLoading}
                  className="input-focus"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                  type="button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} style={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={styles.input}
                  disabled={isLoading}
                  className="input-focus"
                />
              </div>
            </div>

            <button
              onClick={handleRegister}
              disabled={isLoading}
              style={{ ...styles.signinButton, ...(isLoading ? styles.signinButtonDisabled : {})}}
              className="signin-button"
            >
              {isLoading ? <div style={styles.spinner}></div> : "Create Account"}
            </button>
          </>
        ) : (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Enter 6-digit Code</label>
              <div style={styles.inputWrapper}>
                <ShieldCheck size={18} style={styles.inputIcon} />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  onKeyPress={handleKeyPress}
                  style={{ ...styles.input, letterSpacing: "8px", fontWeight: "bold", textAlign: "center", paddingLeft: "16px" }}
                  disabled={isLoading}
                  className="input-focus"
                  autoFocus
                />
              </div>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading || otp.length < 6}
              style={{ ...styles.signinButton, ...(isLoading || otp.length < 6 ? styles.signinButtonDisabled : {})}}
              className="signin-button"
            >
              {isLoading ? <div style={styles.spinner}></div> : (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  Verify & Activate <ArrowRight size={18} />
                </span>
              )}
            </button>

            <div style={styles.resendContainer}>
              <button 
                onClick={handleResendOtp}
                disabled={isLoading}
                style={styles.resendButton}
                className="resend-btn-hover"
              >
                <RefreshCw size={14} style={{ marginRight: "6px" }} /> Resend code
              </button>
              <button 
                onClick={() => { setStep(1); setOtp(""); setError(""); setMessage(""); }}
                style={styles.backLink}
              >
                Back to form
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <div style={styles.signupContainer}>
            <span style={styles.signupText}>Already have an account?</span>
            <button onClick={() => router.push("/login")} style={styles.signupButton} className="signup-button">Sign In</button>
          </div>
        )}
      </div>

      <div style={styles.footer}><p style={styles.copyright}>© {new Date().getFullYear()} Websmith. All rights reserved.</p></div>

      <style>{`
        .circle-mask-hover:hover { transform: scale(1.1) translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        .input-focus:focus { border-color: #34C759 !important; box-shadow: 0 0 0 4px rgba(52, 199, 89, 0.1) !important; }
        .signin-button { transition: all 0.25s ease !important; }
        .signin-button:hover:not(:disabled) { background-color: #34C759 !important; transform: translateY(-2px) !important; }
        .resend-btn-hover:hover { color: #34C759; text-decoration: underline; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const styles: any = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F2F2F7", position: "relative", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' },
  background: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 80% 20%, rgba(52,199,89,0.06) 0%, rgba(242,242,247,0) 50%)", pointerEvents: "none" },
  card: { backgroundColor: "#FFFFFF", borderRadius: "28px", padding: "48px 40px", width: "100%", maxWidth: "440px", boxShadow: "0 20px 40px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03)", border: "1px solid rgba(224,224,230,0.5)", position: "relative", zIndex: 1 },
  logoContainer: { display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "32px" },
  circleMask: { width: "64px", height: "64px", backgroundColor: "#1C1C1E", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", transition: "all 0.4s ease" },
  circleText: { fontSize: "20px", fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.5px" },
  logoText: { fontSize: "18px", fontWeight: 600, color: "#1C1C1E", letterSpacing: "-0.3px", margin: 0 },
  header: { textAlign: "center", marginBottom: "32px" },
  title: { fontSize: "28px", fontWeight: 600, color: "#1C1C1E", margin: "0 0 8px 0" },
  subtitle: { fontSize: "15px", color: "#8E8E93", margin: 0 },
  errorContainer: { backgroundColor: "#FFE5E5", border: "1px solid #FF3B30", borderRadius: "12px", padding: "12px 16px", marginBottom: "24px" },
  errorText: { color: "#FF3B30", fontSize: "13px", fontWeight: 500 },
  messageContainer: { backgroundColor: "#EBFDF0", border: "1px solid #34C759", borderRadius: "12px", padding: "12px 16px", marginBottom: "24px" },
  messageText: { color: "#34C759", fontSize: "13px", fontWeight: 500 },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: 500, color: "#1C1C1E", marginBottom: "8px" },
  inputWrapper: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: { position: "absolute", left: "16px", color: "#8E8E93" },
  input: { width: "100%", padding: "14px 16px 14px 44px", fontSize: "16px", border: "1.5px solid #E5E5EA", borderRadius: "12px", outline: "none", transition: "all 0.2s ease" },
  eyeButton: { position: "absolute", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#8E8E93" },
  signinButton: { width: "100%", padding: "14px", fontSize: "16px", fontWeight: 600, color: "#FFFFFF", backgroundColor: "#1C1C1E", border: "none", borderRadius: "12px", cursor: "pointer", marginTop: "12px" },
  signinButtonDisabled: { opacity: 0.6, cursor: "not-allowed" },
  resendContainer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" },
  resendButton: { background: "none", border: "none", fontSize: "13px", color: "#8E8E93", cursor: "pointer", fontWeight: 500 },
  backLink: { background: "none", border: "none", fontSize: "13px", color: "#007AFF", cursor: "pointer", fontWeight: 500 },
  spinner: { width: "20px", height: "20px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#FFFFFF", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" },
  signupContainer: { textAlign: "center", marginTop: "24px" },
  signupText: { fontSize: "14px", color: "#8E8E93", marginRight: "6px" },
  signupButton: { background: "none", border: "none", fontSize: "14px", color: "#007AFF", fontWeight: 600, cursor: "pointer" },
  footer: { position: "absolute", bottom: "24px", left: 0, right: 0, textAlign: "center" },
  copyright: { fontSize: "12px", color: "#8E8E93" },
};
