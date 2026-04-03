import { Request, Response } from "express";
import { Project } from "../models/Project";
import { Client } from "../models/Client";
import { Task } from "../models/Task";
import { Invoice } from "../models/Invoice";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [totalProjects, totalClients, pendingTasks, invoices] = await Promise.all([
      Project.countDocuments({ userId }),
      Client.countDocuments({ userId }),
      Task.countDocuments({ userId, status: { $ne: "done" } }),
      Invoice.find({ userId, status: "paid" })
    ]);

    const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);

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
    res.status(500).json({ success: false, message: "Server error" });
  }
};