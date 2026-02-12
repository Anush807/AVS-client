import { useState, useEffect } from 'react';
import { FileText, Send, Clock, CheckCircle, XCircle, Upload } from 'lucide-react';
import { beneficiaryAPI, campaignAPI } from '../services/api';
import { formatDateTime, getStatusColor } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

const BeneficiaryDashboard = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestModal, setShowRequestModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const campaignsRes = await campaignAPI.getCampaigns();
      setCampaigns(campaignsRes.data);
      // Note: You'll need to add an endpoint to get beneficiary's own requests
      // For now, we'll use an empty array
      setMyRequests([]);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  const pendingRequests = myRequests.filter(r => r.status === 'pending').length;
  const approvedRequests = myRequests.filter(r => r.status === 'approved').length;
  const rejectedRequests = myRequests.filter(r => r.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-header">Welcome, {user.name}!</h1>
          <p className="text-neutral-600">Submit support requests and track your applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-600" />
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedRequests}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Rejected</p>
                <p className="text-3xl font-bold text-red-600">{rejectedRequests}</p>
              </div>
              <XCircle className="h-10 w-10 text-red-600" />
            </div>
          </div>
        </div>

        {/* Submit Request Section */}
        <div className="mb-8">
          <div className="card bg-gradient-to-br from-primary-50 to-white border-2 border-primary-200">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">Need Support?</h3>
                <p className="text-neutral-600">Submit a request for assistance from our active campaigns</p>
              </div>
              <button
                onClick={() => setShowRequestModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Submit Request</span>
              </button>
            </div>
          </div>
        </div>

        {/* My Requests */}
        <div>
          <h2 className="section-title flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span>My Requests</span>
          </h2>

          {myRequests.length > 0 ? (
            <div className="space-y-4">
              {myRequests.map((request) => (
                <div key={request._id} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
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
                        <span>Submitted: {formatDateTime(request.createdAt)}</span>
                        {request.reviewedAt && (
                          <span>Reviewed: {formatDateTime(request.reviewedAt)}</span>
                        )}
                      </div>
                    </div>
                    {request.documentUrl && (
                      <a
                        href={request.documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 md:mt-0 text-primary-600 hover:text-primary-700 flex items-center space-x-1"
                      >
                        <FileText className="h-5 w-5" />
                        <span>View Document</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600 mb-4">No requests submitted yet</p>
              <button
                onClick={() => setShowRequestModal(true)}
                className="btn-primary"
              >
                Submit Your First Request
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <RequestModal
          campaigns={campaigns}
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => {
            fetchData();
            setShowRequestModal(false);
          }}
        />
      )}
    </div>
  );
};

// Request Modal Component
const RequestModal = ({ campaigns, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    campaignId: '',
    requestMessage: '',
    documentUrl: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await beneficiaryAPI.submitRequest(formData);
      alert('Request submitted successfully! We will review it soon.');
      onSuccess();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto animate-scale-in">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Submit Support Request</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Select Campaign
            </label>
            <select
              value={formData.campaignId}
              onChange={(e) => setFormData({ ...formData, campaignId: e.target.value })}
              className="input-field"
              required
            >
              <option value="">Choose a campaign...</option>
              {campaigns.map((campaign) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.title} - {campaign.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Request Message
            </label>
            <textarea
              value={formData.requestMessage}
              onChange={(e) => setFormData({ ...formData, requestMessage: e.target.value })}
              className="input-field"
              rows="5"
              placeholder="Describe your situation and why you need support..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Supporting Document URL (optional)
            </label>
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-neutral-400" />
              <input
                type="url"
                value={formData.documentUrl}
                onChange={(e) => setFormData({ ...formData, documentUrl: e.target.value })}
                className="input-field"
                placeholder="https://example.com/document.pdf"
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Upload your verification documents to cloud storage and paste the link here
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <h4 className="font-semibold text-primary-900 mb-2">Important Notes:</h4>
            <ul className="text-sm text-primary-800 space-y-1 list-disc list-inside">
              <li>Your request will be reviewed by our admin team</li>
              <li>Provide accurate information and valid documents</li>
              <li>You'll be notified once your request is reviewed</li>
            </ul>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Submitting...' : 'Submit Request'}
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

export default BeneficiaryDashboard;
