import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import statsRoutes from "./stats.routes";
import projectRoutes from "./project.routes";
import clientRoutes from "./client.routes";
import invoiceRoutes from "./invoice.routes";
import taskRoutes from "./task.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/stats", statsRoutes);
router.use("/projects", projectRoutes);
router.use("/clients", clientRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/tasks", taskRoutes);

export default router;