import { Request, Response } from "express";
import { Project } from "../models/Project";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - userId is added by auth middleware
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Get real counts from database
    const totalProjects = await Project.countDocuments({ userId });

    // For now, placeholder for clients, tasks, revenue
    // These will be 0 until you create Client, Task, Payment models
    const totalClients = 0;
    const pendingTasks = 0;
    const totalRevenue = 0;

    res.json({
      success: true,
      data: {
        projects: totalProjects,
        clients: totalClients,
        tasks: pendingTasks,
        revenue: totalRevenue
      }
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};