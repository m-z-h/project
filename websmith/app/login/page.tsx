"use client";

import { useState } from "react";
import { login, verifyOtp, resendOtp as resendOtpService } from "../../core/services/authService";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  // Step 1: Email/Password, Step 2: OTP
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await login(email, password);
      // OTP_DISABLED: setMessage(res.message || "OTP sent to your email.");
      // OTP_DISABLED: setStep(2);

      // Save token and redirect directly
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password. Please try again.");
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
      if (step === 1) handleLogin();
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
          <h2 style={styles.title}>{step === 1 ? "Welcome back" : "Security Check"}</h2>
          <p style={styles.subtitle}>
            {step === 1 
              ? "Sign in to continue to your workspace" 
              : `We've sent a 6-digit code to ${email}`}
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
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={styles.forgotContainer}>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              style={{ ...styles.signinButton, ...(isLoading ? styles.signinButtonDisabled : {})}}
              className="signin-button"
            >
              {isLoading ? <div style={styles.spinner}></div> : "Sign In"}
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
                  Verify & Proceed <ArrowRight size={18} />
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
                Use different account
              </button>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div style={styles.dividerContainer}>
              <div style={styles.dividerLine}></div>
              <span style={styles.dividerText}>or continue with</span>
              <div style={styles.dividerLine}></div>
            </div>

            <button style={styles.googleBtn} className="google-btn-hover">
              <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
              Google
            </button>

            <div style={styles.signupContainer}>
              <span style={styles.signupText}>Don&apos;t have an account?</span>
              <button onClick={() => router.push("/register")} style={styles.signupButton} className="signup-button">Create one</button>
            </div>
          </>
        )}
      </div>

      <div style={styles.footer}><p style={styles.copyright}>© {new Date().getFullYear()} Websmith. All rights reserved.</p></div>

      <style>{`
        .circle-mask-hover:hover { transform: scale(1.1) translateY(-3px); box-shadow: 0 8px 20px rgba(0,0,0,0.12); }
        .input-focus:focus { border-color: #007AFF !important; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1) !important; }
        .signin-button { transition: all 0.25s ease !important; }
        .signin-button:hover:not(:disabled) { background-color: #34C759 !important; transform: translateY(-2px) !important; }
        .resend-btn-hover:hover { color: #007AFF; text-decoration: underline; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

const styles: any = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#F2F2F7", position: "relative", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' },
  background: { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 20% 50%, rgba(0,122,255,0.08) 0%, rgba(242,242,247,0) 50%)", pointerEvents: "none" },
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
  messageContainer: { backgroundColor: "#EBF5FF", border: "1px solid #007AFF", borderRadius: "12px", padding: "12px 16px", marginBottom: "24px" },
  messageText: { color: "#007AFF", fontSize: "13px", fontWeight: 500 },
  inputGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: 500, color: "#1C1C1E", marginBottom: "8px" },
  inputWrapper: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: { position: "absolute", left: "16px", color: "#8E8E93" },
  input: { width: "100%", padding: "14px 16px 14px 44px", fontSize: "16px", border: "1.5px solid #E5E5EA", borderRadius: "12px", outline: "none", transition: "all 0.2s ease" },
  eyeButton: { position: "absolute", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#8E8E93" },
  forgotContainer: { textAlign: "right", marginBottom: "28px" },
  forgotLink: { fontSize: "13px", color: "#007AFF", textDecoration: "none", fontWeight: 500 },
  signinButton: { width: "100%", padding: "14px", fontSize: "16px", fontWeight: 600, color: "#FFFFFF", backgroundColor: "#1C1C1E", border: "none", borderRadius: "12px", cursor: "pointer", marginBottom: "20px" },
  signinButtonDisabled: { opacity: 0.6, cursor: "not-allowed" },
  resendContainer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px" },
  resendButton: { background: "none", border: "none", fontSize: "13px", color: "#8E8E93", cursor: "pointer", fontWeight: 500 },
  backLink: { background: "none", border: "none", fontSize: "13px", color: "#007AFF", cursor: "pointer", fontWeight: 500 },
  spinner: { width: "20px", height: "20px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#FFFFFF", borderRadius: "50%", margin: "0 auto", animation: "spin 0.8s linear infinite" },
  dividerContainer: { display: "flex", alignItems: "center", marginBottom: "20px" },
  dividerLine: { flex: 1, height: "1px", backgroundColor: "#E5E5EA" },
  dividerText: { margin: "0 14px", fontSize: "13px", color: "#8E8E93" },
  googleBtn: { width: "100%", padding: "14px", fontSize: "15px", fontWeight: 600, color: "#1C1C1E", backgroundColor: "#FFFFFF", border: "1.5px solid #E5E5EA", borderRadius: "12px", cursor: "pointer", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" },
  signupContainer: { textAlign: "center" },
  signupText: { fontSize: "14px", color: "#8E8E93", marginRight: "6px" },
  signupButton: { background: "none", border: "none", fontSize: "14px", color: "#007AFF", fontWeight: 600, cursor: "pointer" },
  footer: { position: "absolute", bottom: "24px", left: 0, right: 0, textAlign: "center" },
  copyright: { fontSize: "12px", color: "#8E8E93" },
};