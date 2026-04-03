import { Request, Response } from "express";
import { Task } from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const tasks = await Task.find({ userId }).populate("projectId").sort({ createdAt: -1 });
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const taskData = { ...req.body, userId };

    // Remove empty strings for optional ObjectId fields
    if (taskData.projectId === "") delete taskData.projectId;

    const task = new Task(taskData);
    await task.save();
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error("Task Create Error:", error);
    res.status(500).json({ success: false, message: "Error creating task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const taskData = { ...req.body };

    // Remove empty strings for optional ObjectId fields
    if (taskData.projectId === "") delete taskData.projectId;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId },
      taskData,
      { new: true }
    );
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, data: task });
  } catch (error) {
    console.error("Task Update Error:", error);
    res.status(500).json({ success: false, message: "Error updating task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId });
    if (!task) return res.status(404).json({ success: false, message: "Task not found" });
    res.json({ success: true, message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task" });
  }
};
