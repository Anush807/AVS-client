import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import api from "../../api/axios";
import {
  DollarSign,
  Target,
  Users,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDonations: 0,
    totalCampaigns: 0,
    approvedBeneficiaries: 0,
  });
  const [topDonors, setTopDonors] = useState([]);
  const [campaignStats, setCampaignStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, donorsRes, campaignStatsRes] = await Promise.all([
        api.get("/dashboard/stats"),
        api.get("/dashboard/leaderboard"),
        api.get("/dashboard/campaign-stats"),
      ]);

      setStats(statsRes.data);
      setTopDonors(donorsRes.data);
      setCampaignStats(campaignStatsRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ["#0ea5e9", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];

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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of your platform activities</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Donations"
            value={`₹${stats.totalDonations.toLocaleString()}`}
            icon={DollarSign}
            color="green"
            trend="up"
            trendValue="+12.5%"
          />
          <StatCard
            title="Active Campaigns"
            value={stats.totalCampaigns}
            icon={Target}
            color="purple"
          />
          <StatCard
            title="Approved Beneficiaries"
            value={stats.approvedBeneficiaries}
            icon={Users}
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Campaign Performance Chart */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Campaign Performance</h2>
              <Link to="/admin/campaigns" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View All
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={campaignStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="campaignTitle" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Bar dataKey="totalAmount" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Campaign Distribution Pie Chart */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Campaign Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={campaignStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ campaignTitle, percent }) =>
                    `${campaignTitle}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="totalAmount"
                >
                  {campaignStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Donors Leaderboard */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-primary-600" />
              <h2 className="text-xl font-bold text-gray-900">Top Donors Leaderboard</h2>
            </div>
            <Link to="/admin/donors" className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Donor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badge
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topDonors.map((donor, index) => (
                  <tr key={donor._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-2xl font-bold ${
                          index === 0 ? "text-yellow-500" :
                          index === 1 ? "text-gray-400" :
                          index === 2 ? "text-orange-600" :
                          "text-gray-400"
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-semibold">{donor.points}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          donor.badge === "Gold"
                            ? "badge-gold"
                            : donor.badge === "Silver"
                            ? "badge-silver"
                            : donor.badge === "Bronze"
                            ? "badge-bronze"
                            : "badge-none"
                        }`}
                      >
                        {donor.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {topDonors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No donors yet. Start creating campaigns to attract donors!
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <Link
            to="/admin/campaigns"
            className="card hover:shadow-md transition-all group"
          >
            <Target className="h-8 w-8 text-primary-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Manage Campaigns</h3>
            <p className="text-sm text-gray-600 mt-1">Create and edit campaigns</p>
          </Link>
          <Link
            to="/admin/users"
            className="card hover:shadow-md transition-all group"
          >
            <Users className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">User Management</h3>
            <p className="text-sm text-gray-600 mt-1">Add or remove users</p>
          </Link>
          <Link
            to="/admin/donations"
            className="card hover:shadow-md transition-all group"
          >
            <DollarSign className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">View Donations</h3>
            <p className="text-sm text-gray-600 mt-1">Track all transactions</p>
          </Link>
          <Link
            to="/admin/beneficiaries"
            className="card hover:shadow-md transition-all group"
          >
            <Users className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900">Beneficiaries</h3>
            <p className="text-sm text-gray-600 mt-1">Review requests</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
