"use client";

import { Users, UserPlus, Shield, Star } from "lucide-react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";

export default function TeamPage() {
  const teamMembers = [
    { id: 1, name: "Jahangir Zaik", role: "Owner / Full Stack Developer", status: "online", color: "#007AFF" },
    { id: 2, name: "Alex Chen", role: "Lead UI/UX", status: "offline", color: "#34C759" },
    { id: 3, name: "Maria Garcia", role: "Backend Architect", status: "online", color: "#AF52DE" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Team</h1>
          <p style={styles.subtitle}>Manage your workspace members and permissions</p>
        </div>
        <Button>
          <UserPlus size={18} style={{ marginRight: "8px" }} /> Invite Member
        </Button>
      </div>

      <div style={styles.grid}>
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <div style={styles.memberCard}>
              <div style={{ ...styles.avatar, backgroundColor: member.color }}>
                {member.name.charAt(0)}
              </div>
              <div style={styles.info}>
                <h3 style={styles.name}>{member.name}</h3>
                <p style={styles.role}>{member.role}</p>
                <div style={styles.badges}>
                  <Badge variant={member.status === "online" ? "success" : "info"}>
                    {member.status}
                  </Badge>
                  {member.id === 1 && <Badge variant="warning">Admin</Badge>}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const styles: any = {
  container: { display: "flex", flexDirection: "column", gap: "32px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: "32px", fontWeight: 700, margin: 0, color: "#1d1d1f" },
  subtitle: { fontSize: "15px", color: "#86868b", margin: "4px 0 0 0" },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
    gap: "20px" 
  },
  memberCard: { display: "flex", gap: "16px", alignItems: "center" },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "20px",
    fontWeight: 600,
  },
  info: { flex: 1 },
  name: { fontSize: "16px", fontWeight: 600, margin: "0 0 4px 0", color: "#1d1d1f" },
  role: { fontSize: "13px", color: "#86868b", marginBottom: "8px" },
  badges: { display: "flex", gap: "8px" }
};
