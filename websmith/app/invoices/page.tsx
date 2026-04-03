"use client";

import { useEffect, useState } from "react";
import API from "../../core/services/apiService";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Badge from "../../components/ui/Badge";
import { Plus, Search, FileText, Download, MoreVertical, CreditCard } from "lucide-react";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [newInvoice, setNewInvoice] = useState({
    clientId: "",
    invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
    amount: 0,
    dueDate: "",
    status: "pending",
  });

  const fetchData = async () => {
    try {
      const [invRes, clientRes] = await Promise.all([
        API.get("/invoices"),
        API.get("/clients"),
      ]);
      setInvoices(invRes.data.data);
      setClients(clientRes.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching invoices:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await API.post("/invoices", newInvoice);
      setNewInvoice({ 
        clientId: "", 
        invoiceNumber: `INV-${Math.floor(1000 + Math.random() * 9000)}`, 
        amount: 0, 
        dueDate: "", 
        status: "pending" 
      });
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.clientId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid": return <Badge variant="success">Paid</Badge>;
      case "pending": return <Badge variant="warning">Pending</Badge>;
      case "overdue": return <Badge variant="error">Overdue</Badge>;
      default: return <Badge variant="info">{status}</Badge>;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Area */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Invoices</h1>
          <p style={styles.subtitle}>Generate and track your billing and payments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus size={18} style={{ marginRight: "8px" }} /> Create Invoice
        </Button>
      </div>

      {/* Toolbar */}
      <div style={styles.toolbar}>
        <div style={styles.searchContainer}>
          <Search size={18} color="#8E8E93" />
          <input 
            style={styles.searchInput} 
            placeholder="Search invoice number or client..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table / Loading */}
      {loading ? (
        <div style={styles.loading}>Loading invoices...</div>
      ) : (
        <Card>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeadRow}>
                  <th style={styles.th}>Invoice</th>
                  <th style={styles.th}>Client</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Due Date</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv: any) => (
                  <tr key={inv._id} style={styles.tableRow}>
                    <td style={styles.td}>
                      <div style={styles.invInfo}>
                        <FileText size={18} color="#007AFF" />
                        <span style={styles.invNumber}>{inv.invoiceNumber}</span>
                      </div>
                    </td>
                    <td style={styles.td}>{inv.clientId?.name || "Unknown Client"}</td>
                    <td style={styles.td}>
                       <span style={styles.amount}>${inv.amount.toLocaleString()}</span>
                    </td>
                    <td style={styles.td}>{new Date(inv.dueDate).toLocaleDateString()}</td>
                    <td style={styles.td}>{getStatusBadge(inv.status)}</td>
                    <td style={styles.td}>
                       <div style={styles.actions}>
                          <button style={styles.iconBtn}><Download size={16} /></button>
                          <button style={styles.iconBtn}><MoreVertical size={16} /></button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredInvoices.length === 0 && (
              <div style={styles.emptyState}>No invoices found.</div>
            )}
          </div>
        </Card>
      )}

      {/* Modal View */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Create New Invoice"
      >
        <form onSubmit={handleCreateInvoice} style={styles.form}>
           <div style={{ flex: 1, marginBottom: '16px' }}>
                <label style={styles.formLabel}>Select Client</label>
                <select 
                  style={styles.select}
                  required
                  value={newInvoice.clientId}
                  onChange={(e) => setNewInvoice({...newInvoice, clientId: e.target.value})}
                >
                  <option value="">Select a client</option>
                  {clients.map((c: any) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
             </div>

          <div style={styles.formRow}>
            <Input 
              label="Invoice Number" 
              value={newInvoice.invoiceNumber}
              disabled
              style={{ background: '#f5f5f7' }}
            />
             <Input 
              label="Amount ($)" 
              type="number" 
              placeholder="0.00" 
              required
              value={newInvoice.amount}
              onChange={(e) => setNewInvoice({...newInvoice, amount: Number(e.target.value)})}
            />
          </div>

          <Input 
            label="Due Date" 
            type="date" 
            required
            value={newInvoice.dueDate}
            onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
          />
          
          <div style={{ marginTop: "12px" }}>
            <Button type="submit" style={{ width: "100%" }}>Generate Invoice</Button>
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
  tableContainer: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left" },
  tableHeadRow: { borderBottom: "1px solid #E5E5EA" },
  th: { padding: "16px", fontSize: "13px", fontWeight: 600, color: "#86868b", textTransform: "uppercase", letterSpacing: "0.5px" },
  tableRow: { borderBottom: "1px solid #F2F2F7", transition: "background 0.2s ease" },
  td: { padding: "16px", fontSize: "14px", color: "#1d1d1f" },
  invInfo: { display: "flex", alignItems: "center", gap: "10px" },
  invNumber: { fontWeight: 600 },
  amount: { fontWeight: 600, color: "#1d1d1f" },
  actions: { display: "flex", gap: "8px" },
  iconBtn: { background: "none", border: "none", cursor: "pointer", color: "#86868b", padding: "4px", borderRadius: "4px", transition: "background 0.2s ease" },
  emptyState: { textAlign: "center", padding: "40px", color: "#8E8E93" },
  form: { display: "flex", flexDirection: "column" },
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
