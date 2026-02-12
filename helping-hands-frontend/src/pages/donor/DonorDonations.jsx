import { useState, useEffect } from "react";
import { Calendar, Download, Heart, TrendingUp } from "lucide-react";
import Navbar from "../../components/Navbar";
import api from "../../api/axios";

const DonorDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDonated: 0,
    totalPoints: 0,
    donationCount: 0,
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await api.get("/donations/my");
      setDonations(res.data);
      
      const totalDonated = res.data.reduce((sum, d) => sum + d.amount, 0);
      const totalPoints = res.data.reduce((sum, d) => sum + (d.pointsEarned || 0), 0);
      
      setStats({
        totalDonated,
        totalPoints,
        donationCount: res.data.length,
      });
    } catch (error) {
      console.error("Failed to fetch donations:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReceipt = async (donationId) => {
    try {
      const res = await api.get(`/donations/receipt/${donationId}`);
      const receipt = res.data;
      
      // Create a simple text receipt
      const receiptText = `
DONATION RECEIPT
==================
Receipt ID: ${receipt.receiptId}
Donor Name: ${receipt.donorName}
Donor Email: ${receipt.donorEmail}

Campaign: ${receipt.campaign}
Category: ${receipt.category}
Amount: ₹${receipt.amount}
Points Earned: ${receipt.pointsEarned}

Donated At: ${new Date(receipt.donatedAt).toLocaleString()}
Issued At: ${new Date(receipt.issuedAt).toLocaleString()}

Thank you for your generous donation!
==================
      `;
      
      const blob = new Blob([receiptText], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${donationId}.txt`;
      a.click();
    } catch (error) {
      console.error("Failed to download receipt:", error);
      alert("Failed to download receipt");
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
          <h1 className="text-3xl font-bold text-gray-900">My Donations</h1>
          <p className="text-gray-600 mt-1">Track your giving history and impact</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donated</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  ₹{stats.totalDonated.toLocaleString()}
                </p>
              </div>
              <Heart className="h-12 w-12 text-green-600 opacity-20" fill="currentColor" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Points Earned</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.totalPoints}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-600 opacity-20" />
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Donations</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.donationCount}</p>
              </div>
              <Calendar className="h-12 w-12 text-blue-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Donations Table */}
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Donation History</h2>

          {donations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Receipt
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-900">
                            {new Date(donation.donatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {donation.campaignId?.title || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full">
                          {donation.campaignId?.category || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-green-600">
                          ₹{donation.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-purple-600">
                          +{donation.pointsEarned} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => downloadReceipt(donation._id)}
                          className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No donations yet</h3>
              <p className="text-gray-600 mb-4">Start making a difference today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorDonations;
