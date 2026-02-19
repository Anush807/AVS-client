import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Filter } from 'lucide-react';
import { campaignAPI } from '../services/api';
import CampaignCard from '../components/CampaignCard';
import Loading from '../components/Loading';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Education', 'Healthcare', 'Disaster Relief', 'Environment', 'Poverty'];

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await campaignAPI.getCampaigns();
      setCampaigns(response.data || []);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || campaign.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <Loading />;

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
            Active Campaigns
          </h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Support causes that matter to you. Every contribution makes a difference.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full input-field pl-12"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-neutral-600 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-neutral-600">
            Showing <span className="font-semibold text-neutral-900">{filteredCampaigns.length}</span>{' '}
            {filteredCampaigns.length === 1 ? 'campaign' : 'campaigns'}
          </p>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
                onDonate={() => {
                  // Redirect to register/login
                  window.location.href = '/register';
                }}
              />
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-neutral-600 mb-4">No campaigns found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 card bg-gradient-to-br from-primary-500 to-primary-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Want to create your own campaign?</h2>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            Join as a beneficiary and submit your campaign for review
          </p>
          <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-primary-50">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;