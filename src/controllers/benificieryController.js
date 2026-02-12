const BeneficiaryRequest = require("../models/BenificieryRequest");
const Campaign = require("../models/Campaign");

// Submit request (Beneficiary only)
exports.submitRequest = async (req, res) => {
  try {
    const { campaignId, requestMessage, documentUrl } = req.body;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(400).json({ message: "Invalid campaign" });
    }

    const request = await BeneficiaryRequest.create({
      beneficiaryId: req.user.userId,
      campaignId,
      requestMessage,
      documentUrl,
    });

    res.status(201).json({
      message: "Request submitted successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit request" });
  }
};

// Admin: get all pending requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await BeneficiaryRequest.find({ status: "pending" })
      .populate("beneficiaryId", "name email")
      .populate("campaignId", "title");

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch requests" });
  }
};

// Admin: approve or reject
exports.reviewRequest = async (req, res) => {
  try {
    const { requestId, action } = req.body; // action = approved/rejected

    const request = await BeneficiaryRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    request.status = action;
    request.reviewedBy = req.user.userId;
    request.reviewedAt = new Date();

    await request.save();

    res.json({ message: `Request ${action}` });
  } catch (error) {
    res.status(500).json({ message: "Failed to review request" });
  }
};