
import { ChartColors } from './types';

export const lightColors: ChartColors = {
  primary: '#3498DB',      // Teal Blue
  secondary: '#F39C12',    // Warning Amber
  tertiary: '#27AE60',     // Success Green
  quaternary: '#9B59B6',   // Purple
  background: '#FFFFFF',   // White
  text: '#2C3E50',         // Navy Blue
  grid: '#ECF0F1',         // Light Gray
  accent: [
    '#3498DB',  // Teal Blue - Import/Export
    '#F39C12',  // Warning Amber - Documentation
    '#27AE60',  // Success Green - Insurance
    '#E74C3C',  // Error Red - Freight/Shipping
    '#9B59B6',  // Purple - Customs/Regulatory
    '#16A085',  // Dark Teal - Transportation
    '#D35400',  // Dark Orange - Warehousing
    '#8E44AD',  // Dark Purple - Taxes/Fees
  ],
  tariff: {
    low: '#27AE60',      // Success Green
    medium: '#F39C12',   // Warning Amber
    high: '#E74C3C',     // Error Red
  },
  risk: {
    low: '#27AE60',      // Success Green
    medium: '#F39C12',   // Warning Amber
    high: '#E74C3C',     // Error Red
    critical: '#B03A2E', // Darker Error Red
  },
  lines: {
    freight: '#F44336',  // Red - Freight Cost
    cost: '#FF9800',     // Orange - Customs
    risk: '#E74C3C',     // Error Red
  },
  categories: {
    shipping: '#7C4DFF',     // Purple - Shipping/Transit
    customs: '#FF9800',      // Orange - Customs
    distribution: '#FFC107', // Yellow - Distribution
    importDuty: '#03A9F4',   // Light Blue - Import Duty
    freight: '#F44336',      // Red - Freight Cost
    insurance: '#4CAF50',    // Green - Insurance
    documentation: '#FFB300', // Amber - Documentation
    warehousing: '#795548',   // Brown - Warehousing
  }
};

export const darkColors: ChartColors = {
  ...lightColors,
  background: '#2C3E50',   // Navy Blue
  text: '#FFFFFF',         // White
  grid: '#7F8C8D',         // Dark Gray
  accent: [
    '#3498DB',  // Teal Blue - Import/Export
    '#F39C12',  // Warning Amber - Documentation
    '#27AE60',  // Success Green - Insurance
    '#E74C3C',  // Error Red - Freight/Shipping
    '#9B59B6',  // Purple - Customs/Regulatory
    '#16A085',  // Dark Teal - Transportation
    '#D35400',  // Dark Orange - Warehousing
    '#8E44AD',  // Dark Purple - Taxes/Fees
  ],
};
