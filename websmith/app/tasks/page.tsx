"use client";

import { useEffect, useState } from "react";
import API from "../../core/services/apiService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import { Plus, Search, CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    projectId: "",
  });

  const fetchData = async () => {
    try {
      const [taskRes, projRes] = await Promise.all([
        API.get("/tasks"),
        API.get("/projects"),
      ]);
      setTasks(taskRes.data.data);
      setProjects(projRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/tasks", newTask);
      setNewTask({ title: "", description: "", priority: "medium", status: "todo", projectId: "" });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const toggleTaskStatus = async (task: any) => {
    const newStatus = task.status === "done" ? "todo" : "done";
    try {
      await API.put(`/tasks/${task._id}`, { status: newStatus });
      fetchData();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high": return <Badge variant="error">High</Badge>;
      case "medium": return <Badge variant="warning">Medium</Badge>;
      case "low": return <Badge variant="success">Low</Badge>;
      default: return null;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Area */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Tasks</h1>
          <p style={styles.subtitle}>Manage your daily to-dos and project milestones</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: "8px" }} /> Add Task
        </Button>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <Search size={18} color="#8E8E93" />
          <input 
            style={styles.searchInput} 
            placeholder="Search tasks..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* List / Loading */}
      {loading ? (
        <div style={styles.loading}>Loading tasks...</div>
      ) : (
        <div style={styles.list}>
          {filteredTasks.length === 0 ? (
            <div style={styles.emptyState}>No tasks found. Create one to get started!</div>
          ) : (
            filteredTasks.map((task: any) => (
              <div 
                key={task._id} 
                style={{ 
                  ...styles.taskItem, 
                  opacity: task.status === "done" ? 0.6 : 1,
                  background: task.status === "done" ? "rgba(0,0,0,0.02)" : "#fff" 
                }}
              >
                <button 
                  style={styles.checkBtn} 
                  onClick={() => toggleTaskStatus(task)}
                >
                  {task.status === "done" ? (
                    <CheckCircle2 size={22} color="#34C759" />
                  ) : (
                    <Circle size={22} color="#E5E5EA" />
                  )}
                </button>
                
                <div style={styles.taskContent}>
                  <h3 style={{ 
                    ...styles.taskTitle, 
                    textDecoration: task.status === "done" ? "line-through" : "none" 
                  }}>
                    {task.title}
                  </h3>
                  <div style={styles.taskMeta}>
                    {task.projectId && (
                      <div style={styles.metaBadge}>📁 {projects.find(p => p._id === task.projectId)?.name}</div>
                    )}
                    <div style={styles.metaBadge}>
                      <Clock size={12} style={{marginRight: '4px'}} /> 
                      {new Date(task.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div style={styles.taskActions}>
                   {getPriorityBadge(task.priority)}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal View */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Task"
      >
        <form onSubmit={handleCreateTask} style={styles.form}>
          <Input 
            label="Task Title" 
            placeholder="What needs to be done?" 
            required 
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
          />
          <Input 
            label="Description" 
            placeholder="Add some details..." 
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          />
          
          <div style={styles.formRow}>
             <div style={{ flex: 1 }}>
                <label style={styles.formLabel}>Project</label>
                <select 
                  style={styles.select}
                  value={newTask.projectId}
                  onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}
                >
                  <option value="">No project</option>
                  {projects.map((p: any) => (
                    <option key={p._id} value={p._id}>{p.name}</option>
                  ))}
                </select>
             </div>
             <div style={{ flex: 1 }}>
                <label style={styles.formLabel}>Priority</label>
                <select 
                  style={styles.select}
                  value={newTask.priority}
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
             </div>
          </div>
          
          <div style={{ marginTop: "12px" }}>
            <Button type="submit" style={{ width: "100%" }}>Create Task</Button>
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
  list: { display: "flex", flexDirection: "column", gap: "12px" },
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    padding: "16px 20px",
    borderRadius: "14px",
    border: "1px solid #E5E5EA",
    transition: "all 0.2s ease",
  },
  checkBtn: { background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" },
  taskContent: { flex: 1 },
  taskTitle: { fontSize: "15px", fontWeight: 500, margin: 0, color: "#1d1d1f" },
  taskMeta: { display: "flex", gap: "12px", marginTop: "4px" },
  metaBadge: { fontSize: "11px", color: "#86868b", background: "rgba(0,0,0,0.04)", padding: "2px 8px", borderRadius: "4px", display: "flex", alignItems: "center" },
  taskActions: { display: "flex", alignItems: "center", gap: "12px" },
  emptyState: { textAlign: "center", padding: "60px", color: "#8E8E93", background: "rgba(0,0,0,0.02)", borderRadius: "20px", border: "1px dashed #E5E5EA" },
  form: { display: "flex", flexDirection: "column", gap: "4px" },
  formRow: { display: "flex", gap: "16px" },
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
