import { Request, Response } from "express";
import { Invoice } from "../models/Invoice";

export const getInvoices = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const invoices = await Invoice.find({ userId }).populate("clientId").sort({ createdAt: -1 });
    res.json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching invoices" });
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const invoiceData = { ...req.body, userId };

    // Remove empty strings for optional/incorrectly formatted fields
    if (invoiceData.clientId === "") delete invoiceData.clientId;

    const invoice = new Invoice(invoiceData);
    await invoice.save();
    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    console.error("Invoice Create Error:", error);
    res.status(500).json({ success: false, message: "Error creating invoice" });
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const invoiceData = { ...req.body };

    // Remove empty strings for optional/incorrectly formatted fields
    if (invoiceData.clientId === "") delete invoiceData.clientId;

    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id, userId },
      invoiceData,
      { new: true }
    );
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.json({ success: true, data: invoice });
  } catch (error) {
    console.error("Invoice Update Error:", error);
    res.status(500).json({ success: false, message: "Error updating invoice" });
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const invoice = await Invoice.findOneAndDelete({ _id: req.params.id, userId });
    if (!invoice) return res.status(404).json({ success: false, message: "Invoice not found" });
    res.json({ success: true, message: "Invoice deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting invoice" });
  }
};
