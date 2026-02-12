// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format date and time
export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Get badge color class
export const getBadgeClass = (badge) => {
  switch (badge?.toLowerCase()) {
    case 'gold':
      return 'badge-gold';
    case 'silver':
      return 'badge-silver';
    case 'bronze':
      return 'badge-bronze';
    default:
      return 'badge-none';
  }
};

// Calculate progress percentage
export const calculateProgress = (collected, target) => {
  if (!target || target === 0) return 0;
  return Math.min((collected / target) * 100, 100);
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get status color
export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'approved':
    case 'success':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'pending':
    case 'submitted':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'rejected':
    case 'failed':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'inactive':
    case 'closed':
      return 'text-gray-600 bg-gray-50 border-gray-200';
    default:
      return 'text-neutral-600 bg-neutral-50 border-neutral-200';
  }
};

// Validate email
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Validate password (min 6 characters)
export const validatePassword = (password) => {
  return password && password.length >= 6;
};
