const Campaign = require("../models/Campaign");

// Create campaign (Admin only)
exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
      ...req.body,
      createdBy: req.user.userId,
    });

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Failed to create campaign" });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ status: "active" });
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch campaigns" });
  }
};

// Admin updates campaign
exports.updateCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Campaign updated successfully",
      campaign: updatedCampaign,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update campaign" });
  }
};

// Admin deletes campaign
exports.deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findById(id);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    await Campaign.findByIdAndDelete(id);

    res.json({ message: "Campaign deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete campaign" });
  }
};