const VolunteerTask = require("../models/VolunteerTask");
const User = require("../models/User");

// Badge logic (reuse)
const calculateBadge = (points) => {
  if (points >= 600) return "Gold";
  if (points >= 300) return "Silver";
  if (points >= 100) return "Bronze";
  return "None";
};

// Admin assigns task
exports.assignTask = async (req, res) => {
  try {
    const { volunteerId, title, description } = req.body;

    const task = await VolunteerTask.create({
      volunteerId,
      title,
      description,
      assignedBy: req.user.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign task" });
  }
};

// Volunteer submits report
exports.submitReport = async (req, res) => {
  try {
    const { taskId, reportUrl } = req.body;

    const task = await VolunteerTask.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.reportUrl = reportUrl;
    task.status = "submitted";
    await task.save();

    res.json({ message: "Report submitted" });
  } catch (error) {
    res.status(500).json({ message: "Submission failed" });
  }
};

// Admin approves task
exports.approveTask = async (req, res) => {
  try {
    const { taskId, points } = req.body;

    const task = await VolunteerTask.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = "approved";
    task.pointsEarned = points;
    await task.save();

    // Update volunteer points
    const user = await User.findById(task.volunteerId);
    user.points += points;
    user.badge = calculateBadge(user.points);
    await user.save();

    res.json({
      message: "Task approved",
      totalPoints: user.points,
      badge: user.badge,
    });
  } catch (error) {
    res.status(500).json({ message: "Approval failed" });
  }
};

// NEW: Volunteer gets their own tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find({ 
      volunteerId: req.user.userId 
    })
      .populate("assignedBy", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};

// NEW: Admin gets all volunteer tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find()
      .populate("volunteerId", "name email")
      .populate("assignedBy", "name")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};