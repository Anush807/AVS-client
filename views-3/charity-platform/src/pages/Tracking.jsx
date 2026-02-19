import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, DollarSign, Calendar, CheckCircle, ArrowLeft, BarChart3 } from 'lucide-react';

const Tracking = () => {
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  // Mock tracking data
  const mockTracking = {
    donationId: 'DON-2024-001',
    amount: 5000,
    campaign: 'Education for All',
    date: '2024-02-15',
    status: 'Completed',
    impact: {
      studentsHelped: 25,
      booksProvided: 150,
      schoolsSupported: 3,
    },
    timeline: [
      { date: '2024-02-15', status: 'Donation Received', completed: true },
      { date: '2024-02-16', status: 'Funds Allocated', completed: true },
      { date: '2024-02-18', status: 'Resources Purchased', completed: true },
      { date: '2024-02-20', status: 'Distribution Started', completed: true },
      { date: '2024-02-25', status: 'Impact Report Generated', completed: false },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (trackingId.trim()) {
      // Simulate search
      setTimeout(() => {
        setSearchResult(mockTracking);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-4">
            Track Your Donation
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Monitor the real-time progress and impact of your contributions
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="card">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your donation ID (e.g., DON-2024-001)"
                  className="input-field pl-10"
                />
              </div>
              <button type="submit" className="btn-primary px-8">
                Track
              </button>
            </div>
            <p className="text-sm text-neutral-500 mt-3">
              Find your donation ID in your email receipt or dashboard
            </p>
          </form>
        </div>

        {/* Results */}
        {searchResult && (
          <div className="space-y-6 animate-fade-in">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-primary-100">Donation Amount</span>
                  <DollarSign className="h-8 w-8 text-primary-200" />
                </div>
                <p className="text-3xl font-bold">₹{searchResult.amount.toLocaleString()}</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-600">Campaign</span>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xl font-bold text-neutral-900">{searchResult.campaign}</p>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neutral-600">Status</span>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-xl font-bold text-green-600">{searchResult.status}</p>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="card">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="h-6 w-6 text-primary-600" />
                <span>Your Impact</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    {searchResult.impact.studentsHelped}
                  </p>
                  <p className="text-neutral-700">Students Helped</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <p className="text-4xl font-bold text-green-600 mb-2">
                    {searchResult.impact.booksProvided}
                  </p>
                  <p className="text-neutral-700">Books Provided</p>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <p className="text-4xl font-bold text-purple-600 mb-2">
                    {searchResult.impact.schoolsSupported}
                  </p>
                  <p className="text-neutral-700">Schools Supported</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-primary-600" />
                <span>Donation Timeline</span>
              </h2>
              <div className="space-y-4">
                {searchResult.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        event.completed
                          ? 'bg-green-100 text-green-600'
                          : 'bg-neutral-200 text-neutral-400'
                      }`}
                    >
                      {event.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-neutral-400"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-semibold ${
                            event.completed ? 'text-neutral-900' : 'text-neutral-500'
                          }`}
                        >
                          {event.status}
                        </h3>
                        <span className="text-sm text-neutral-500">{event.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="card bg-primary-50 border-2 border-primary-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                    Want to make more impact?
                  </h3>
                  <p className="text-neutral-600">
                    Your donation is making a real difference. Consider donating again!
                  </p>
                </div>
                <Link to="/register" className="btn-primary whitespace-nowrap">
                  Donate Again
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Info Section (No results yet) */}
        {!searchResult && (
          <div className="max-w-4xl mx-auto">
            <div className="card bg-gradient-to-br from-primary-50 to-white">
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">How Tracking Works</h2>
              <div className="space-y-4 text-neutral-700">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Real-Time Updates</p>
                    <p className="text-sm text-neutral-600">
                      Track your donation from receipt to final impact
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Impact Metrics</p>
                    <p className="text-sm text-neutral-600">
                      See exactly how your donation is making a difference
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Complete Transparency</p>
                    <p className="text-sm text-neutral-600">
                      View detailed timeline of fund utilization
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;