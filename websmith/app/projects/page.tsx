"use client";

import { useEffect, useState } from "react";
import API from "../../core/services/apiService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import { Plus, Search, Folder, Calendar, DollarSign, User } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "active",
    budget: 0,
    clientId: "",
  });

  const fetchData = async () => {
    try {
      const [projRes, clientRes] = await Promise.all([
        API.get("/projects"),
        API.get("/clients"),
      ]);
      setProjects(projRes.data.data);
      setClients(clientRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/projects", newProject);
      setNewProject({ name: "", description: "", status: "active", budget: 0, clientId: "" });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const filteredProjects = projects.filter(proj => 
    proj.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proj.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active": return "info";
      case "completed": return "success";
      case "on-hold": return "warning";
      default: return "info";
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Area */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Projects</h1>
          <p style={styles.subtitle}>Track and manage your ongoing digital deliveries</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: "8px" }} /> New Project
        </Button>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <Search size={18} color="#8E8E93" />
          <input 
            style={styles.searchInput} 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List / Loading */}
      {loading ? (
        <div style={styles.loading}>Loading projects...</div>
      ) : (
        <div style={styles.grid}>
          {filteredProjects.map((proj: any) => (
            <Card key={proj._id}>
              <div style={styles.projectCard}>
                <div style={styles.projectHeader}>
                  <div style={styles.projectIcon}>
                    <Folder size={24} color="#007AFF" />
                  </div>
                  <Badge variant={getStatusVariant(proj.status)}>
                    {proj.status}
                  </Badge>
                </div>
                
                <h3 style={styles.projectName}>{proj.name}</h3>
                <p style={styles.projectDesc}>{proj.description || "No description provided."}</p>
                
                <div style={styles.projectMeta}>
                  <div style={styles.metaItem}>
                    <User size={14} /> <span>{proj.clientName || "Direct Client"}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <DollarSign size={14} /> <span>${proj.budget.toLocaleString()}</span>
                  </div>
                  <div style={styles.metaItem}>
                    <Calendar size={14} /> <span>{new Date(proj.createdAt).toLocaleDateString()}</span>
                  </div>
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
        title="Create New Project"
      >
        <form onSubmit={handleCreateProject} style={styles.form}>
          <Input 
            label="Project Name" 
            placeholder="Enter project name" 
            required 
            value={newProject.name}
            onChange={(e) => setNewProject({...newProject, name: e.target.value})}
          />
          <Input 
            label="Description" 
            placeholder="Short overview of the project" 
            value={newProject.description}
            onChange={(e) => setNewProject({...newProject, description: e.target.value})}
          />
          <div style={styles.formRow}>
             <div style={{ flex: 1 }}>
                <label style={styles.formLabel}>Client</label>
                <select 
                  style={styles.select}
                  value={newProject.clientId}
                  onChange={(e) => setNewProject({...newProject, clientId: e.target.value})}
                >
                  <option value="">Select a client</option>
                  {clients.map((c: any) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
             </div>
             <Input 
              label="Budget ($)" 
              type="number" 
              placeholder="0" 
              style={{ flex: 1 }}
              value={newProject.budget}
              onChange={(e) => setNewProject({...newProject, budget: Number(e.target.value)})}
            />
          </div>
          
          <div style={{ marginTop: "12px" }}>
            <Button type="submit" style={{ width: "100%" }}>Create Project</Button>
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
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", 
    gap: "20px" 
  },
  projectCard: { display: "flex", flexDirection: "column", gap: "12px" },
  projectHeader: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  projectIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    background: "#E3F2FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  projectName: { fontSize: "18px", fontWeight: 600, margin: "8px 0 0 0", color: "#1d1d1f" },
  projectDesc: { fontSize: "14px", color: "#86868b", lineHeight: 1.5, margin: 0, minHeight: "42px" },
  projectMeta: { 
    display: "flex", 
    flexWrap: "wrap",
    gap: "16px", 
    marginTop: "8px",
    paddingTop: "16px",
    borderTop: "1px solid #E5E5EA"
  },
  metaItem: { 
    display: "flex", 
    alignItems: "center", 
    gap: "6px", 
    fontSize: "13px", 
    color: "#86868b" 
  },
  form: { display: "flex", flexDirection: "column", gap: "4px" },
  formRow: { display: "flex", gap: "16px", alignItems: "flex-start" },
  formLabel: { fontSize: "13px", fontWeight: 500, color: "#86868b", marginLeft: "4px", display: "block", marginBottom: "6px" },
  select: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1.5px solid #E5E5EA",
    background: "#fff",
    fontSize: "14px",
    outline: "none"
  }
};
