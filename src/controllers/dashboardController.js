const Donation = require("../models/Donation");
const Campaign = require("../models/Campaign");
const BeneficiaryRequest = require("../models/BenificieryRequest");
const User = require("../models/User");

// Get overall stats
exports.getStats = async (req, res) => {
  try {
    // Remove paymentStatus filter if Donation model doesn't have this field
    const totalDonationsAgg = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalDonations =
      totalDonationsAgg.length > 0 ? totalDonationsAgg[0].total : 0;

    const totalCampaigns = await Campaign.countDocuments();

    const approvedBeneficiaries =
      await BeneficiaryRequest.countDocuments({
        status: "approved",
      });

    res.json({
      totalDonations,
      totalCampaigns,
      approvedBeneficiaries,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// Top donors leaderboard
exports.getTopDonors = async (req, res) => {
  try {
    const topDonors = await User.find({ role: "donor" })
      .sort({ points: -1 })
      .limit(5)
      .select("name points badge");

    res.json(topDonors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};

// Donations per campaign (for chart)
exports.getCampaignStats = async (req, res) => {
  try {
    // Remove paymentStatus filter if Donation model doesn't have this field
    const stats = await Donation.aggregate([
      {
        $group: {
          _id: "$campaignId",
          totalAmount: { $sum: "$amount" },
        },
      },
      {
        $lookup: {
          from: "campaigns",
          localField: "_id",
          foreignField: "_id",
          as: "campaign",
        },
      },
      { $unwind: "$campaign" },
      {
        $project: {
          campaignTitle: "$campaign.title",
          totalAmount: 1,
        },
      },
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch campaign stats" });
  }
};