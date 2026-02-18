import { useState, useEffect } from 'react';
import { Users, DollarSign, Target, TrendingUp, Plus, Edit2, Trash2, Award, CheckSquare, FileText, CheckCircle, XCircle } from 'lucide-react';
import { dashboardAPI, campaignAPI, userAPI, volunteerAPI, beneficiaryAPI } from '../services/api';
import { formatCurrency, formatDateTime, getStatusColor } from '../utils/helpers';
import Loading from '../components/Loading';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [topDonors, setTopDonors] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [campaignStats, setCampaignStats] = useState([]);
  const [users, setUsers] = useState([]);
  const [volunteerTasks, setVolunteerTasks] = useState([]);
  const [beneficiaryRequests, setBeneficiaryRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, donorsRes, campaignsRes, campaignStatsRes, usersRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getTopDonors(),
        campaignAPI.getCampaigns(),
        dashboardAPI.getCampaignStats(),
        userAPI.getUsers(),
      ]);

      setStats(statsRes.data);
      setTopDonors(donorsRes.data);
      setCampaigns(campaignsRes.data);
      setCampaignStats(campaignStatsRes.data);
      setUsers(usersRes.data);

      // Fetch volunteers and beneficiaries data (with error handling)
      try {
        const tasksRes = await volunteerAPI.getAllTasks();
        setVolunteerTasks(tasksRes.data || []);
      } catch (error) {
        console.log('Volunteer tasks endpoint not available yet');
        setVolunteerTasks([]);
      }

      try {
        const requestsRes = await beneficiaryAPI.getAllRequests();
        setBeneficiaryRequests(requestsRes.data || []);
      } catch (error) {
        console.log('Beneficiary requests endpoint not available yet');
        setBeneficiaryRequests([]);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await campaignAPI.deleteCampaign(id);
        fetchDashboardData();
      } catch (error) {
        alert('Failed to delete campaign');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userAPI.deleteUser(id);
        fetchDashboardData();
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleReviewRequest = async (requestId, action) => {
    const actionText = action === 'approved' ? 'approve' : 'reject';
    if (window.confirm(`Are you sure you want to ${actionText} this request?`)) {
      try {
        await beneficiaryAPI.reviewRequest({ requestId, action });
        alert(`Request ${action} successfully!`);
        fetchDashboardData();
      } catch (error) {
        alert(`Failed to ${actionText} request`);
      }
    }
  };

  const handleApproveTask = async (taskId) => {
    const points = prompt('Enter points to award (e.g., 50):');
    if (points && !isNaN(points)) {
      try {
        await volunteerAPI.approveTask({ taskId, points: parseInt(points) });
        alert('Task approved successfully!');
        fetchDashboardData();
      } catch (error) {
        alert('Failed to approve task');
      }
    } else if (points !== null) {
      alert('Please enter a valid number');
    }
  };

  if (loading) return <Loading />;

  const statCards = [
    {
      title: 'Total Donations',
      value: formatCurrency(stats?.totalDonations || 0),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Campaigns',
      value: stats?.totalCampaigns || 0,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Approved Beneficiaries',
      value: stats?.approvedBeneficiaries || 0,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Growth',
      value: '+12.5%',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  const COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-header">Admin Dashboard</h1>
          <p className="text-neutral-600">Manage campaigns, users, and monitor platform activity</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-neutral-200">
          <div className="flex space-x-6 overflow-x-auto">
            {['overview', 'campaigns', 'users', 'volunteers', 'beneficiaries', 'leaderboard'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-colors duration-200 border-b-2 whitespace-nowrap ${
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Campaign Stats Chart */}
              <div className="card">
                <h3 className="section-title">Donations by Campaign</h3>
                {campaignStats.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={campaignStats}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="campaignTitle" angle={-45} textAnchor="end" height={100} fontSize={12} />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="totalAmount" fill="#0ea5e9" />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-neutral-500 text-center py-8">No campaign data available</p>
                )}
              </div>

              {/* User Distribution */}
              <div className="card">
                <h3 className="section-title">User Distribution</h3>
                {users.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={users.reduce((acc, user) => {
                          const existingRole = acc.find(item => item.name === user.role);
                          if (existingRole) {
                            existingRole.value += 1;
                          } else {
                            acc.push({ name: user.role, value: 1 });
                          }
                          return acc;
                        }, [])}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {users.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <p className="text-neutral-500 text-center py-8">No user data available</p>
                )}
              </div>
            </div>
          )}

          {/* Campaigns Tab */}
          {activeTab === 'campaigns' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="section-title mb-0">All Campaigns</h2>
                <button
                  onClick={() => setShowCreateCampaign(!showCreateCampaign)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create Campaign</span>
                </button>
              </div>

              {showCreateCampaign && <CreateCampaignForm onSuccess={() => { setShowCreateCampaign(false); fetchDashboardData(); }} />}

              <div className="grid gap-4">
                {campaigns.map((campaign) => (
                  <div key={campaign._id} className="card hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900">{campaign.title}</h3>
                          <span className="badge bg-primary-100 text-primary-700">{campaign.category}</span>
                          <span className={`badge ${campaign.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                            {campaign.status}
                          </span>
                        </div>
                        <p className="text-neutral-600 text-sm mb-2">{campaign.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-neutral-600">
                            Target: <span className="font-semibold">{formatCurrency(campaign.targetAmount)}</span>
                          </span>
                          <span className="text-green-600">
                            Collected: <span className="font-semibold">{formatCurrency(campaign.collectedAmount || 0)}</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-4 md:mt-0">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCampaign(campaign._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="section-title mb-0">All Users</h2>
                <button
                  onClick={() => setShowCreateUser(!showCreateUser)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Create User</span>
                </button>
              </div>

              {showCreateUser && <CreateUserForm onSuccess={() => { setShowCreateUser(false); fetchDashboardData(); }} />}

              <div className="card overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Email</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Role</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Points</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-700">Badge</th>
                      <th className="text-right py-3 px-4 font-semibold text-neutral-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className="badge bg-neutral-100 text-neutral-700 capitalize">{user.role}</span>
                        </td>
                        <td className="py-3 px-4">{user.points || 0}</td>
                        <td className="py-3 px-4">
                          <span className={`badge ${user.badge === 'Gold' ? 'badge-gold' : user.badge === 'Silver' ? 'badge-silver' : user.badge === 'Bronze' ? 'badge-bronze' : 'badge-none'}`}>
                            {user.badge || 'None'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="card">
              <h2 className="section-title flex items-center space-x-2">
                <Award className="h-6 w-6 text-yellow-500" />
                <span>Top Donors Leaderboard</span>
              </h2>
              <div className="space-y-4">
                {topDonors.map((donor, index) => (
                  <div
                    key={donor._id}
                    className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0 ? 'bg-yellow-100 text-yellow-700' :
                        index === 1 ? 'bg-gray-100 text-gray-700' :
                        index === 2 ? 'bg-orange-100 text-orange-700' :
                        'bg-neutral-200 text-neutral-700'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-neutral-900">{donor.name}</p>
                        <p className="text-sm text-neutral-600">{donor.points} points</p>
                      </div>
                    </div>
                    <span className={`badge ${donor.badge === 'Gold' ? 'badge-gold' : donor.badge === 'Silver' ? 'badge-silver' : donor.badge === 'Bronze' ? 'badge-bronze' : 'badge-none'}`}>
                      {donor.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Volunteers Tab */}
          {activeTab === 'volunteers' && (
            <div>
              <h2 className="section-title flex items-center space-x-2">
                <CheckSquare className="h-6 w-6" />
                <span>Volunteer Tasks Management</span>
              </h2>
              {volunteerTasks.length > 0 ? (
                <div className="space-y-4">
                  {volunteerTasks.map((task) => (
                    <div key={task._id} className="card hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-neutral-900">{task.title}</h3>
                            <span className={`badge ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </div>
                          <p className="text-neutral-600 text-sm mb-2">{task.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                            <span>Volunteer: <span className="font-medium">{task.volunteerId?.name || 'N/A'}</span></span>
                            <span>Assigned: {formatDateTime(task.createdAt)}</span>
                            {task.pointsEarned && (
                              <span className="text-green-600 font-medium">
                                +{task.pointsEarned} points
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-2">
                          {task.reportUrl && (
                            <a
                              href={task.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
                            >
                              <FileText className="h-4 w-4" />
                              <span>View Report</span>
                            </a>
                          )}
                          {task.status === 'submitted' && (
                            <button
                              onClick={() => handleApproveTask(task._id)}
                              className="flex items-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Approve Task</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <CheckSquare className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">No volunteer tasks yet</p>
                  <p className="text-sm text-neutral-500 mt-2">
                    Tasks will appear here when assigned to volunteers
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Beneficiaries Tab */}
          {activeTab === 'beneficiaries' && (
            <div>
              <h2 className="section-title flex items-center space-x-2">
                <FileText className="h-6 w-6" />
                <span>Beneficiary Requests Management</span>
              </h2>
              {beneficiaryRequests.length > 0 ? (
                <div className="space-y-4">
                  {beneficiaryRequests.map((request) => (
                    <div key={request._id} className="card hover:shadow-lg transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row md:items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-neutral-900">
                              {request.campaignId?.title || 'Campaign'}
                            </h3>
                            <span className={`badge ${getStatusColor(request.status)}`}>
                              {request.status}
                            </span>
                          </div>
                          <p className="text-neutral-600 text-sm mb-2">{request.requestMessage}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                            <span>
                              Beneficiary: <span className="font-medium">{request.beneficiaryId?.name || 'N/A'}</span>
                            </span>
                            <span>Submitted: {formatDateTime(request.createdAt)}</span>
                            {request.reviewedAt && (
                              <span>Reviewed: {formatDateTime(request.reviewedAt)}</span>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-start md:items-center gap-2">
                          {request.documentUrl && (
                            <a
                              href={request.documentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 text-sm"
                            >
                              <FileText className="h-4 w-4" />
                              <span>View Document</span>
                            </a>
                          )}
                          {request.status === 'pending' && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleReviewRequest(request._id, 'approved')}
                                className="flex items-center space-x-1 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors duration-200 text-sm font-medium"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleReviewRequest(request._id, 'rejected')}
                                className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 text-sm font-medium"
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-12">
                  <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                  <p className="text-neutral-600">No beneficiary requests yet</p>
                  <p className="text-sm text-neutral-500 mt-2">
                    Requests will appear here when beneficiaries submit them
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Create Campaign Form Component
const CreateCampaignForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Education',
    targetAmount: '',
    deadline: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await campaignAPI.createCampaign(formData);
      alert('Campaign created successfully!');
      onSuccess();
    } catch (error) {
      alert('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-6 bg-primary-50">
      <h3 className="text-lg font-semibold mb-4">Create New Campaign</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="input-field"
            >
              <option>Education</option>
              <option>Healthcare</option>
              <option>Disaster Relief</option>
              <option>Community Welfare</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="input-field"
            rows="3"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Target Amount (₹)</label>
            <input
              type="number"
              value={formData.targetAmount}
              onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Deadline</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Creating...' : 'Create Campaign'}
          </button>
          <button type="button" onClick={onSuccess} className="btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// Create User Form Component
const CreateUserForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'donor',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userAPI.createUser(formData);
      alert('User created successfully!');
      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-6 bg-primary-50">
      <h3 className="text-lg font-semibold mb-4">Create New User</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-field"
              required
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field"
              required
              minLength="6"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="input-field"
            >
              <option value="donor">Donor</option>
              <option value="beneficiary">Beneficiary</option>
              <option value="volunteer">Volunteer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <div className="flex space-x-3">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Creating...' : 'Create User'}
          </button>
          <button type="button" onClick={onSuccess} className="btn-ghost">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDashboard;