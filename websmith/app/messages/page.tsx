"use client";

import { MessageSquare, Send, Search, User } from "lucide-react";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

export default function MessagesPage() {
  const conversations = [
    { id: 1, name: "Jahangir Zaik", lastMsg: "The backend is now live!", time: "2m", active: true },
    { id: 2, name: "Maria Garcia", lastMsg: "Did you check the new project schema?", time: "1h", active: false },
    { id: 3, name: "Support Team", lastMsg: "Your workspace is ready.", time: "3h", active: false },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Messages</h1>
      
      <div style={styles.main}>
        {/* Contact List */}
        <div style={styles.sidebar}>
          <div style={styles.searchContainer}>
            <Search size={16} color="#8E8E93" />
            <input style={styles.searchInput} placeholder="Search messages..." />
          </div>
          <div style={styles.list}>
            {conversations.map((conv) => (
              <div key={conv.id} style={{...styles.convItem, borderLeft: conv.active ? "3px solid #007AFF" : "3px solid transparent", background: conv.active ? "rgba(0,122,255,0.05)" : "transparent"}}>
                <div style={styles.avatar}>{conv.name.charAt(0)}</div>
                <div style={styles.info}>
                  <div style={styles.nameRow}>
                    <span style={styles.name}>{conv.name}</span>
                    <span style={styles.time}>{conv.time}</span>
                  </div>
                  <p style={styles.lastMsg}>{conv.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <Card>
          <div style={styles.chatWindow}>
            <div style={styles.chatHeader}>
              <div style={styles.avatar}>J</div>
              <div>
                 <h3 style={styles.name}>Jahangir Zaik</h3>
                 <span style={styles.status}>Online</span>
              </div>
            </div>
            <div style={styles.messagesArea}>
               <div style={styles.msgReceived}>
                  <p>Welcome to the new Websmith messaging system!</p>
               </div>
               <div style={styles.msgSent}>
                  <p>Thanks! It looks great.</p>
               </div>
            </div>
            <div style={styles.inputArea}>
               <input style={styles.chatInput} placeholder="Type a message..." />
               <button style={styles.sendBtn}><Send size={18} /></button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

const styles: any = {
  container: { display: "flex", flexDirection: "column", gap: "24px" },
  title: { fontSize: "32px", fontWeight: 700, margin: 0, color: "#1d1d1f" },
  main: { display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" },
  sidebar: { background: "#fff", borderRadius: "14px", border: "1px solid #E5E5EA", padding: "16px", height: "calc(100vh - 160px)", display: "flex", flexDirection: "column" },
  searchContainer: { display: "flex", alignItems: "center", gap: "10px", background: "#f5f5f7", padding: "8px 12px", borderRadius: "10px", marginBottom: "16px" },
  searchInput: { border: "none", outline: "none", background: "none", fontSize: "14px", width: "100%" },
  list: { display: "flex", flexDirection: "column", gap: "8px" },
  convItem: { display: "flex", gap: "12px", padding: "12px", borderRadius: "8px", cursor: "pointer", transition: "background 0.2s ease" },
  avatar: { width: "40px", height: "40px", borderRadius: "50%", background: "#E3F2FF", color: "#007AFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 },
  info: { flex: 1 },
  nameRow: { display: "flex", justifyContent: "space-between", marginBottom: "4px" },
  name: { fontSize: "14px", fontWeight: 600, color: "#1d1d1f" },
  time: { fontSize: "11px", color: "#8E8E93" },
  lastMsg: { fontSize: "13px", color: "#86868b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  chatWindow: { display: "flex", flexDirection: "column", height: "calc(100vh - 200px)" },
  chatHeader: { display: "flex", alignItems: "center", gap: "12px", paddingBottom: "16px", borderBottom: "1px solid #E5E5EA" },
  status: { fontSize: "12px", color: "#34C759" },
  messagesArea: { flex: 1, padding: "20px 0", display: "flex", flexDirection: "column", gap: "12px", overflowY: "auto" },
  msgReceived: { alignSelf: "flex-start", background: "#f5f5f7", padding: "10px 16px", borderRadius: "16px 16px 16px 4px", fontSize: "14px", maxWidth: "70%" },
  msgSent: { alignSelf: "flex-end", background: "#007AFF", color: "#fff", padding: "10px 16px", borderRadius: "16px 16px 4px 16px", fontSize: "14px", maxWidth: "70%" },
  inputArea: { display: "flex", gap: "12px", paddingTop: "16px", borderTop: "1px solid #E5E5EA" },
  chatInput: { flex: 1, border: "none", outline: "none", background: "#f5f5f7", borderRadius: "10px", padding: "12px 16px", fontSize: "14px" },
  sendBtn: { background: "#007AFF", color: "#fff", border: "none", borderRadius: "10px", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }
};
