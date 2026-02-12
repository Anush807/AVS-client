import { useState, useEffect } from "react";
import { Search, Filter, Heart, Target, Calendar } from "lucide-react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";

const DonorCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [loading, setLoading] = useState(true);

  const categories = ["All", "Education", "Healthcare", "Disaster Relief", "Community Welfare"];

  useEffect(() => {
    fetchCampaigns();
  }, []);

  useEffect(() => {
    filterCampaigns();
  }, [campaigns, selectedCategory, searchQuery]);

  const fetchCampaigns = async () => {
    try {
      const res = await api.get("/campaigns");
      setCampaigns(res.data);
      setFilteredCampaigns(res.data);
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterCampaigns = () => {
    let filtered = campaigns;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((c) => c.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((c) =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  };

  const openDonateModal = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonateModal(true);
  };

  const closeDonateModal = () => {
    setShowDonateModal(false);
    setSelectedCampaign(null);
    setDonationAmount("");
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/donations", {
        campaignId: selectedCampaign._id,
        amount: parseFloat(donationAmount),
      });

      alert(`Donation successful! You earned ${res.data.totalPoints} points!`);
      closeDonateModal();
      fetchCampaigns();
    } catch (error) {
      console.error("Donation failed:", error);
      alert(error.response?.data?.message || "Donation failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Campaigns</h1>
          <p className="text-gray-600 mt-1">Support causes that matter to you</p>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-500 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-primary-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign._id} className="card hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full">
                  {campaign.category}
                </span>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
                </div>
              </div>

              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {campaign.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {campaign.description}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">
                      {Math.round((campaign.collectedAmount / campaign.targetAmount) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-primary-600 to-primary-400 h-2.5 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (campaign.collectedAmount / campaign.targetAmount) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-500">Raised</p>
                    <p className="font-bold text-green-600">
                      ₹{campaign.collectedAmount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Goal</p>
                    <p className="font-bold text-gray-900">
                      ₹{campaign.targetAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => openDonateModal(campaign)}
                className="w-full btn-primary flex items-center justify-center space-x-2 group-hover:shadow-md"
              >
                <Heart className="h-4 w-4" />
                <span>Donate Now</span>
              </button>
            </div>
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 card">
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No campaigns found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Donation Modal */}
      {showDonateModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
              <p className="text-gray-600 mt-1">{selectedCampaign.title}</p>
            </div>

            <form onSubmit={handleDonate} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Donation Amount (₹)
                </label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  className="input-field"
                  placeholder="Enter amount"
                  min="10"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  You'll earn {Math.floor(donationAmount / 10)} points (₹10 = 1 point)
                </p>
              </div>

              <div className="bg-primary-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Campaign Details</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{selectedCampaign.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Raised:</span>
                    <span className="font-medium text-green-600">
                      ₹{selectedCampaign.collectedAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Goal:</span>
                    <span className="font-medium">
                      ₹{selectedCampaign.targetAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={closeDonateModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Complete Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorCampaigns;
