"use client";

import { useEffect, useState } from "react";
import API from "../../core/services/apiService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import { Plus, Search, User, Mail, Briefcase, Phone } from "lucide-react";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
  });

  const fetchClients = async () => {
    try {
      const response = await API.get("/clients");
      setClients(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleCreateClient = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/clients", newClient);
      setNewClient({ name: "", email: "", company: "", phone: "" });
      setIsModalOpen(false);
      fetchClients();
    } catch (error) {
      console.error("Error creating client:", error);
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Header Area */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Clients</h1>
          <p style={styles.subtitle}>Manage your client relationships and contact data</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: "8px" }} /> Add Client
        </Button>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <Search size={18} color="#8E8E93" />
          <input 
            style={styles.searchInput} 
            placeholder="Search clients..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List / Loading */}
      {loading ? (
        <div style={styles.loading}>Loading clients...</div>
      ) : (
        <div style={styles.grid}>
          {filteredClients.map((client: any) => (
            <Card key={client._id}>
              <div style={styles.clientCard}>
                <div style={styles.clientAvatar}>
                   <User size={24} color="#007AFF" />
                </div>
                <div style={styles.clientInfo}>
                  <h3 style={styles.clientName}>{client.name}</h3>
                  <div style={styles.clientMeta}>
                    <Mail size={14} /> <span>{client.email}</span>
                  </div>
                  {client.company && (
                    <div style={styles.clientMeta}>
                      <Briefcase size={14} /> <span>{client.company}</span>
                    </div>
                  )}
                   {client.phone && (
                    <div style={styles.clientMeta}>
                      <Phone size={14} /> <span>{client.phone}</span>
                    </div>
                  )}
                </div>
                <div style={styles.badgeContainer}>
                  <Badge variant={client.status === "active" ? "success" : "info"}>
                    {client.status}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal View */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add New Client"
      >
        <form onSubmit={handleCreateClient} style={styles.form}>
          <Input 
            label="Full Name" 
            placeholder="Enter client name" 
            required 
            value={newClient.name}
            onChange={(e) => setNewClient({...newClient, name: e.target.value})}
          />
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="client@example.com" 
            required 
            value={newClient.email}
            onChange={(e) => setNewClient({...newClient, email: e.target.value})}
          />
          <Input 
            label="Company" 
            placeholder="Company name" 
            value={newClient.company}
            onChange={(e) => setNewClient({...newClient, company: e.target.value})}
          />
          <Input 
            label="Phone" 
            placeholder="+1 234 567 890" 
            value={newClient.phone}
            onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
          />
          <div style={{ marginTop: "12px" }}>
            <Button type="submit" style={{ width: "100%" }}>Create Client</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles: any = {
  container: { display: "flex", flexDirection: "column", gap: "32px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: "32px", fontWeight: 700, margin: 0, color: "#1d1d1f" },
  subtitle: { fontSize: "15px", color: "#86868b", margin: "4px 0 0 0" },
  toolbar: { display: "flex", alignItems: "center", gap: "16px" },
  searchContainer: { 
    display: "flex", 
    alignItems: "center", 
    gap: "10px", 
    background: "#fff", 
    padding: "8px 16px",
    borderRadius: "12px",
    border: "1px solid #E5E5EA",
    flex: 1,
    maxWidth: "400px"
  },
  searchInput: { border: "none", outline: "none", width: "100%", fontSize: "14px" },
  loading: { textAlign: "center", padding: "40px", color: "#8E8E93" },
  grid: { 
    display: "grid", 
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
    gap: "20px" 
  },
  clientCard: { display: "flex", gap: "16px", alignItems: "flex-start", position: "relative" },
  clientAvatar: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#E3F2FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  clientInfo: { flex: 1 },
  clientName: { fontSize: "16px", fontWeight: 600, margin: "0 0 8px 0", color: "#1d1d1f" },
  clientMeta: { 
    display: "flex", 
    alignItems: "center", 
    gap: "6px", 
    fontSize: "13px", 
    color: "#86868b",
    marginBottom: "4px"
  },
  badgeContainer: { position: "absolute", top: 0, right: 0 },
  form: { display: "flex", flexDirection: "column", gap: "4px" }
};
