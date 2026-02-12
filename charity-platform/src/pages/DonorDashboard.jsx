import { useState, useEffect } from 'react';
import { Heart, Award, History, Download, TrendingUp, Trophy } from 'lucide-react';
import { campaignAPI, donationAPI, dashboardAPI } from '../services/api';
import { formatCurrency, formatDateTime, getBadgeClass } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';
import CampaignCard from '../components/CampaignCard';

const DonorDashboard = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [myDonations, setMyDonations] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [campaignsRes, donationsRes, leadersRes] = await Promise.all([
        campaignAPI.getCampaigns(),
        donationAPI.getMyDonations(),
        dashboardAPI.getTopDonors(),
      ]);
      setCampaigns(campaignsRes.data);
      setMyDonations(donationsRes.data);
      setTopDonors(leadersRes.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
    setShowDonateModal(true);
  };

  const handleDownloadReceipt = async (donationId) => {
    try {
      const response = await donationAPI.getReceipt(donationId);
      const receipt = response.data;
      
      // Create a simple text receipt
      const receiptText = `
DONATION RECEIPT
================
Receipt ID: ${receipt.receiptId}
Donor: ${receipt.donorName}
Email: ${receipt.donorEmail}
Campaign: ${receipt.campaign}
Category: ${receipt.category}
Amount: ${formatCurrency(receipt.amount)}
Points Earned: ${receipt.pointsEarned}
Date: ${new Date(receipt.donatedAt).toLocaleString()}
Issued: ${new Date(receipt.issuedAt).toLocaleString()}
      `;
      
      // Download as text file
      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${receipt.receiptId}.txt`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Failed to download receipt');
    }
  };

  if (loading) return <Loading />;

  const totalDonated = myDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalPoints = user.points || 0;
  const userRank = topDonors.findIndex(d => d._id === user.id) + 1;

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-header">Welcome back, {user.name}!</h1>
          <p className="text-neutral-600">Continue making a difference with your contributions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 mb-1">Total Donated</p>
                <p className="text-2xl font-bold">{formatCurrency(totalDonated)}</p>
              </div>
              <Heart className="h-10 w-10 text-primary-200" fill="currentColor" />
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Total Points</p>
                <p className="text-2xl font-bold text-neutral-900">{totalPoints}</p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Your Badge</p>
                <span className={`badge text-base ${getBadgeClass(user.badge)}`}>
                  {user.badge || 'None'}
                </span>
              </div>
              <Award className="h-10 w-10 text-yellow-600" />
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Leaderboard Rank</p>
                <p className="text-2xl font-bold text-neutral-900">#{userRank || '-'}</p>
              </div>
              <Trophy className="h-10 w-10 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-neutral-200">
          <div className="flex space-x-6">
            {['campaigns', 'history', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-colors duration-200 border-b-2 ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <div>
              <h2 className="section-title">Active Campaigns</h2>
              {campaigns.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {campaigns.map((campaign) => (
                    <CampaignCard
                      key={campaign._id}
                      campaign={campaign}
                      onDonate={handleDonateClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <Heart className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">No active campaigns available</p>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div>
              <h2 className="section-title flex items-center space-x-2">
                <History className="h-6 w-6" />
                <span>Donation History</span>
              </h2>
              {myDonations.length > 0 ? (
                <div className="card overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Campaign</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-700">Category</th>
                        <th className="text-right py-3 px-4 font-semibold text-neutral-700">Amount</th>
                        <th className="text-right py-3 px-4 font-semibold text-neutral-700">Points</th>
                        <th className="text-center py-3 px-4 font-semibold text-neutral-700">Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myDonations.map((donation) => (
                        <tr key={donation._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="py-3 px-4 text-sm">{formatDateTime(donation.donatedAt)}</td>
                          <td className="py-3 px-4 font-medium">{donation.campaignId?.title || 'N/A'}</td>
                          <td className="py-3 px-4">
                            <span className="badge bg-primary-100 text-primary-700">
                              {donation.campaignId?.category || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-semibold text-green-600">
                            {formatCurrency(donation.amount)}
                          </td>
                          <td className="py-3 px-4 text-right font-medium text-primary-600">
                            +{donation.pointsEarned}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => handleDownloadReceipt(donation._id)}
                              className="text-primary-600 hover:text-primary-700"
                            >
                              <Download className="h-5 w-5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="card text-center py-12">
                  <History className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">No donations yet</p>
                  <button
                    onClick={() => setActiveTab('campaigns')}
                    className="btn-primary mt-4"
                  >
                    Browse Campaigns
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div>
              <h2 className="section-title flex items-center space-x-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                <span>Top Donors</span>
              </h2>
              <div className="card">
                <div className="space-y-3">
                  {topDonors.map((donor, index) => (
                    <div
                      key={donor._id}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                        donor._id === user.id
                          ? 'bg-primary-50 border-2 border-primary-200'
                          : 'bg-neutral-50 hover:bg-neutral-100'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                            index === 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : index === 1
                              ? 'bg-gray-100 text-gray-700'
                              : index === 2
                              ? 'bg-orange-100 text-orange-700'
                              : 'bg-neutral-200 text-neutral-700'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">
                            {donor.name}
                            {donor._id === user.id && (
                              <span className="ml-2 text-sm text-primary-600">(You)</span>
                            )}
                          </p>
                          <p className="text-sm text-neutral-600">{donor.points} points</p>
                        </div>
                      </div>
                      <span className={`badge ${getBadgeClass(donor.badge)}`}>{donor.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Donate Modal */}
      {showDonateModal && (
        <DonateModal
          campaign={selectedCampaign}
          onClose={() => {
            setShowDonateModal(false);
            setSelectedCampaign(null);
          }}
          onSuccess={() => {
            fetchData();
            setShowDonateModal(false);
            setSelectedCampaign(null);
          }}
        />
      )}
    </div>
  );
};

// Donate Modal Component
const DonateModal = ({ campaign, onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await donationAPI.makeDonation({
        campaignId: campaign._id,
        amount: parseFloat(amount),
      });
      alert('Donation successful! Thank you for your contribution.');
      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || 'Donation failed');
    } finally {
      setLoading(false);
    }
  };

  const suggestedAmounts = [100, 500, 1000, 5000];
  const pointsToEarn = Math.floor(parseFloat(amount || 0) / 10);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 animate-scale-in">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Make a Donation</h2>
        <div className="mb-4">
          <h3 className="font-semibold text-neutral-900">{campaign.title}</h3>
          <p className="text-sm text-neutral-600">{campaign.category}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Donation Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input-field"
              placeholder="Enter amount"
              min="10"
              required
            />
          </div>

          <div>
            <p className="text-sm text-neutral-600 mb-2">Quick Select:</p>
            <div className="grid grid-cols-4 gap-2">
              {suggestedAmounts.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setAmount(amt.toString())}
                  className="px-3 py-2 border-2 border-neutral-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors duration-200 text-sm font-medium"
                >
                  ₹{amt}
                </button>
              ))}
            </div>
          </div>

          {amount && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
              <p className="text-sm text-primary-900">
                You'll earn <span className="font-bold">{pointsToEarn} points</span> for this donation!
              </p>
              <p className="text-xs text-primary-700 mt-1">₹10 = 1 point</p>
            </div>
          )}

          <div className="flex space-x-3 pt-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Processing...' : 'Donate Now'}
            </button>
            <button type="button" onClick={onClose} className="btn-ghost">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorDashboard;
