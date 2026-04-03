"use client";

import { Settings, User, Bell, Lock, Globe, Moon, Save } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function SettingsPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Settings</h1>
      
      <div style={styles.sidebarLayout}>
        {/* Settings Navigation */}
        <div style={styles.nav}>
          <div style={{...styles.navItem, ...styles.activeNav}}><User size={18}/> <span>Account</span></div>
          <div style={styles.navItem}><Bell size={18}/> <span>Notifications</span></div>
          <div style={styles.navItem}><Lock size={18}/> <span>Security</span></div>
          <div style={styles.navItem}><Globe size={18}/> <span>Billing</span></div>
          <div style={styles.navItem}><Moon size={18}/> <span>Appearance</span></div>
        </div>

        {/* Settings Form */}
        <div style={styles.content}>
          <Card>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>General Information</h3>
              <p style={styles.sectionDesc}>Update your profile and personal details</p>
              
              <div style={styles.formRow}>
                <Input label="Full Name" defaultValue="Jahangir Zaik" style={{ flex: 1 }} />
                <Input label="Job Title" defaultValue="Lead Developer" style={{ flex: 1 }} />
              </div>
              <Input label="Email Address" defaultValue="jahangir@websmith.com" disabled style={{ background: '#f5f5f7' }} />
              <Input label="Bio" placeholder="Tell us about yourself..." />

              <div style={styles.footer}>
                <Button><Save size={18} style={{marginRight: '8px'}}/> Save Changes</Button>
              </div>
            </div>
          </Card>

          <Card style={{ marginTop: '24px' }}>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}><Lock size={18} style={{marginRight: '8px'}} color="#FF3B30"/> Security</h3>
              <p style={styles.sectionDesc}>Manage your password and authentication settings</p>
              <Button variant="secondary">Change Password</Button>
              <Button variant="danger" style={{ marginLeft: '12px' }}>Disable Account</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

const styles: any = {
  container: { display: "flex", flexDirection: "column", gap: "32px" },
  title: { fontSize: "32px", fontWeight: 700, margin: 0, color: "#1d1d1f" },
  sidebarLayout: { display: "grid", gridTemplateColumns: "240px 1fr", gap: "40px" },
  nav: { display: "flex", flexDirection: "column", gap: "8px" },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: 500, color: "#86868b", cursor: "pointer", transition: "all 0.2s ease" },
  activeNav: { background: "#fff", color: "#1d1d1f", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" },
  content: { display: "flex", flexDirection: "column" },
  section: { padding: "8px" },
  sectionTitle: { fontSize: "18px", fontWeight: 600, margin: "0 0 4px 0", display: "flex", alignItems: "center" },
  sectionDesc: { fontSize: "13px", color: "#86868b", marginBottom: "24px" },
  formRow: { display: "flex", gap: "16px" },
  footer: { marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #E5E5EA", display: "flex", justifyContent: "flex-end" }
};
