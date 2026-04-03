import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" }, // Link to Client
  name: { type: String, required: true },
  description: { type: String, default: "" },
  status: { type: String, enum: ["active", "completed", "on-hold"], default: "active" },
  budget: { type: Number, default: 0 },
  clientName: { type: String, default: "" }, // Keep for legacy/manual entry
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Project = mongoose.model("Project", projectSchema);