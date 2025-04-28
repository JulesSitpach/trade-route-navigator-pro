
import { enhancedColors } from './enhancedColors';

/**
 * Get color based on value thresholds (e.g., low/medium/high risk)
 */
export const getColorByThreshold = (
  value: number, 
  thresholds: { low: number; medium: number; high: number; }
): string => {
  if (value <= thresholds.low) return enhancedColors.green;
  if (value <= thresholds.medium) return enhancedColors.orange;
  if (value <= thresholds.high) return enhancedColors.red;
  return "#B03A2E"; // Darker Red
};

/**
 * Get color for tariff rate
 */
export const getTariffColor = (tariffRate: number): string => {
  if (tariffRate <= 5) return enhancedColors.green;
  if (tariffRate <= 15) return enhancedColors.orange;
  return enhancedColors.red;
};

/**
 * Get color for specific category
 */
export const getCategoryColor = (category: string): string => {
  // Default colors for common categories with the enhanced color palette
  switch(category.toLowerCase()) {
    case 'shipping':
    case 'transit':
    case 'freight':
      return enhancedColors.blue; 
    case 'customs':
      return enhancedColors.purple;
    case 'distribution':
    case 'lastmile':
      return enhancedColors.green;
    case 'import duty':
    case 'duty':
      return enhancedColors.teal;
    case 'insurance':
      return enhancedColors.turquoise;
    case 'documentation':
      return enhancedColors.orange;
    case 'warehousing':
    case 'warehouse':
      return enhancedColors.darkOrange;
    case 'handling':
      return enhancedColors.teal;
    case 'compliance':
      return enhancedColors.darkPurple;
    case 'risk':
      return enhancedColors.red;
    default:
      return enhancedColors.blue;
  }
};
