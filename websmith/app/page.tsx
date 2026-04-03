"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Layout, Zap, Shield, Globe, Monitor, Code, Cloud, Users, Mail, Phone, MapPin } from "lucide-react";
import Navbar from "../components/ui/Navbar";
import Image from "next/image";

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

    const portfolioProjects = [
        { 
            title: "Nexus API Architecture", 
            type: "Backend Engineering", 
            tag: "Live",
            desc: "Scalable microservices for real-time data processing and enterprise connectivity. Built with 99.9% uptime reliability.",
            thumbnail: "/about_visual_it_1775221626430.png",
            bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" 
        },
        { 
            title: "Cloud Sync Infrastructure", 
            type: "DevOps & Cloud", 
            tag: "Enterprise",
            desc: "Global edge deployment across 12 regions with automated failover and secure multi-tenant isolation.",
            thumbnail: "/thumbnail_cloud_ai_1775221687563.png",
            bg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)" 
        },
        { 
            title: "AI Support Integration", 
            type: "AI & ML", 
            tag: "Active",
            desc: "Custom-trained LLM for automated customer support, reducing response times by 70% for our global partners.",
            thumbnail: "/thumbnail_fintech_1775221647353.png",
            bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" 
        },
    ];

    const services = [
        { icon: <Code size={26} />, title: "Custom Software", desc: "Tailored enterprise solutions designed to solve your unique business challenges with precision and scale." },
        { icon: <Layout size={26} />, title: "Web Architecture", desc: "Modern, high-performance web applications built with the latest frameworks and premium UX design." },
        { icon: <Cloud size={26} />, title: "Cloud Strategy", desc: "Expert migration and management for AWS, Azure, and Google Cloud, ensuring your data is resilient and fast." },
        { icon: <Shield size={26} />, title: "Security Protocols", desc: "Rigorous bank-grade audits and implementation to protect your digital assets from emerging threats." },
        { icon: <Zap size={26} />, title: "Performance Tuning", desc: "Optimization for existing legacy systems to achieve modern speed standards and user satisfaction." },
        { icon: <Users size={26} />, title: "BPO & KPO Solutions", desc: "Strategic outsourcing services that let you focus on core innovations while we handle the heavy operations." },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id.toLowerCase().replace(" ", ""));
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div style={styles.container}>
            {/* Dynamic Backgrounds */}
            <div style={styles.backgroundBlobBlue} className="pulse-slow"></div>
            <div style={styles.backgroundBlobGreen} className="pulse-slow-reverse"></div>
            <div style={styles.noiseOverlay}></div>

            <Navbar />

            <main style={styles.main}>
                {/* Hero Section */}
                <section style={styles.heroSection} id="home">
                    <div style={styles.badge} className="float-animation">
                        <span style={styles.badgeDot}></span>
                        <span>Official Web Smith Digital V2</span>
                    </div>

                    <h1 style={styles.title} className="fade-in-up">
                        Crafting Tomorrow's <br />
                        <span style={styles.titleHighlight}>Digital Infrastructure</span>
                    </h1>

                    <p style={styles.subtitle} className="fade-in-up-delay-1">
                        We are a full-cycle digital agency specializing in premium software development, cloud scale, and resilient web architectures for modern global enterprises.
                    </p>

                    <div style={styles.buttonGroup} className="fade-in-up-delay-2">
                        <button
                            style={styles.primaryBtn}
                            onClick={() => router.push("/login")}
                            className="primary-btn-hover"
                        >
                            Start Your Journey <ArrowRight size={18} style={{ marginLeft: "8px" }} />
                        </button>
                        <button
                            style={styles.secondaryBtn}
                            onClick={() => scrollToSection("aboutus")}
                            className="secondary-btn-hover"
                        >
                            Our Mission
                        </button>
                    </div>

                    <div style={styles.heroVisualContainer} className="fade-in-up-delay-3 float-animation-slow">
                        <div style={styles.glassCard}>
                            <div style={styles.fakeToolbar}>
                                <div style={{ ...styles.dot, backgroundColor: "#FF5F56" }}></div>
                                <div style={{ ...styles.dot, backgroundColor: "#FFBD2E" }}></div>
                                <div style={{ ...styles.dot, backgroundColor: "#27C93F" }}></div>
                                <div style={{ marginLeft: "12px", fontSize: "12px", color: "#8E8E93", fontWeight: 500 }}>websmith_v2_core.sys</div>
                            </div>
                            <div style={styles.fakeContent}>
                                <div style={styles.fakeLine1}></div>
                                <div style={styles.fakeLine2}></div>
                                <div style={styles.fakeLine3}></div>
                                <div style={{ ...styles.fakeLine1, width: "30%", marginTop: "20px", background: "#007AFF33" }}></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section style={styles.servicesSection} id="services">
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>What We Are Doing</h2>
                        <p style={styles.sectionSubtitle}>We provide the technical backbone for industry leaders.</p>
                    </div>

                    <div style={styles.serviceGrid}>
                        {services.map((svc, idx) => (
                            <div key={idx} style={styles.serviceCard} className="service-hover">
                                <div style={styles.serviceIconContainer}>{svc.icon}</div>
                                <h3 style={styles.serviceTitle}>{svc.title}</h3>
                                <p style={styles.serviceDesc}>{svc.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About Us Section */}
                <section style={styles.aboutSection} id="aboutus">
                    <div style={styles.aboutContent}>
                        <div style={styles.aboutTextContainer}>
                            <h2 style={styles.sectionTitle}>Our Business & Mission</h2>
                            <p style={styles.aboutText}>
                                Web Smith Digital was founded on a simple principle: <strong>Technology should be invisible yet indestructible.</strong> We are not just a software house; we are an engineering partner focused on core digital resilience.
                            </p>
                            <p style={styles.aboutText}>
                                From Kolkata to the world, we design infrastructures that process millions of requests while maintaining the aesthetic finesse of a luxury digital product. Our expertise spans across high-end finance, secure healthcare data, and global e-commerce.
                            </p>
                            <div style={styles.statsGrid}>
                                <div style={styles.statItem}>
                                    <span style={styles.statValue}>150+</span>
                                    <span style={styles.statLabel}>Projects Delivered</span>
                                </div>
                                <div style={styles.statItem}>
                                    <span style={styles.statValue}>99%</span>
                                    <span style={styles.statLabel}>Client Satisfaction</span>
                                </div>
                            </div>
                        </div>
                        <div style={styles.aboutVisual}>
                            <div style={styles.aboutImageContainer} className="about-float">
                                <Image 
                                    src="/about_visual_it_1775221626430.png" 
                                    alt="Technical Vision" 
                                    width={500} 
                                    height={400} 
                                    style={styles.aboutImage}
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Showcase (PORTFOLIO) */}
                <section style={styles.projectsSection} id="portfolio">
                    <div style={styles.sectionHeader}>
                        <h2 style={styles.sectionTitle}>Recent Global Deliveries</h2>
                        <p style={styles.sectionSubtitle}>A showcase of digital products recently deployed by our team.</p>
                    </div>
                    
                    <div style={styles.projectGrid}>
                        {portfolioProjects.map((proj, index) => (
                            <div key={index} style={styles.projectCard} className="project-card-hover">
                                <div style={{ ...styles.projectThumb }}>
                                    <Image 
                                        src={proj.thumbnail} 
                                        alt={proj.title} 
                                        width={400} 
                                        height={240} 
                                        style={styles.thumbImage}
                                    />
                                    <span style={styles.projectLabel}>{proj.tag}</span>
                                </div>
                                <div style={styles.projectInfo}>
                                    <div style={styles.projectType}>{proj.type}</div>
                                    <h3 style={styles.projectTitle}>{proj.title}</h3>
                                    <p style={styles.projectDesc}>{proj.desc}</p>
                                    <a href="#" style={styles.projectLink}>Examine Infrastructure →</a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Contact Section */}
                <section style={styles.contactSection} id="contactus">
                    <div style={styles.contactCard}>
                        <div style={styles.contactInfo}>
                            <h2 style={styles.sectionTitle} style={{ color: "white" }}>Start a Conversation</h2>
                            <p style={styles.sectionSubtitle} style={{ color: "#8E8E93" }}>Ready to scale? Our experts are standing by to architect your solution.</p>
                            
                            <div style={styles.contactDetails}>
                                <div style={styles.contactDetailItem}>
                                    <Mail size={20} color="#007AFF" /> <span>hello@websmithdigital.com</span>
                                </div>
                                <div style={styles.contactDetailItem}>
                                    <Phone size={20} color="#007AFF" /> <span>+91 9876-543-210</span>
                                </div>
                                <div style={styles.contactDetailItem}>
                                    <MapPin size={20} color="#007AFF" /> <span>Tech Hub, Level 4, Kolkata, IN</span>
                                </div>
                            </div>
                        </div>
                        <div style={styles.contactForm}>
                            <input type="text" placeholder="Your Name" style={styles.input} />
                            <input type="email" placeholder="Business Email" style={styles.input} />
                            <textarea placeholder="Tell us about your project..." style={styles.textarea}></textarea>
                            <button style={styles.submitBtn} className="primary-btn-hover">Send Inquiry</button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer style={styles.footer}>
                <div style={styles.footerContent}>
                    <div style={styles.footerBrand}>
                        <div style={styles.footerLogo}>Web Smith Digital</div>
                        <p style={styles.footerTagline}>Crafting the resilient web of tomorrow.</p>
                    </div>
                    <div style={styles.footerLinks}>
                        <div style={styles.footerLinkCol}>
                            <h4 style={{ color: "#1C1C1E", marginBottom: "8px" }}>Company</h4>
                            <a href="#" style={styles.footerLink}>About Us</a>
                            <a href="#" style={styles.footerLink}>Services</a>
                            <a href="#" style={styles.footerLink}>Careers</a>
                        </div>
                        <div style={styles.footerLinkCol}>
                            <h4 style={{ color: "#1C1C1E", marginBottom: "8px" }}>Support</h4>
                            <a href="#" style={styles.footerLink}>Documentation</a>
                            <a href="#" style={styles.footerLink}>Privacy Policy</a>
                            <a href="#" style={styles.footerLink}>Terms of Use</a>
                        </div>
                    </div>
                </div>
                <div style={styles.footerBottom}>
                    <p style={styles.copyright}>© {new Date().getFullYear()} Websmith. All rights reserved.</p>
                </div>
            </footer>

            <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #F2F2F7; }
        ::-webkit-scrollbar-thumb { background: #C7C7CC; border-radius: 4px; }

        .service-hover { transition: all 0.4s ease; border: 1px solid rgba(0,0,0,0.03); }
        .service-hover:hover { transform: translateY(-8px); background: #ffffff; box-shadow: 0 20px 40px rgba(0,122,255,0.05); border-color: rgba(0,122,255,0.1); }
        .service-hover:hover svg { color: #007AFF; transform: scale(1.1); }

        .about-float { animation: float-about 6s ease-in-out infinite; }
        @keyframes float-about { 
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(1deg); }
        }

        .primary-btn-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .primary-btn-hover:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0, 122, 255, 0.25); background: #0066CC; }

        .secondary-btn-hover { transition: all 0.3s ease; }
        .secondary-btn-hover:hover { transform: translateY(-3px); background: #fdfdfd; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }

        .project-card-hover { transition: all 0.4s ease; cursor: pointer; }
        .project-card-hover:hover { transform: translateY(-10px); box-shadow: 0 30px 60px rgba(0,0,0,0.1); }

        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .fade-in-up-delay-1 { opacity: 0; animation: fadeInUp 0.8s 0.15s forwards; }
        .fade-in-up-delay-2 { opacity: 0; animation: fadeInUp 0.8s 0.3s forwards; }
        .fade-in-up-delay-3 { opacity: 0; animation: fadeInUp 1s 0.45s forwards; }

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
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: "#1C1C1E",
        position: "relative",
        overflowX: "hidden",
    },
    backgroundBlobBlue: {
        position: "absolute", top: "-15%", right: "-5%", width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,122,255,0.12) 0%, rgba(250,250,252,0) 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
    },
    backgroundBlobGreen: {
        position: "absolute", bottom: "10%", left: "-10%", width: "600px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(52,199,89,0.08) 0%, rgba(250,250,252,0) 70%)", filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
    },
    noiseOverlay: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\" opacity=\"0.015\"/%3E%3C/svg%3E')",
        pointerEvents: "none", zIndex: 1,
    },
    main: { position: "relative", zIndex: 10, paddingTop: "100px", display: "flex", flexDirection: "column", alignItems: "center" },
    heroSection: { maxWidth: "1000px", width: "100%", padding: "80px 40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", minHeight: "85vh" },
    badge: { display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,122,255,0.08)", border: "1px solid rgba(0,122,255,0.15)", padding: "6px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 500, color: "#007AFF", marginBottom: "32px" },
    badgeDot: { width: "6px", height: "6px", backgroundColor: "#007AFF", borderRadius: "50%", boxShadow: "0 0 8px #007AFF" },
    title: { fontSize: "80px", fontWeight: 800, letterSpacing: "-3px", lineHeight: 1.05, margin: "0 0 24px 0", color: "#1C1C1E" },
    titleHighlight: { color: "#007AFF", background: "linear-gradient(135deg, #007AFF 0%, #00C6FF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    subtitle: { fontSize: "20px", lineHeight: 1.6, color: "#8E8E93", maxWidth: "680px", margin: "0 0 40px 0", fontWeight: 400 },
    buttonGroup: { display: "flex", gap: "16px", alignItems: "center" },
    primaryBtn: { background: "#007AFF", color: "#FFFFFF", border: "none", padding: "16px 32px", borderRadius: "14px", fontSize: "16px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,122,255,0.2)", display: "flex", alignItems: "center" },
    secondaryBtn: { background: "#FFFFFF", color: "#1C1C1E", border: "1px solid #E5E5EA", padding: "16px 32px", borderRadius: "14px", fontSize: "16px", fontWeight: 600, cursor: "pointer", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" },
    heroVisualContainer: { marginTop: "60px", width: "100%", maxWidth: "850px" },
    glassCard: { background: "rgba(255,255,255,0.5)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 40px 80px rgba(0,0,0,0.06)", borderRadius: "24px", height: "400px", overflow: "hidden", display: "flex", flexDirection: "column" },
    fakeToolbar: { height: "54px", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", alignItems: "center", padding: "0 20px", gap: "8px", background: "rgba(255,255,255,0.4)" },
    dot: { width: "12px", height: "12px", borderRadius: "50%" },
    fakeContent: { padding: "40px", flex: 1, display: "flex", flexDirection: "column", gap: "20px" },
    fakeLine1: { height: "28px", width: "40%", background: "#E5E5EA", borderRadius: "8px" },
    fakeLine2: { height: "28px", width: "70%", background: "#F2F2F7", borderRadius: "8px" },
    fakeLine3: { height: "28px", width: "60%", background: "#F2F2F7", borderRadius: "8px" },
    
    servicesSection: { width: "100%", maxWidth: "1200px", padding: "100px 40px" },
    sectionHeader: { textAlign: "center", marginBottom: "80px" },
    sectionTitle: { fontSize: "42px", fontWeight: 700, letterSpacing: "-1.5px", color: "#1C1C1E", margin: "0 0 16px 0" },
    sectionSubtitle: { fontSize: "20px", color: "#8E8E93", margin: 0 },
    serviceGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" },
    serviceCard: { background: "rgba(255,255,255,0.4)", padding: "48px", borderRadius: "28px", boxShadow: "0 8px 24px rgba(0,0,0,0.02)" },
    serviceIconContainer: { width: "56px", height: "56px", borderRadius: "16px", background: "rgba(0,122,255,0.08)", color: "#007AFF", display: "flex", alignItems: "center", justifyCenter: "center", marginBottom: "28px", display: "flex", justifyContent: "center" },
    serviceTitle: { fontSize: "22px", fontWeight: 600, color: "#1C1C1E", margin: "0 0 12px 0", letterSpacing: "-0.5px" },
    serviceDesc: { fontSize: "16px", color: "#8E8E93", lineHeight: 1.6, margin: 0 },

    aboutSection: { width: "100%", background: "rgba(0,122,255,0.01)", padding: "120px 40px", display: "flex", justifyContent: "center" },
    aboutContent: { maxWidth: "1200px", width: "100%", display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" },
    aboutTextContainer: { flex: 1, minWidth: "300px" },
    aboutText: { fontSize: "18px", color: "#48484A", lineHeight: 1.7, marginBottom: "24px" },
    statsGrid: { display: "flex", gap: "40px", marginTop: "40px" },
    statItem: { display: "flex", flexDirection: "column" },
    statValue: { fontSize: "36px", fontWeight: 800, color: "#007AFF" },
    statLabel: { fontSize: "14px", color: "#8E8E93", fontWeight: 500, textTransform: "uppercase", letterSpacing: "1px" },
    aboutVisual: { flex: 1, minWidth: "300px", display: "flex", justifyContent: "center" },
    aboutImageContainer: { borderRadius: "32px", overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.12)", border: "1px solid rgba(255,255,255,0.8)" },
    aboutImage: { objectFit: "cover" },

    projectsSection: { width: "100%", maxWidth: "1200px", padding: "120px 40px" },
    projectGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "40px" },
    projectCard: { background: "#FFFFFF", borderRadius: "28px", overflow: "hidden", border: "1px solid #E5E5EA", display: "flex", flexDirection: "column" },
    projectThumb: { height: "240px", position: "relative", overflow: "hidden" },
    thumbImage: { objectFit: "cover", width: "100%", height: "100%" },
    projectLabel: { position: "absolute", top: "20px", right: "20px", background: "rgba(255,255,255,0.9)", backdropFilter: "blur(4px)", padding: "6px 14px", borderRadius: "100px", fontSize: "12px", fontWeight: 700, color: "#007AFF", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" },
    projectInfo: { padding: "32px" },
    projectType: { fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", color: "#007AFF", marginBottom: "8px" },
    projectTitle: { fontSize: "24px", fontWeight: 700, color: "#1C1C1E", margin: "0 0 12px 0", letterSpacing: "-1px" },
    projectDesc: { fontSize: "15px", color: "#8E8E93", lineHeight: 1.6, marginBottom: "24px" },
    projectLink: { fontSize: "14px", fontWeight: 600, color: "#1C1C1E", textDecoration: "none" },

    contactSection: { width: "100%", maxWidth: "1200px", padding: "100px 40px 160px 40px" },
    contactCard: { background: "#1C1C1E", borderRadius: "32px", padding: "60px", display: "flex", gap: "60px", flexWrap: "wrap", boxShadow: "0 40px 80px rgba(0,0,0,0.2)" },
    contactInfo: { flex: 1, minWidth: "300px" },
    contactDetails: { marginTop: "40px", display: "flex", flexDirection: "column", gap: "24px" },
    contactDetailItem: { display: "flex", alignItems: "center", gap: "16px", color: "#E5E5EA", fontSize: "16px" },
    contactForm: { flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" },
    input: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "16px 20px", color: "#FFFFFF", fontSize: "15px", outline: "none" },
    textarea: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "16px 20px", color: "#FFFFFF", fontSize: "15px", outline: "none", minHeight: "120px", resize: "none" },
    submitBtn: { background: "#007AFF", color: "#FFFFFF", border: "none", padding: "16px", borderRadius: "14px", fontSize: "16px", fontWeight: 600, cursor: "pointer" },

    footer: { background: "#FFFFFF", borderTop: "1px solid #E5E5EA", padding: "80px 40px 40px 40px", width: "100%" },
    footerContent: { maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "60px" },
    footerBrand: { flex: 1, minWidth: "200px" },
    footerLogo: { fontSize: "24px", fontWeight: 800, color: "#1C1C1E", marginBottom: "12px" },
    footerTagline: { fontSize: "15px", color: "#8E8E93", maxWidth: "240px" },
    footerLinks: { display: "flex", gap: "60px" },
    footerLinkCol: { display: "flex", flexDirection: "column", gap: "16px" },
    footerLink: { fontSize: "14px", color: "#8E8E93", textDecoration: "none", transition: "color 0.2s ease" },
    footerBottom: { maxWidth: "1200px", margin: "60px auto 0 auto", paddingTop: "40px", borderTop: "1px solid #F2F2F7", textAlign: "center" },
    copyright: { fontSize: "14px", color: "#86868B" },
};
