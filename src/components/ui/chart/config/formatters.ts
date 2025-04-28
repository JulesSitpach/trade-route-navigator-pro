
/**
 * Data formatters for chart values
 */

export const formatters = {
  // Format percentage values (e.g., 0.75 -> 75%)
  percentage: (value: number): string => {
    return `${Math.round(value * 100)}%`;
  },
  
  // Format currency values (e.g., 1000 -> $1,000)
  currency: (value: number, currency = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0
    }).format(value);
  },
  
  // Format large numbers with K, M abbreviations (e.g., 1500 -> 1.5K)
  shortNumber: (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  },
  
  // Format dates consistently
  date: (value: Date | number | string): string => {
    const date = new Date(value);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  },
  
  // Format durations (e.g., 25 -> 1d 1h)
  duration: (value: number): string => {
    if (value >= 24) {
      return `${Math.floor(value / 24)}d ${value % 24}h`;
    }
    return `${value}h`;
  }
};

export default formatters;
