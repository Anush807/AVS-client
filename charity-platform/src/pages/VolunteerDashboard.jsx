import { useState, useEffect } from 'react';
import { CheckSquare, Upload, Award, Star, Clock } from 'lucide-react';
import { volunteerAPI } from '../services/api';
import { formatDateTime, getBadgeClass } from '../utils/helpers';
import { useAuth } from '../contexts/AuthContext';
import Loading from '../components/Loading';

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Note: You'll need to add an endpoint to get volunteer's tasks
      // For demo purposes, using empty array
      setTasks([]);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const submittedTasks = tasks.filter(t => t.status === 'submitted');
  const approvedTasks = tasks.filter(t => t.status === 'approved');
  const totalPoints = user.points || 0;

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="page-header">Welcome, {user.name}!</h1>
          <p className="text-neutral-600">Complete tasks and earn points to level up</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-100 mb-1">Total Points</p>
                <p className="text-3xl font-bold">{totalPoints}</p>
              </div>
              <Star className="h-10 w-10 text-primary-200" fill="currentColor" />
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Pending Tasks</p>
                <p className="text-3xl font-bold text-yellow-600">{pendingTasks.length}</p>
              </div>
              <Clock className="h-10 w-10 text-yellow-600" />
            </div>
          </div>

          <div className="card hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-green-600">{approvedTasks.length}</p>
              </div>
              <CheckSquare className="h-10 w-10 text-green-600" />
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
        </div>

        {/* Progress to Next Badge */}
        <div className="card mb-8 bg-gradient-to-br from-purple-50 to-white border-2 border-purple-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Progress to Next Badge</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-700">Bronze Badge</span>
                <span className="text-sm font-semibold text-primary-600">
                  {totalPoints >= 100 ? '100%' : `${Math.min((totalPoints / 100) * 100, 100).toFixed(0)}%`}
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalPoints / 100) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-neutral-500 mt-1">100 points needed</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-700">Silver Badge</span>
                <span className="text-sm font-semibold text-primary-600">
                  {totalPoints >= 300 ? '100%' : `${Math.min((totalPoints / 300) * 100, 100).toFixed(0)}%`}
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-gray-300 to-gray-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalPoints / 300) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-neutral-500 mt-1">300 points needed</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-neutral-700">Gold Badge</span>
                <span className="text-sm font-semibold text-primary-600">
                  {totalPoints >= 600 ? '100%' : `${Math.min((totalPoints / 600) * 100, 100).toFixed(0)}%`}
                </span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((totalPoints / 600) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-neutral-500 mt-1">600 points needed</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-neutral-200">
          <div className="flex space-x-6">
            {['pending', 'submitted', 'approved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-2 font-medium transition-colors duration-200 border-b-2 capitalize ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {tab} ({tab === 'pending' ? pendingTasks.length : tab === 'submitted' ? submittedTasks.length : approvedTasks.length})
              </button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="animate-fade-in">
          {tasks.filter(t => t.status === activeTab).length > 0 ? (
            <div className="space-y-4">
              {tasks.filter(t => t.status === activeTab).map((task) => (
                <TaskCard key={task._id} task={task} onSubmit={fetchTasks} />
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <CheckSquare className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No {activeTab} tasks</p>
              {activeTab === 'pending' && (
                <p className="text-sm text-neutral-500 mt-2">
                  New tasks will appear here when assigned by the admin
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, onSubmit }) => {
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  return (
    <>
      <div className="card hover:shadow-lg transition-shadow duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-neutral-900">{task.title}</h3>
              <span className={`badge ${
                task.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                task.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                'bg-green-100 text-green-700'
              }`}>
                {task.status}
              </span>
            </div>
            <p className="text-neutral-600 text-sm mb-2">{task.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
              <span>Assigned: {formatDateTime(task.createdAt)}</span>
              {task.pointsEarned && (
                <span className="text-green-600 font-medium">
                  +{task.pointsEarned} points earned
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            {task.status === 'pending' && (
              <button
                onClick={() => setShowSubmitModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Upload className="h-5 w-5" />
                <span>Submit Report</span>
              </button>
            )}
            {task.reportUrl && (
              <a
                href={task.reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                <Upload className="h-5 w-5" />
                <span>View Report</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {showSubmitModal && (
        <SubmitReportModal
          task={task}
          onClose={() => setShowSubmitModal(false)}
          onSuccess={() => {
            setShowSubmitModal(false);
            onSubmit();
          }}
        />
      )}
    </>
  );
};

// Submit Report Modal Component
const SubmitReportModal = ({ task, onClose, onSuccess }) => {
  const [reportUrl, setReportUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await volunteerAPI.submitReport({
        taskId: task._id,
        reportUrl,
      });
      alert('Report submitted successfully! Waiting for admin approval.');
      onSuccess();
    } catch (error) {
      alert('Failed to submit report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 animate-scale-in">
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Submit Task Report</h2>
        <div className="mb-4">
          <h3 className="font-semibold text-neutral-900">{task.title}</h3>
          <p className="text-sm text-neutral-600">{task.description}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Report URL
            </label>
            <div className="flex items-center space-x-2">
              <Upload className="h-5 w-5 text-neutral-400" />
              <input
                type="url"
                value={reportUrl}
                onChange={(e) => setReportUrl(e.target.value)}
                className="input-field"
                placeholder="https://example.com/report.pdf"
                required
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Upload your task report/documentation to cloud storage and paste the link here
            </p>
          </div>

          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3">
            <p className="text-sm text-primary-900">
              Your report will be reviewed by the admin. Points will be awarded upon approval.
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Submitting...' : 'Submit Report'}
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

export default VolunteerDashboard;
