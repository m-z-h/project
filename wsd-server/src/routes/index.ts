import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import statsRoutes from "./stats.routes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/stats", statsRoutes);

export default router;