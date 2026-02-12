const mongoose = require("mongoose");

const volunteerTaskSchema = new mongoose.Schema({
  volunteerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: String,

  reportUrl: String,

  pointsEarned: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ["assigned", "submitted", "approved"],
    default: "assigned",
  },

  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VolunteerTask", volunteerTaskSchema);