const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    enum: ["Education", "Healthcare", "Disaster Relief", "Community Welfare"],
    required: true,
  },

  description: String,

  targetAmount: {
    type: Number,
    required: true,
  },

  collectedAmount: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active",
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Campaign", campaignSchema);