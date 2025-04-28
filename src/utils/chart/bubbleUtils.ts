
/**
 * Calculate bubble size for scatter plots based on value range
 */
export const calculateBubbleSize = (
  value: number, 
  allValues: number[], 
  options?: { 
    minRadius?: number; 
    maxRadius?: number; 
  }
): number => {
  const minRadius = options?.minRadius ?? 5;
  const maxRadius = options?.maxRadius ?? 20;
  
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  
  if (minValue === maxValue) return (minRadius + maxRadius) / 2;
  
  const scale = (value - minValue) / (maxValue - minValue);
  return minRadius + scale * (maxRadius - minRadius);
};
