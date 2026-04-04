"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, BookOpen, Clock, Calendar, ChevronRight, Tag, Layout, Zap, Shield, Globe } from "lucide-react";
import Navbar from "../../components/ui/Navbar";
import Image from "next/image";

export default function BlogPage() {
    const router = useRouter();

    const blogPosts = [
        {
            title: "Architecting for 99.99% Availability",
            summary: "A deep dive into AWS multi-region deployment strategies and failover automation for global enterprise platforms.",
            category: "Infrastructure",
            date: "Nov 12, 2023",
            readTime: "8 min read",
            icon: <Globe size={20} />,
            color: "#007AFF"
        },
        {
            title: "The Future of AI-Driven Infrastructure",
            summary: "How LLMs and automated monitoring agents are revolutionizing system reliability and incident response scaling.",
            category: "AI & ML",
            date: "Oct 28, 2023",
            readTime: "6 min read",
            icon: <Zap size={20} />,
            color: "#34C759"
        },
        {
            title: "Modernizing Legacy Systems for Cloud",
            summary: "Our strategic roadmap for migrating monolithic enterprise architectures to scalable microservices without downtime.",
            category: "DevOps",
            date: "Oct 15, 2023",
            readTime: "10 min read",
            icon: <Layout size={20} />,
            color: "#AF52DE"
        },
        {
            title: "Secure-by-Design: Our Core Philosophy",
            summary: "Exploring zero-trust architecture and bank-grade security protocols we implement for modern digital products.",
            category: "Security",
            date: "Sep 30, 2023",
            readTime: "7 min read",
            icon: <Shield size={20} />,
            color: "#FF3B30"
        }
    ];

    return (
        <div style={styles.container}>
            {/* Dynamic Backgrounds */}
            <div style={styles.backgroundBlobBlue} className="pulse-slow"></div>
            <div style={styles.backgroundBlobGreen} className="pulse-slow-reverse"></div>
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
                    <div style={styles.badge} className="float-animation">
                        <span style={styles.badgeDot}></span>
                        <span>Websmith Engineering Blog</span>
                    </div>
                    <h1 style={styles.title} className="fade-in-up">
                        Technical Insights <br />
                        <span style={styles.titleHighlight}>from the Edge</span>
                    </h1>
                    <p style={styles.subtitle} className="fade-in-up-delay-1">
                        Deep dives into the infrastructure, architecture, and innovative engineering practices we use to build the world's most resilient digital systems.
                    </p>
                </section>

                {/* Blog Grid */}
                <section style={styles.blogGrid}>
                    {blogPosts.map((post, idx) => (
                        <div key={idx} style={styles.blogCard} className="blog-card-hover">
                            <div style={styles.cardHeader}>
                                <div style={{ ...styles.categoryBadge, color: post.color, backgroundColor: `${post.color}10` }}>
                                    {post.icon} <span style={{ marginLeft: "6px" }}>{post.category}</span>
                                </div>
                                <div style={styles.metaInfo}>
                                    <Clock size={14} style={{ marginRight: "4px" }} /> {post.readTime}
                                </div>
                            </div>
                            <h2 style={styles.blogTitle}>{post.title}</h2>
                            <p style={styles.blogSummary}>{post.summary}</p>
                            <div style={styles.cardFooter}>
                                <div style={styles.dateInfo}>
                                    <Calendar size={14} style={{ marginRight: "6px" }} /> {post.date}
                                </div>
                                <button style={styles.readMoreBtn} className="read-more-hover">
                                    Read Article <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Newsletter / CTA */}
                <section style={styles.newsletterSection}>
                    <div style={styles.newsletterCard}>
                        <h2 style={styles.sectionTitle}>Stay Updated with Tech</h2>
                        <p style={styles.sectionSubtitle}>Get our weekly technical briefing on infrastructure and high-end engineering.</p>
                        <div style={styles.inputGroup}>
                            <input type="email" placeholder="Enter your business email" style={styles.input} />
                            <button style={styles.subscribeBtn} className="primary-btn-hover">Subscribe</button>
                        </div>
                    </div>
                </section>
            </main>

            <footer style={styles.footer}>
                <p>© {new Date().getFullYear()} Web Smith Digital Engineering. Professional Technical Insights.</p>
            </footer>

            <style>{`
                .back-btn-hover:hover { transform: translateX(-5px); color: #007AFF; }
                .blog-card-hover { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1); cursor: pointer; }
                .blog-card-hover:hover { transform: translateY(-10px); background: #FFFFFF; box-shadow: 0 40px 80px rgba(0,0,0,0.08); border-color: rgba(0,122,255,0.1); }
                .blog-card-hover:hover h2 { color: #007AFF; }
                .read-more-hover { transition: all 0.3s ease; }
                .read-more-hover:hover { color: #007AFF; gap: 8px; }

                @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in-up { animation: fadeInUp 0.8s forwards; }
                .fade-in-up-delay-1 { opacity: 0; animation: fadeInUp 0.8s 0.2s forwards; }

                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
                .float-animation { animation: float 4s ease-in-out infinite; }
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
        position: "absolute", top: "-5%", right: "-5%", width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,122,255,0.08) 0%, rgba(250,250,252,0) 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
    },
    backgroundBlobGreen: {
        position: "absolute", bottom: "10%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,199,89,0.06) 0%, rgba(250,250,252,0) 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
    },
    noiseOverlay: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.012\"/%3E%3C/svg%3E')",
        pointerEvents: "none", zIndex: 1,
    },
    main: { position: "relative", zIndex: 10, paddingTop: "120px", display: "flex", flexDirection: "column", alignItems: "center" },
    backBtnContainer: { width: "100%", maxWidth: "1200px", padding: "0 40px", marginBottom: "40px" },
    backBtn: { background: "transparent", border: "none", fontSize: "14px", fontWeight: 600, color: "#8E8E93", cursor: "pointer", display: "flex", alignItems: "center", transition: "all 0.3s ease" },

    heroSection: { maxWidth: "900px", textAlign: "center", padding: "40px 40px 100px 40px", display: "flex", flexDirection: "column", alignItems: "center" },
    badge: { display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.12)", padding: "6px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 600, color: "#007AFF", marginBottom: "32px" },
    badgeDot: { width: "6px", height: "6px", backgroundColor: "#007AFF", borderRadius: "50%", boxShadow: "0 0 8px #007AFF" },
    title: { fontSize: "74px", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.05, margin: "0 0 32px 0" },
    titleHighlight: { color: "#007AFF", background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subtitle: { fontSize: "20px", lineHeight: 1.6, color: "#8E8E93", maxWidth: "700px" },

    blogGrid: { maxWidth: "1200px", width: "100%", padding: "0 40px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "40px" },
    blogCard: { background: "rgba(255,255,255,0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: "32px", padding: "40px", display: "flex", flexDirection: "column" },
    cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    categoryBadge: { display: "flex", alignItems: "center", padding: "6px 14px", borderRadius: "10px", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" },
    metaInfo: { fontSize: "13px", color: "#8E8E93", display: "flex", alignItems: "center", fontWeight: 500 },
    blogTitle: { fontSize: "28px", fontWeight: 700, margin: "0 0 16px 0", lineHeight: 1.25, letterSpacing: "-0.5px", transition: "color 0.3s ease" },
    blogSummary: { fontSize: "16px", color: "#48484A", lineHeight: 1.6, marginBottom: "32px", flex: 1 },
    cardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", borderTop: "1px solid rgba(0,0,0,0.04)" },
    dateInfo: { fontSize: "13px", color: "#8E8E93", display: "flex", alignItems: "center" },
    readMoreBtn: { background: "transparent", border: "none", color: "#1C1C1E", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" },

    newsletterSection: { width: "100%", maxWidth: "1200px", padding: "140px 40px" },
    newsletterCard: { background: "#1C1C1E", borderRadius: "40px", padding: "80px 40px", textAlign: "center", color: "white" },
    sectionTitle: { fontSize: "42px", fontWeight: 800, margin: "0 0 16px 0", letterSpacing: "-1.5px" },
    sectionSubtitle: { fontSize: "18px", color: "#8E8E93", marginBottom: "40px" },
    inputGroup: { display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" },
    input: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "16px 20px", color: "white", flex: 1, minWidth: "250px", fontSize: "15px", outline: "none" },
    subscribeBtn: { background: "#007AFF", color: "white", border: "none", padding: "16px 32px", borderRadius: "14px", fontSize: "15px", fontWeight: 700, cursor: "pointer" },

    footer: { padding: "60px 40px", textAlign: "center", borderTop: "1px solid #E5E5EA", width: "100%", color: "#8E8E93", fontSize: "14px" },
};
