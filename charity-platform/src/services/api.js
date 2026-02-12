import axios from 'axios';

// Replace this with your actual backend URL
const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
};

// User APIs (Admin only)
export const userAPI = {
  getUsers: () => api.get('/users'),
  createUser: (userData) => api.post('/users/create', userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Campaign APIs
export const campaignAPI = {
  getCampaigns: () => api.get('/campaigns'),
  createCampaign: (campaignData) => api.post('/campaigns/create', campaignData),
  updateCampaign: (id, campaignData) => api.put(`/campaigns/${id}`, campaignData),
  deleteCampaign: (id) => api.delete(`/campaigns/${id}`),
};

// Donation APIs
export const donationAPI = {
  makeDonation: (donationData) => api.post('/donations', donationData),
  getMyDonations: () => api.get('/donations/my'),
  getAllDonations: () => api.get('/donations/all'),
  getReceipt: (id) => api.get(`/donations/receipt/${id}`),
};

// Beneficiary APIs
export const beneficiaryAPI = {
  submitRequest: (requestData) => api.post('/beneficiary/submit', requestData),
  getPendingRequests: () => api.get('/beneficiary/pending'),
  reviewRequest: (reviewData) => api.post('/beneficiary/review', reviewData),
};

// Volunteer APIs
export const volunteerAPI = {
  assignTask: (taskData) => api.post('/volunteer/assign', taskData),
  submitReport: (reportData) => api.post('/volunteer/submit', reportData),
  approveTask: (approvalData) => api.post('/volunteer/approve', approvalData),
};

// Dashboard APIs (Admin only)
export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getTopDonors: () => api.get('/dashboard/leaderboard'),
  getCampaignStats: () => api.get('/dashboard/campaign-stats'),
};
