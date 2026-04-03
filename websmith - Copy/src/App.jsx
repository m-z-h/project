import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import LoginPage from "./pages/login/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: "30px",
          background: "#f5f5f7",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Add more routes here as you create pages */}
        <Route path="*" element={<div style={{padding: "50px", textAlign: "center"}}><h1>Page Not Found</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
