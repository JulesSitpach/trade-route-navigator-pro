
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

export const generateYAxisTicks = (maxValue: number, tickCount: number = 5): number[] => {
  const roundToNearestNice = (value: number): number => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
    const normalized = value / magnitude;
    
    if (normalized < 1.5) return magnitude;
    if (normalized < 3) return 2 * magnitude;
    if (normalized < 7) return 5 * magnitude;
    return 10 * magnitude;
  };
  
  const tickInterval = roundToNearestNice(maxValue / (tickCount - 1));
  const ticks = [];
  
  for (let i = 0; i < tickCount; i++) {
    ticks.push(i * tickInterval);
  }
  
  return ticks;
};
