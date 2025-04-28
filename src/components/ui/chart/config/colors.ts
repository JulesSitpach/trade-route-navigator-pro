
/**
 * Color configuration for chart components
 */

// Primary color palette (for main data series)
export const primaryColors = [
  '#4a8cca', // Blue
  '#e97a32', // Orange
  '#5bae6a', // Green
  '#cb4b4b', // Red
  '#9b5dc4', // Purple
  '#d9803f', // Amber
  '#4db1b1', // Teal
  '#7a7a7a', // Gray
  '#d0ba39', // Yellow
  '#677ce0'  // Indigo
];

// Categorical color palette (for categorical data)
export const categoricalColors = [
  '#4a8cca', // Blue
  '#e97a32', // Orange
  '#5bae6a', // Green
  '#cb4b4b', // Red
  '#9b5dc4', // Purple
  '#d9803f', // Amber
  '#4db1b1', // Teal
  '#7a7a7a', // Gray
  '#d0ba39', // Yellow
  '#677ce0'  // Indigo
];

// Sequential color palette (for continuous data)
export const sequentialColors = [
  '#deedf7', // Lightest Blue
  '#c5dfef', 
  '#9cc7e1', 
  '#73aed2', 
  '#4a95c4', 
  '#2a75ad', 
  '#0d5696', 
  '#003b80'  // Darkest Blue
];

// UI Element colors
export const uiColors = {
  background: '#FFFFFF',
  gridLines: '#E0E0E0',
  text: '#333333',
  tooltipBackground: '#FFFFFF',
  tooltipText: '#333333',
  tooltipBorder: '#E0E0E0',
  axisColor: '#666666'
};

// Helper function to get color by index
export const getColorByIndex = (index: number, type: 'primary' | 'categorical' | 'sequential' = 'primary'): string => {
  const colorArray = type === 'primary' 
    ? primaryColors 
    : type === 'categorical' 
      ? categoricalColors 
      : sequentialColors;
      
  return colorArray[index % colorArray.length];
};
