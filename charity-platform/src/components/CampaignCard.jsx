import { Calendar, Target, TrendingUp } from 'lucide-react';
import { formatCurrency, calculateProgress } from '../utils/helpers';

const CampaignCard = ({ campaign, onDonate }) => {
  const progress = calculateProgress(campaign.collectedAmount, campaign.targetAmount);

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300 group">
      <div className="flex flex-col h-full">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-3">
          <span className="badge bg-primary-100 text-primary-700 border-primary-200">
            {campaign.category}
          </span>
          <span className={`badge ${campaign.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
            {campaign.status}
          </span>
        </div>

        {/* Title and description */}
        <h3 className="text-xl font-semibold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
          {campaign.title}
        </h3>
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2 flex-grow">
          {campaign.description}
        </p>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-neutral-700">Progress</span>
            <span className="text-sm font-semibold text-primary-600">{progress.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-start space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-xs text-neutral-500">Collected</p>
              <p className="text-sm font-semibold text-neutral-900">
                {formatCurrency(campaign.collectedAmount || 0)}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Target className="h-5 w-5 text-primary-600 mt-0.5" />
            <div>
              <p className="text-xs text-neutral-500">Target</p>
              <p className="text-sm font-semibold text-neutral-900">
                {formatCurrency(campaign.targetAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Deadline */}
        {campaign.deadline && (
          <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-4">
            <Calendar className="h-4 w-4" />
            <span>Ends: {new Date(campaign.deadline).toLocaleDateString()}</span>
          </div>
        )}

        {/* Donate button */}
        {onDonate && campaign.status === 'active' && (
          <button
            onClick={() => onDonate(campaign)}
            className="w-full btn-primary mt-auto"
          >
            Donate Now
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignCard;
