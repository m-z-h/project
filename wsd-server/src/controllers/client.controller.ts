import { Request, Response } from "express";
import { Client } from "../models/Client";

export const getClients = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const clients = await Client.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching clients" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const client = new Client({ ...req.body, userId });
    await client.save();
    res.status(201).json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating client" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!client) return res.status(404).json({ success: false, message: "Client not found" });
    res.json({ success: true, data: client });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating client" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const client = await Client.findOneAndDelete({ _id: req.params.id, userId });
    if (!client) return res.status(404).json({ success: false, message: "Client not found" });
    res.json({ success: true, message: "Client deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting client" });
  }
};
