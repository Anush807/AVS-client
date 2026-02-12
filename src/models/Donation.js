const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  paymentStatus: {
    type: String,
    enum: ["success", "failed"],
    default: "success",
  },

  pointsEarned: {
    type: Number,
  },

  donatedAt: {  
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Donation", donationSchema);