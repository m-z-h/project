"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Target, Eye, Shield, Cpu, Zap, Globe, MessageSquare, CheckCircle } from "lucide-react";
import Navbar from "../../components/ui/Navbar";
import Image from "next/image";

export default function AboutPage() {
    const router = useRouter();

    const sections = [
        {
            icon: <Target size={32} />,
            title: "Our Mission",
            desc: "To empower modern enterprises with technology that is invisible yet indestructible. We don't just build apps; we engineer the digital backbone of your business's future.",
            color: "#007AFF"
        },
        {
            icon: <Eye size={32} />,
            title: "Our Vision",
            desc: "To become the global standard for infrastructure engineering and high-performance digital architecture, starting from the heart of Kolkata to the edge of every continent.",
            color: "#34C759"
        }
    ];

    const clientServiceFocus = [
        {
            icon: <Cpu size={24} />,
            title: "Strategic Architecture",
            desc: "We design multi-tier system architectures that scale horizontally. Whether it's microservices or massive monolithic systems, we ensure long-term stability and ease of integration."
        },
        {
            icon: <Shield size={24} />,
            title: "Infrastructure Resilience",
            desc: "Security is non-negotiable. We implement bank-grade encryption and multi-layered defense protocols for every project, from fintech to healthcare."
        },
        {
            icon: <Globe size={24} />,
            title: "Global Scaling",
            desc: "We architect solutions that handle millions of simultaneous users across diverse regions, utilizing advanced CDN configurations and local edge node optimization."
        }
    ];

    const values = ["Engineering-First Mindset", "Radical Transparency", "Client-Success Priority", "Constant Innovation"];

    return (
        <div style={styles.container}>
            {/* Dynamic Backgrounds */}
            <div style={styles.backgroundBlobBlue} className="pulse-slow"></div>
            <div style={styles.backgroundBlobPurple} className="pulse-slow-reverse"></div>
            <div style={styles.noiseOverlay}></div>

            <Navbar />

            <main style={styles.main}>
                <div style={styles.backBtnContainer}>
                    <button onClick={() => router.push("/")} style={styles.backBtn} className="back-btn-hover">
                        <ArrowLeft size={18} style={{ marginRight: "8px" }} /> Back to Home
                    </button>
                </div>

                {/* Hero Section */}
                <section style={styles.heroSection}>
                    <h1 style={styles.title} className="fade-in-up">
                        We are the <br />
                        <span style={styles.titleHighlight}>Architects of Scale</span>
                    </h1>
                    <p style={styles.subtitle} className="fade-in-up-delay-1">
                        Web Smith Digital is a full-cycle engineering agency specializing in high-end software development, resilient infrastructure, and complex digital transformations for global enterprises.
                    </p>
                </section>

                {/* Mission & Vision */}
                <section style={styles.missionSection}>
                    {sections.map((sec, idx) => (
                        <div key={idx} style={styles.missionCard} className="glass-card-hover">
                            <div style={{ ...styles.iconContainer, background: `${sec.color}15`, color: sec.color }}>
                                {sec.icon}
                            </div>
                            <h2 style={styles.cardTitle}>{sec.title}</h2>
                            <p style={styles.cardDesc}>{sec.desc}</p>
                        </div>
                    ))}
                </section>

                {/* What We Do For Clients */}
                <section style={styles.clientFocusSection}>
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>What We Do for Our Clients</h2>
                        <p style={styles.sectionSubtitle}>Providing the technical leverage your business needs to outperform the competition.</p>
                    </div>

                    <div style={styles.focusGrid}>
                        {clientServiceFocus.map((focus, idx) => (
                            <div key={idx} style={styles.focusCard} className="focus-card-hover">
                                <div style={styles.focusIcon}>{focus.icon}</div>
                                <div style={styles.focusContent}>
                                    <h3 style={styles.focusTitle}>{focus.title}</h3>
                                    <p style={styles.focusDesc}>{focus.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Process / Values */}
                <section style={styles.valuesSection}>
                    <div style={styles.valuesContent}>
                        <div style={styles.valuesText}>
                            <h2 style={styles.sectionTitle}>Our Core Engineering Values</h2>
                            <p style={styles.aboutText}>
                                We don't believe in quick fixes or "bare-minimum" MVPs. Every line of code we write and every server we configure is built for long-term endurance. Our process is rooted in deep technical audits and strategic consulting.
                            </p>
                            <div style={styles.valueList}>
                                {values.map((v, i) => (
                                    <div key={i} style={styles.valueItem}>
                                        <CheckCircle size={20} color="#34C759" /> <span>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={styles.imageCol}>
                            <div style={styles.imageContainer} className="float-animation">
                                <Image 
                                    src="/about_visual_it_1775221626430.png" 
                                    alt="Technical Vision" 
                                    width={450} 
                                    height={350} 
                                    style={styles.imageEffect}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section style={styles.ctaSection}>
                    <div style={styles.ctaCard} className="cta-hover">
                        <h2 style={styles.ctaTitle}>Ready to Scale Your Digital Future?</h2>
                        <p style={styles.ctaSubtitle}>Our architects are ready to design your next-gen infrastructure.</p>
                        <button onClick={() => router.push("/#contactus")} style={styles.ctaBtn} className="primary-btn-hover">
                            Start a Project With Us <Zap size={18} style={{ marginLeft: "8px" }} />
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer Copy */}
            <footer style={styles.footer}>
                <p>© {new Date().getFullYear()} Web Smith Digital. Professional Engineering Services.</p>
            </footer>

            <style>{`
                .back-btn-hover:hover { transform: translateX(-5px); color: #007AFF; }
                .glass-card-hover { transition: all 0.4s ease; border: 1px solid rgba(255,255,255,0.4); }
                .glass-card-hover:hover { transform: translateY(-10px); background: rgba(255,255,255,0.8); box-shadow: 0 40px 80px rgba(0,0,0,0.06); }
                .focus-card-hover { transition: all 0.3s ease; border-bottom: 1px solid transparent; }
                .focus-card-hover:hover { border-bottom-color: #007AFF; transform: translateY(-3px); }
                .cta-hover { transition: all 0.5s ease; border: 1px solid rgba(255,255,255,0.1); }
                .cta-hover:hover { transform: scale(1.02); box-shadow: 0 30px 60px rgba(0,122,255,0.15); border-color: rgba(0,122,255,0.2); }
                
                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in-up { animation: fadeInUp 0.8s forwards; }
                .fade-in-up-delay-1 { opacity: 0; animation: fadeInUp 0.8s 0.2s forwards; }
                
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                .float-animation { animation: float 5s ease-in-out infinite; }
            `}</style>
        </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
    container: {
        minHeight: "100vh",
        backgroundColor: "#FAFAFC",
        color: "#1C1C1E",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: "relative",
        overflowX: "hidden",
    },
    backgroundBlobBlue: {
        position: "absolute", top: "-10%", left: "-5%", width: "800px", height: "800px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,122,255,0.1) 0%, rgba(250,250,252,0) 70%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
    },
    backgroundBlobPurple: {
        position: "absolute", bottom: "-5%", right: "-5%", width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(175,82,222,0.08) 0%, rgba(250,250,252,0) 70%)", filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
    },
    noiseOverlay: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.012\"/%3E%3C/svg%3E')",
        pointerEvents: "none", zIndex: 1,
    },
    main: { position: "relative", zIndex: 10, paddingTop: "120px", display: "flex", flexDirection: "column", alignItems: "center" },
    backBtnContainer: { width: "100%", maxWidth: "1200px", padding: "0 40px", marginBottom: "40px" },
    backBtn: { background: "transparent", border: "none", fontSize: "14px", fontWeight: 600, color: "#8E8E93", cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.3s ease" },
    
    heroSection: { maxWidth: "900px", textAlign: "center", padding: "40px 40px 100px 40px" },
    title: { fontSize: "74px", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.05, margin: "0 0 32px 0" },
    titleHighlight: { color: "#007AFF", background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subtitle: { fontSize: "22px", lineHeight: 1.6, color: "#8E8E93", maxWidth: "700px", margin: "0 auto" },

    missionSection: { maxWidth: "1200px", width: "100%", padding: "0 40px", display: "flex", gap: "32px", flexWrap: "wrap", justifyContent: "center" },
    missionCard: { flex: 1, minWidth: "350px", background: "rgba(255,255,255,0.4)", backdropFilter: "blur(20px)", borderRadius: "32px", padding: "60px", boxShadow: "0 10px 40px rgba(0,0,0,0.02)" },
    iconContainer: { width: "64px", height: "64px", borderRadius: "18px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" },
    cardTitle: { fontSize: "32px", fontWeight: 700, margin: "0 0 20px 0", letterSpacing: "-1px" },
    cardDesc: { fontSize: "18px", lineHeight: 1.7, color: "#48484A" },

    clientFocusSection: { width: "100%", maxWidth: "1200px", padding: "140px 40px" },
    sectionHeader: { textAlign: "center", marginBottom: "80px" },
    sectionTitle: { fontSize: "48px", fontWeight: 700, letterSpacing: "-2px", color: "#1C1C1E", margin: "0 0 16px 0" },
    sectionSubtitle: { fontSize: "20px", color: "#86868B" },
    focusGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px" },
    focusCard: { display: "flex", gap: "24px" },
    focusIcon: { width: "48px", height: "48px", color: "#007AFF", transition: "all 0.3s ease", display: "flex", alignItems: "flex-start", paddingTop: "4px" },
    focusContent: { flex: 1 },
    focusTitle: { fontSize: "24px", fontWeight: 700, marginBottom: "12px", color: "#1C1C1E" },
    focusDesc: { fontSize: "16px", color: "#8E8E93", lineHeight: 1.7 },

    valuesSection: { width: "100%", background: "#F2F2F7", padding: "120px 40px", display: "flex", justifyContent: "center" },
    valuesContent: { maxWidth: "1200px", width: "100%", display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" },
    valuesText: { flex: 1, minWidth: "300px" },
    aboutText: { fontSize: "19px", color: "#48484A", lineHeight: 1.7, marginBottom: "32px" },
    valueList: { display: "flex", flexDirection: "column", gap: "16px" },
    valueItem: { display: "flex", alignItems: "center", gap: "12px", fontSize: "16px", fontWeight: 600, color: "#1C1C1E" },
    imageCol: { flex: 1, display: "flex", justifyContent: "center" },
    imageContainer: { borderRadius: "32px", overflow: "hidden", border: "1px solid #FFFFFF", boxShadow: "0 40px 80px rgba(0,0,0,0.1)" },
    imageEffect: { objectFit: "cover" },

    ctaSection: { width: "100%", maxWidth: "1200px", padding: "140px 40px 180px 40px", textAlign: "center" },
    ctaCard: { background: "#1C1C1E", borderRadius: "40px", padding: "100px 60px", color: "white" },
    ctaTitle: { fontSize: "44px", fontWeight: 800, margin: "0 0 20px 0", letterSpacing: "-2px" },
    ctaSubtitle: { fontSize: "20px", color: "#8E8E93", marginBottom: "48px" },
    ctaBtn: { background: "#007AFF", border: "none", color: "white", padding: "20px 48px", borderRadius: "18px", fontSize: "18px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center" },

    footer: { padding: "60px 40px", textAlign: "center", borderTop: "1px solid #E5E5EA", width: "100%", color: "#8E8E93", fontSize: "14px" },
};
