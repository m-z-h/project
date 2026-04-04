"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);

  useEffect(() => {
    // Check if token exists in localStorage (Client side only)
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      router.push("/");
    }
  };

  const handleNavClick = (link: string) => {
    setActiveLink(link);
    if (link === "about us") {
      router.push("/about");
    } else if (link === "blog") {
      router.push("/blog");
    } else if (link === "home") {
      router.push("/");
    } else {
      // Internal scrolling if on home page
      const element = document.getElementById(link.replace(" ", ""));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push("/#" + link.replace(" ", ""));
      }
    }
  };

  return (
    <nav style={{
      ...styles.navbar,
      left: isLoggedIn ? "260px" : "0", // Offset to clear the Sidebar
      ...(scrolled ? styles.navbarScrolled : {})
    }}>
      <div style={styles.navContent}>
        {/* Logo */}
        <div
          style={styles.logoContainer}
          onClick={() => router.push("/")}
          className="logo-hover"
        >
          <div style={styles.circleMask}>
            <span style={styles.circleText}>WSD</span>
          </div>
          <span style={styles.logoText}>Web Smith Digital</span>
        </div>

        {/* Links */}
        <div style={styles.navLinks}>
          {["Home", "Services", "About Us", "Blog", "Contact Us"].map((item) => (
            <div 
              key={item} 
              style={{ position: "relative" }}
              onMouseEnter={() => item === "Services" && setShowServicesDropdown(true)}
              onMouseLeave={() => item === "Services" && setShowServicesDropdown(false)}
            >
              <button
                onClick={() => handleNavClick(item.toLowerCase())}
                style={{
                  ...styles.navLink,
                  ...(activeLink === item.toLowerCase() ? styles.activeNavLink : {}),
                }}
                className="nav-link-hover"
              >
                {item}
                {item === "Services" && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "4px", transition: "transform 0.3s ease", transform: showServicesDropdown ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <path d="m6 9 6 6 6-6"/>
                  </svg>
                )}
              </button>

              {item === "Services" && (
                <div style={{
                  ...styles.dropdown,
                  opacity: showServicesDropdown ? 1 : 0,
                  visibility: showServicesDropdown ? "visible" : "hidden",
                  transform: showServicesDropdown ? "translateY(0)" : "translateY(10px)",
                }} className="dropdown-glass">
                  {[
                    "Custom Software",
                    "Web Architecture",
                    "Cloud Strategy",
                    "Security Protocols",
                    "Performance Tuning",
                    "BPO & KPO Solutions"
                  ].map((sub) => (
                    <button 
                      key={sub} 
                      style={styles.dropdownItem} 
                      className="dropdown-item-hover"
                      onClick={() => {
                        handleNavClick("services");
                        setShowServicesDropdown(false);
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={styles.navActions}>
          {isLoggedIn ? (
            <div style={styles.authContainer}>
              <button
                style={styles.dashboardBtn}
                onClick={() => router.push("/dashboard")}
                className="dashboard-btn-hover"
              >
                Dashboard
              </button>
              <button
                style={styles.logoutBtn}
                onClick={handleLogout}
                className="logout-btn-hover"
              >
                Logout
              </button>
              <div
                style={styles.profileAvatar}
                className="profile-hover"
                title="Developer Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
          ) : (
            <button
              style={styles.loginBtn}
              onClick={() => router.push("/login")}
              className="login-btn-hover"
            >
              sign in
            </button>
          )}
        </div>
      </div>
      <style>{`
        .dashboard-btn-hover:hover {
          background: rgba(0,122,255,0.15) !important;
          transform: translateY(-1px);
        }
        .profile-hover:hover {
          transform: scale(1.05) translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
        }
        .logout-btn-hover:hover {
          color: #FF3B30 !important;
          background: rgba(255, 59, 48, 0.08) !important;
        }
        .dropdown-glass {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          border: 1px solid rgba(255, 255, 255, 0.5) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1) !important;
        }
        .dropdown-item-hover {
          transition: all 0.2s ease;
        }
        .dropdown-item-hover:hover {
          background: rgba(0, 122, 255, 0.08);
          color: #007AFF !important;
          padding-left: 20px !important;
        }
      `}</style>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
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
    display: "flex",
    alignItems: "center",
  },
  activeNavLink: {
    color: "#1C1C1E",
    background: "rgba(0,0,0,0.04)",
  },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 10px)",
    left: "0",
    width: "220px",
    borderRadius: "16px",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 1000,
  },
  dropdownItem: {
    background: "transparent",
    border: "none",
    padding: "10px 14px",
    textAlign: "left",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: 500,
    color: "#48484A",
    cursor: "pointer",
    transition: "all 0.2s ease",
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
  authContainer: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  dashboardBtn: {
    background: "rgba(0,122,255,0.08)",
    color: "#007AFF",
    border: "1px solid rgba(0,122,255,0.2)",
    padding: "8px 18px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  profileAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#1C1C1E",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
  },
  logoutBtn: {
    background: "transparent",
    color: "#8E8E93",
    border: "none",
    padding: "8px 12px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderRadius: "20px",
  },
};
