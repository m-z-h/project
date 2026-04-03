"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Layout, Zap, Shield, Globe } from "lucide-react";
import Navbar from "../components/ui/Navbar";

export default function LandingPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("token");
            if (token) {
                setIsLoggedIn(true);
            }
        }
    }, []);

    const dummyProjects = [
        { title: "Nexus API Architecture", type: "Backend", bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
        { title: "Cloud Sync Service", type: "Infrastructure", bg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)" },
        { title: "Fintech Admin Dashboard", type: "Web App", bg: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)" },
        { title: "AI Support Agent", type: "Integration", bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
    ];

    const features = [
        { icon: <Layout size={24} />, title: "Modern Design", desc: "Crafted with premium visual hierarchy and modern glassmorphic aesthetics that impress from the first pixel." },
        { icon: <Zap size={24} />, title: "Lightning Fast", desc: "Optimized infrastructure ensuring blazing fast load times and seamless interactions for your entire userbase." },
        { icon: <Shield size={24} />, title: "Bank-Grade Security", desc: "Enterprise protection protocols keeping your workspaces and digital assets flawlessly secure around the clock." },
        { icon: <Globe size={24} />, title: "Global Scale", desc: "Deployed on edge networks so your operations remain resilient no matter where your team operates." },
    ];

    return (
        <div style={styles.container}>
            {/* Dynamic Backgrounds */}
            <div style={styles.backgroundBlobBlue} className="pulse-slow"></div>
            <div style={styles.backgroundBlobGreen} className="pulse-slow-reverse"></div>
            <div style={styles.noiseOverlay}></div>

            {/* Navigation Bar */}
            <Navbar />

            <main style={styles.main}>
                {/* Hero Section */}
                <section style={styles.heroSection}>
                    <div style={styles.badge} className="float-animation">
                        <span style={styles.badgeDot}></span>
                        <span>Welcome to Web Smith Digital 2.0</span>
                    </div>

                    <h1 style={styles.title} className="fade-in-up">
                        Build the Future of <br />
                        <span style={styles.titleHighlight}>Digital Workspaces</span>
                    </h1>

                    <p style={styles.subtitle} className="fade-in-up-delay-1">
                        Empowering modern teams to craft, scale, and secure premium digital environments with unparalleled ease and sophistication.
                    </p>

                    <div style={styles.buttonGroup} className="fade-in-up-delay-2">
                        <button
                            style={styles.primaryBtn}
                            onClick={() => router.push("/login")}
                            className="primary-btn-hover"
                        >
                            Get Started Free <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                        </button>
                        <button
                            style={styles.secondaryBtn}
                            className="secondary-btn-hover"
                        >
                            Learn More
                        </button>
                    </div>

                    {/* Hero Visual abstraction */}
                    <div style={styles.heroVisualContainer} className="fade-in-up-delay-3 float-animation-slow">
                        <div style={styles.glassCard}>
                            <div style={styles.fakeToolbar}>
                                <div style={{ ...styles.dot, backgroundColor: "#FF5F56" }}></div>
                                <div style={{ ...styles.dot, backgroundColor: "#FFBD2E" }}></div>
                                <div style={{ ...styles.dot, backgroundColor: "#27C93F" }}></div>
                            </div>
                            <div style={styles.fakeContent}>
                                <div style={styles.fakeLine1}></div>
                                <div style={styles.fakeLine2}></div>
                                <div style={styles.fakeLine3}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                {isLoggedIn && (
                    <section style={styles.projectsSection} id="projects">
                        <div style={styles.sectionHeader}>
                            <h2 style={styles.sectionTitle}>Recent Project Deliveries</h2>
                            <p style={styles.sectionSubtitle}>A showcase of digital products recently deployed.</p>
                        </div>
                        
                        <div style={styles.projectGrid}>
                            {dummyProjects.map((proj, index) => (
                                <div key={index} style={styles.projectCard} className="project-card-hover">
                                    <div style={{ ...styles.projectThumb, background: proj.bg }}>
                                        <span style={styles.projectThumbText}>{proj.type}</span>
                                    </div>
                                    <div style={styles.projectInfo}>
                                        <h3 style={styles.projectTitle}>{proj.title}</h3>
                                        <p style={styles.projectDesc}>
                                            Complete implementation of {proj.title.toLowerCase()} including resilient CI/CD architecture.
                                        </p>
                                        <a href="#" style={styles.projectLink}>View Case Study →</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Features Section */}
                <section style={styles.featuresSection} id="about">
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Everything you need to succeed</h2>
                        <p style={styles.sectionSubtitle}>Powerful features combined into a unified elegant experience.</p>
                    </div>

                    <div style={styles.featureGrid}>
                        {features.map((item, index) => (
                            <div key={index} style={styles.featureCard} className="feature-hover">
                                <div style={styles.featureIconContainer}>
                                    {item.icon}
                                </div>
                                <h3 style={styles.featureTitle}>{item.title}</h3>
                                <p style={styles.featureDesc}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div style={styles.footerLogo}>
                        <span style={styles.logoText}>Web Smith Digital</span>
                    </div>
                    <p style={styles.copyright}>© {new Date().getFullYear()} Websmith. All rights reserved.</p>
                </div>
            </footer>

            {/* Embedded Animations and Dynamic Styles */}
            <style>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #F2F2F7;
        }
        ::-webkit-scrollbar-thumb {
          background: #C7C7CC;
          border-radius: 4px;
        }

        /* Hover Classes */
        .logo-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }
        .logo-hover:hover { transform: translateY(-2px); }
        .logo-hover:hover .circle-mask { transform: scale(1.05); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }

        .nav-link-hover {
          transition: all 0.2s ease;
        }
        .nav-link-hover:hover {
          color: #1C1C1E !important;
          background: rgba(0,0,0,0.04);
        }

        .login-btn-hover {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .login-btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,122,255,0.2) !important;
          background: #0066CC !important;
        }

        .primary-btn-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .primary-btn-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0, 122, 255, 0.25) !important;
          background: #0066CC !important;
        }

        .secondary-btn-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .secondary-btn-hover:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06) !important;
          background: #FFFFFF !important;
        }

        .feature-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .feature-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
          border-color: rgba(0,122,255,0.2) !important;
        }
        .feature-hover:hover svg {
          color: #007AFF;
          transform: scale(1.1);
          transition: all 0.3s ease;
        }

        .project-card-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .project-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(0,0,0,0.06) !important;
        }

        /* Keyframes */
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-animation { animation: float 4s ease-in-out infinite; }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(-15px) rotate(-1deg); }
        }
        .float-animation-slow { animation: float-slow 7s ease-in-out infinite; }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        .pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        
        @keyframes pulse-slow-reverse {
          0%, 100% { opacity: 0.4; transform: scale(1.05); }
          50% { opacity: 0.6; transform: scale(1); }
        }
        .pulse-slow-reverse { animation: pulse-slow-reverse 10s ease-in-out infinite; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in-up-delay-1 { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; }
        .fade-in-up-delay-2 { opacity: 0; animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; }
        .fade-in-up-delay-3 { opacity: 0; animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards; }
      `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#FAFAFC",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#1C1C1E",
        position: "relative",
        overflow: "hidden",
    },
    backgroundBlobBlue: {
        position: "absolute",
        top: "-15%",
        right: "-5%",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,122,255,0.15) 0%, rgba(250,250,252,0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
    },
    backgroundBlobGreen: {
        position: "absolute",
        bottom: "10%",
        left: "-10%",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,199,89,0.12) 0%, rgba(250,250,252,0) 70%)",
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
    },
    noiseOverlay: {
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.015\"/%3E%3C/svg%3E')",
        pointerEvents: "none",
        zIndex: 1,
    },
    navbar: {
        position: "fixed",
        top: 0, left: 0, right: 0,
        padding: "20px 40px",
        display: "flex",
        justifyContent: "center",
        zIndex: 100,
        transition: "all 0.3s ease",
        background: "transparent",
    },
    navbarScrolled: {
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px) saturate(180%)",
        boxShadow: "0 1px 0 rgba(0,0,0,0.05)",
        padding: "16px 40px",
    },
    navContent: {
        maxWidth: "1200px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    logoContainer: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    circleMask: {
        width: "36px",
        height: "36px",
        backgroundColor: "#1C1C1E",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.3s ease",
    },
    circleText: {
        fontSize: "12px",
        fontWeight: 700,
        color: "#FFFFFF",
        letterSpacing: "0.5px",
    },
    logoText: {
        fontSize: "18px",
        fontWeight: 700,
        letterSpacing: "-0.5px",
        color: "#1C1C1E",
    },
    navLinks: {
        display: "flex",
        gap: "8px",
        alignItems: "center",
    },
    navLink: {
        background: "none",
        border: "none",
        fontSize: "14px",
        fontWeight: 500,
        color: "#8E8E93",
        cursor: "pointer",
        padding: "8px 16px",
        borderRadius: "20px",
    },
    activeNavLink: {
        color: "#1C1C1E",
        background: "rgba(0,0,0,0.04)",
    },
    navActions: {
        display: "flex",
        alignItems: "center",
    },
    loginBtn: {
        background: "#007AFF",
        color: "#FFFFFF",
        border: "none",
        padding: "10px 20px",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,122,255,0.15)",
    },
    main: {
        position: "relative",
        zIndex: 10,
        paddingTop: "120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    heroSection: {
        maxWidth: "1000px",
        width: "100%",
        padding: "60px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        minHeight: "75vh",
    },
    badge: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(0,122,255,0.08)",
        border: "1px solid rgba(0,122,255,0.15)",
        padding: "6px 16px",
        borderRadius: "100px",
        fontSize: "13px",
        fontWeight: 500,
        color: "#007AFF",
        marginBottom: "32px",
    },
    badgeDot: {
        width: "6px",
        height: "6px",
        backgroundColor: "#007AFF",
        borderRadius: "50%",
        boxShadow: "0 0 8px #007AFF",
    },
    title: {
        fontSize: "72px",
        fontWeight: 800,
        letterSpacing: "-2.5px",
        lineHeight: 1.1,
        margin: "0 0 24px 0",
        color: "#1C1C1E",
    },
    titleHighlight: {
        color: "#007AFF",
        background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    subtitle: {
        fontSize: "20px",
        lineHeight: 1.5,
        color: "#8E8E93",
        maxWidth: "680px",
        margin: "0 0 40px 0",
        fontWeight: 400,
    },
    buttonGroup: {
        display: "flex",
        gap: "16px",
        alignItems: "center",
    },
    primaryBtn: {
        display: "flex",
        alignItems: "center",
        background: "#007AFF",
        color: "#FFFFFF",
        border: "none",
        padding: "16px 32px",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0,122,255,0.2)",
    },
    secondaryBtn: {
        background: "#FFFFFF",
        color: "#1C1C1E",
        border: "1px solid #E5E5EA",
        padding: "16px 32px",
        borderRadius: "12px",
        fontSize: "16px",
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
    },
    heroVisualContainer: {
        marginTop: "80px",
        width: "100%",
        maxWidth: "800px",
    },
    glassCard: {
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 24px 48px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
        borderRadius: "20px",
        height: "360px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    fakeToolbar: {
        height: "48px",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: "8px",
        background: "rgba(255,255,255,0.4)"
    },
    dot: {
        width: "12px",
        height: "12px",
        borderRadius: "50%",
    },
    fakeContent: {
        padding: "40px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    fakeLine1: {
        height: "24px",
        width: "40%",
        background: "#E5E5EA",
        borderRadius: "6px",
    },
    fakeLine2: {
        height: "24px",
        width: "70%",
        background: "#F2F2F7",
        borderRadius: "6px",
    },
    fakeLine3: {
        height: "24px",
        width: "60%",
        background: "#F2F2F7",
        borderRadius: "6px",
    },
    projectsSection: {
        width: "100%",
        maxWidth: "1200px",
        padding: "80px 40px",
    },
    projectGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "24px",
    },
    projectCard: {
        background: "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.04)",
        display: "flex",
        flexDirection: "column",
    },
    projectThumb: {
        height: "160px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    projectThumbText: {
        background: "rgba(255,255,255,0.4)",
        backdropFilter: "blur(10px)",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 600,
        color: "#1C1C1E",
        letterSpacing: "0.5px",
        textTransform: "uppercase",
    },
    projectInfo: {
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    projectTitle: {
        fontSize: "18px",
        fontWeight: 600,
        color: "#1C1C1E",
        margin: "0 0 8px 0",
        letterSpacing: "-0.5px",
    },
    projectDesc: {
        fontSize: "14px",
        color: "#8E8E93",
        lineHeight: 1.5,
        margin: "0 0 20px 0",
        flex: 1,
    },
    projectLink: {
        fontSize: "14px",
        fontWeight: 600,
        color: "#007AFF",
        textDecoration: "none",
    },
    featuresSection: {
        width: "100%",
        maxWidth: "1200px",
        padding: "80px 40px 40px 40px",
    },
    sectionHeader: {
        textAlign: "center",
        marginBottom: "64px",
    },
    sectionTitle: {
        fontSize: "36px",
        fontWeight: 700,
        letterSpacing: "-1px",
        color: "#1C1C1E",
        margin: "0 0 16px 0",
    },
    sectionSubtitle: {
        fontSize: "18px",
        color: "#8E8E93",
        margin: 0,
    },
    featureGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "32px",
    },
    featureCard: {
        background: "#FFFFFF",
        padding: "40px",
        borderRadius: "24px",
        boxShadow: "0 12px 24px rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.04)",
    },
    featureIconContainer: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "rgba(0,122,255,0.08)",
        color: "#007AFF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "24px",
    },
    featureTitle: {
        fontSize: "20px",
        fontWeight: 600,
        color: "#1C1C1E",
        margin: "0 0 12px 0",
        letterSpacing: "-0.5px",
    },
    featureDesc: {
        fontSize: "15px",
        color: "#8E8E93",
        lineHeight: 1.6,
        margin: 0,
    },
    footer: {
        background: "#FFFFFF",
        borderTop: "1px solid #E5E5EA",
        padding: "40px",
        width: "100%",
        position: "relative",
        zIndex: 10,
    },
    footerContent: {
        maxWidth: "1200px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footerLogo: {
        display: "flex",
        alignItems: "center",
    },
    copyright: {
        fontSize: "14px",
        color: "#8E8E93",
        margin: 0,
    },
};
