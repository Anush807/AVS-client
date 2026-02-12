import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import Badge from "../../components/Badge";
import api from "../../api/axios";
import { calculateBadge } from "../../utils/gamification";
import { AuthContext } from "../../context/AuthContext";
import {
  Heart,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DonorDashboard = () => {
  const { user } = useContext(AuthContext);
  const [donations, setDonations] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState({
  totalDonated: 0,
  donationCount: 0,
  points: 0,
  badge: "None",
});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [donationsRes, campaignsRes] = await Promise.all([
        api.get("/donations/my"),
        api.get("/campaigns"),
      ]);

      const myDonations = donationsRes.data;
      setDonations(myDonations.slice(0, 5));
      setCampaigns(campaignsRes.data.slice(0, 3));

     // Calculate points from donations
const totalDonated = myDonations.reduce((sum, d) => sum + d.amount, 0);
const totalPoints = myDonations.reduce((sum, d) => sum + d.pointsEarned, 0);

// Determine badge based on points
const badge = calculateBadge(totalPoints);

setStats({
  totalDonated,
  donationCount: myDonations.length,
  points: totalPoints,
  badge: badge,
});
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mock data for donation trend chart
  const donationTrend = [
    { month: "Jan", amount: 0 },
    { month: "Feb", amount: 0 },
    { month: "Mar", amount: 0 },
    { month: "Apr", amount: 0 },
    { month: "May", amount: 0 },
    { month: "Jun", amount: donations.reduce((sum, d) => sum + d.amount, 0) },
  ];

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
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">Here's your impact at a glance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Donated"
            value={`₹${stats.totalDonated.toLocaleString()}`}
            icon={Heart}
            color="green"
          />
          <StatCard
            title="Donations Made"
            value={stats.donationCount}
            icon={Target}
            color="blue"
          />
          <StatCard
            title="Points Earned"
            value={stats.points}
            icon={Trophy}
            color="purple"
          />
          <div className="card">
            <p className="text-sm font-medium text-gray-600 mb-2">Your Badge</p>
            <Badge badge={stats.badge} points={stats.points} size="lg" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Donation Trend Chart */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Donation Journey</h2>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={donationTrend}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#0ea5e9"
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Progress to Next Badge */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Badge Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Bronze</span>
                  <span className="font-semibold">100 pts</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-600 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((stats.points / 100) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Silver</span>
                  <span className="font-semibold">300 pts</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-400 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((stats.points / 300) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Gold</span>
                  <span className="font-semibold">600 pts</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min((stats.points / 600) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              {stats.points < 100 && `${100 - stats.points} points to Bronze badge!`}
              {stats.points >= 100 && stats.points < 300 && `${300 - stats.points} points to Silver badge!`}
              {stats.points >= 300 && stats.points < 600 && `${600 - stats.points} points to Gold badge!`}
              {stats.points >= 600 && "You've reached the highest badge! 🎉"}
            </p>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Donations</h2>
            <Link
              to="/donor/donations"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {donations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Campaign
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation) => (
                    <tr key={donation._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {donation.campaignId?.title || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {donation.campaignId?.category || ""}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-green-600">
                          ₹{donation.amount.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-purple-600 font-semibold">
                          +{donation.pointsEarned} pts
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(donation.donatedAt).toLocaleDateString()}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">You haven't made any donations yet</p>
              <Link to="/donor/campaigns" className="btn-primary">
                Browse Campaigns
              </Link>
            </div>
          )}
        </div>

        {/* Featured Campaigns */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Featured Campaigns</h2>
            <Link
              to="/donor/campaigns"
              className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {campaigns.map((campaign) => (
              <div key={campaign._id} className="card hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {campaign.title}
                  </h3>
                  <span className="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full">
                    {campaign.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {campaign.description}
                </p>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-semibold">
                      ₹{campaign.collectedAmount.toLocaleString()} / ₹
                      {campaign.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary-600 h-2 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          (campaign.collectedAmount / campaign.targetAmount) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <Link
                  to={`/donor/campaigns/${campaign._id}`}
                  className="w-full btn-primary text-center block"
                >
                  Donate Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;
