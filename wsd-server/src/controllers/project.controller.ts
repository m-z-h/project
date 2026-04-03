import { Request, Response } from "express";
import { Project } from "../models/Project";

export const getProjects = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const projects = await Project.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching projects" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const projectData = { ...req.body, userId };
    
    // Remove empty strings for optional ObjectId fields
    if (projectData.clientId === "") delete projectData.clientId;

    const project = new Project(projectData);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    console.error("Project Create Error:", error);
    res.status(500).json({ success: false, message: "Error creating project" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const projectData = { ...req.body };

    // Remove empty strings for optional ObjectId fields
    if (projectData.clientId === "") delete projectData.clientId;

    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, userId },
      projectData,
      { new: true }
    );
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, data: project });
  } catch (error) {
    console.error("Project Update Error:", error);
    res.status(500).json({ success: false, message: "Error updating project" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const project = await Project.findOneAndDelete({ _id: req.params.id, userId });
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting project" });
  }
};