
import { ChartColors } from './types';

export const lightColors: ChartColors = {
  primary: '#4f46e5',      // Indigo
  secondary: '#f59e0b',    // Amber
  tertiary: '#10b981',     // Emerald
  quaternary: '#ec4899',   // Pink
  background: '#ffffff',   // White
  text: '#374151',         // Gray 700
  grid: '#e5e7eb',         // Gray 200
  accent: [
    '#4f46e5',  // Indigo
    '#f59e0b',  // Amber
    '#10b981',  // Emerald
    '#ec4899',  // Pink
    '#ef4444',  // Red
    '#8b5cf6',  // Purple
    '#3b82f6',  // Blue
    '#f97316',  // Orange
  ],
  tariff: {
    low: '#10b981',      // Emerald (green)
    medium: '#f59e0b',   // Amber (yellow)
    high: '#ef4444',     // Red
  },
  risk: {
    low: '#10b981',      // Emerald (green)
    medium: '#f59e0b',   // Amber (yellow)
    high: '#ef4444',     // Red
    critical: '#b91c1c',  // Dark red
  },
  lines: {
    freight: '#3b82f6',  // Blue
    cost: '#f59e0b',     // Amber
    risk: '#ef4444',     // Red
  },
};

export const darkColors: ChartColors = {
  ...lightColors,
  background: '#1f2937',   // Gray 800
  text: '#f3f4f6',         // Gray 100
  grid: '#374151',         // Gray 700
  accent: [
    '#6366f1',  // Lighter Indigo
    '#fbbf24',  // Lighter Amber
    '#34d399',  // Lighter Emerald
    '#f472b6',  // Lighter Pink
    '#f87171',  // Lighter Red
    '#a78bfa',  // Lighter Purple
    '#60a5fa',  // Lighter Blue
    '#fb923c',  // Lighter Orange
  ],
};
