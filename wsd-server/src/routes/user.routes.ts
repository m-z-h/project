import express from "express";
import { getCurrentUser, getAllUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/me", authMiddleware, getCurrentUser);
router.get("/", authMiddleware, getAllUsers);

export default router;