export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(0)}K`;
  }
  return num.toString();
};

export const formatCurrency = (value: number, currency: string = '₦'): string => {
  if (value >= 1000000) {
    return `${currency}${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${currency}${(value / 1000).toFixed(0)}K`;
  }
  return `${currency}${value.toFixed(2)}`;
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value}%`;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};


export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'ready':
      return 'bg-green-100 text-green-800';
    case 'in progress':
      return 'bg-amber-100 text-amber-800';
    case 'acknowledged':
      return 'bg-blue-100 text-blue-800';
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getCardStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'ready':
      return 'border-[1px] border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]';
    case 'in progress':
      return 'border-[1px] border-[#FEDF89] bg-[#FFFAEB] text-[#B54708]';
    case 'acknowledged':
      return 'border-[1px] border-[#B2DDFF] bg-[#EFF8FF] text-[#175CD3]';
    case 'pending':
      return 'border-[1px] border-[#EAECF0] bg-[#F9FAFB] text-[#344054]';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getChangeColor = (changeType: 'positive' | 'negative'): string => {
  return changeType === 'positive' ? 'text-[#29A174] bg-[#EFFAF6]' : 'text-[#FF4457] bg-red-100';
};

export const getChangeIcon = (changeType: 'positive' | 'negative'): string => {
  return changeType === 'positive' ? '↑' : '↓';
};