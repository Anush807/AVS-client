const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");
const User = require("../models/User");

// Simple badge logic
const calculateBadge = (points) => {
  if (points >= 600) return "Gold";
  if (points >= 300) return "Silver";
  if (points >= 100) return "Bronze";
  return "None";
};

exports.makeDonation = async (req, res) => {
  try {
    const { campaignId, amount } = req.body;

    // 1️⃣ Find campaign
    const campaign = await Campaign.findById(campaignId);
    if (!campaign || campaign.status !== "active") {
      return res.status(400).json({ message: "Invalid campaign" });
    }

    // 2️⃣ Calculate points (₹10 = 1 point)
    const pointsEarned = Math.floor(amount / 10);

    // 3️⃣ Create donation record
    const donation = await Donation.create({
      donorId: req.user.userId,
      campaignId,
      amount,
      pointsEarned,
    });

    // 4️⃣ Update campaign collectedAmount
    campaign.collectedAmount += amount;
    await campaign.save();

    // 5️⃣ Update user points + badge
    const user = await User.findById(req.user.userId);
    user.points += pointsEarned;
    user.badge = calculateBadge(user.points);
    await user.save();

    res.status(201).json({
      message: "Donation successful",
      donation,
      totalPoints: user.points,
      badge: user.badge,
    });
  } catch (error) {
    res.status(500).json({ message: "Donation failed" });
  }
};

// Donor: get own donation history
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donorId: req.user.userId,
    })
      .populate("campaignId", "title category")
      .sort({ donatedAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donation history" });
  }
};

// Admin: get all donations
// Donor: get own donation history
exports.getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donorId: req.user.userId,
    })
      .populate("campaignId", "title category")
      .sort({ donatedAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donation history" });
  }
};

// Admin: get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("donorId", "name email")
      .populate("campaignId", "title")
      .sort({ donatedAt: -1 });

    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donations" });
  }
};

// Get donation receipt (Donor or Admin)
exports.getReceipt = async (req, res) => {
  try {
    const { id } = req.params;

    const donation = await Donation.findById(id)
      .populate("donorId", "name email")
      .populate("campaignId", "title category");

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    // If donor, ensure they are accessing their own receipt
    if (
      req.user.role === "donor" &&
      donation.donorId._id.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const receipt = {
      receiptId: donation._id,
      donorName: donation.donorId.name,
      donorEmail: donation.donorId.email,
      campaign: donation.campaignId.title,
      category: donation.campaignId.category,
      amount: donation.amount,
      pointsEarned: donation.pointsEarned,
      donatedAt: donation.donatedAt,
      issuedAt: new Date(),
    };

    res.json(receipt);
  } catch (error) {
    res.status(500).json({ message: "Failed to generate receipt" });
  }
};