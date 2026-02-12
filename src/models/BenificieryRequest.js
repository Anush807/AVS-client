const mongoose = require("mongoose");

const beneficiaryRequestSchema = new mongoose.Schema({
  beneficiaryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },

  requestMessage: {
    type: String,
    required: true,
  },

  documentUrl: {
    type: String, // For now just store a string (no file upload yet)
  },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  reviewedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "BeneficiaryRequest",
  beneficiaryRequestSchema
);