
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
    freight: '#3498DB',  // Teal Blue
    cost: '#F39C12',     // Warning Amber
    risk: '#E74C3C',     // Error Red
  },
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
