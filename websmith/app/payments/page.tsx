"use client";

import { CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft, ShieldCheck } from "lucide-react";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

export default function PaymentsPage() {
  const transactions = [
    { id: 1, type: "incoming", amount: 2400, client: "Nexus Architecture", status: "completed", date: "2026-04-01" },
    { id: 2, type: "incoming", amount: 1200, client: "Cloud Sync", status: "pending", date: "2026-04-02" },
    { id: 3, type: "outgoing", amount: 450, client: "Vercel Hosting", status: "completed", date: "2026-04-03" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Payments</h1>
          <p style={styles.subtitle}>Track your financial transactions and payouts</p>
        </div>
        <Button>
           <CreditCard size={18} style={{ marginRight: "8px" }} /> Connect Bank
        </Button>
      </div>

      <div style={styles.statsRow}>
        <Card><div style={styles.statBox}><p style={styles.statLabel}>Available Balance</p><h3 style={styles.statValue}>$12,450.00</h3></div></Card>
        <Card><div style={styles.statBox}><p style={styles.statLabel}>Total Payouts</p><h3 style={styles.statValue}>$48,200.00</h3></div></Card>
        <Card><div style={styles.statBox}><p style={styles.statLabel}>Pending Revenue</p><h3 style={styles.statValue}>$3,400.00</h3></div></Card>
      </div>

      <Card>
        <div style={styles.tableHead}>
           <h3 style={styles.tableTitle}>Recent Transactions</h3>
           <Badge variant="info">Verified Account <ShieldCheck size={12} style={{marginLeft: '4px'}}/></Badge>
        </div>
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Transaction</th>
              <th style={styles.th}>Recipient / Client</th>
              <th style={styles.th}>Amount</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={styles.tr}>
                <td style={styles.td}>
                   <div style={styles.txIcon}>
                     {tx.type === "incoming" ? <ArrowDownLeft size={16} color="#34C759" /> : <ArrowUpRight size={16} color="#FF3B30" />}
                     <span>{tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                   </div>
                </td>
                <td style={styles.td}>{tx.client}</td>
                <td style={{...styles.td, fontWeight: 600, color: tx.type === "incoming" ? "#34C759" : "#1d1d1f"}}>
                   {tx.type === "incoming" ? "+" : "-"}${tx.amount.toLocaleString()}
                </td>
                <td style={styles.td}>{tx.date}</td>
                <td style={styles.td}>
                   <Badge variant={tx.status === "completed" ? "success" : "warning"}>{tx.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

const styles: any = {
  container: { display: "flex", flexDirection: "column", gap: "32px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  title: { fontSize: "32px", fontWeight: 700, margin: 0, color: "#1d1d1f" },
  subtitle: { fontSize: "15px", color: "#86868b", margin: "4px 0 0 0" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" },
  statBox: { padding: "8px" },
  statLabel: { fontSize: "13px", color: "#86868b", marginBottom: "8px" },
  statValue: { fontSize: "28px", fontWeight: 800, margin: 0, color: "#1d1d1f", letterSpacing: "-1px" },
  tableHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  tableTitle: { fontSize: "18px", fontWeight: 600, margin: 0 },
  table: { width: "100%", borderCollapse: "collapse" },
  thRow: { borderBottom: "1px solid #E5E5EA" },
  th: { textAlign: "left", padding: "16px", fontSize: "12px", color: "#86868b", textTransform: "uppercase", letterSpacing: "0.5px" },
  tr: { borderBottom: "1px solid #F2F2F7" },
  td: { padding: "16px", fontSize: "14px", color: "#1d1d1f" },
  txIcon: { display: "flex", alignItems: "center", gap: "8px" }
};
