
import { useState, useCallback } from 'react';
import { 
  defaultChartConfig, 
  createChartConfig, 
  pieChartConfig, 
  barChartConfig, 
  lineChartConfig, 
  areaChartConfig 
} from '@/components/ui/chart/config';

type ChartTheme = 'light' | 'dark';

/**
 * Hook for accessing and potentially customizing chart configuration
 */
export const useChartConfig = (initialOverrides = {}, theme: ChartTheme = 'light') => {
  const [overrides, setOverrides] = useState(initialOverrides);
  
  // Create a config with current overrides applied
  const config = createChartConfig({
    ...defaultChartConfig,
    ...overrides,
    // Apply theme-specific adjustments
    colors: {
      ...defaultChartConfig.colors,
      ...(theme === 'dark' ? {
        background: '#1e293b', // Dark background
        gridLines: '#334155',  // Darker grid lines
        text: '#f1f5f9',       // Light text
        tooltipBackground: '#334155',
        tooltipText: '#f1f5f9',
        tooltipBorder: '#475569',
        axisColor: '#94a3b8'
      } : {}),
      ...(overrides.colors || {})
    }
  });
  
  // Function to update specific config parts
  const updateConfig = useCallback((newOverrides: any) => {
    setOverrides(prev => ({
      ...prev,
      ...newOverrides,
      // Handle nested updates properly
      colors: {
        ...(prev.colors || {}),
        ...(newOverrides.colors || {})
      },
      typography: {
        ...(prev.typography || {}),
        ...(newOverrides.typography || {}),
        fontSize: {
          ...((prev.typography && prev.typography.fontSize) || {}),
          ...((newOverrides.typography && newOverrides.typography.fontSize) || {})
        }
      }
    }));
  }, []);
  
  // Reset to defaults with only theme adjustments
  const resetConfig = useCallback(() => {
    setOverrides({});
  }, []);
  
  // Get a specific chart type config
  const getChartTypeConfig = useCallback((chartType: 'pie' | 'bar' | 'line' | 'area') => {
    switch (chartType) {
      case 'pie':
        return createChartConfig({
          ...pieChartConfig,
          ...overrides
        });
      case 'bar':
        return createChartConfig({
          ...barChartConfig,
          ...overrides
        });
      case 'line':
        return createChartConfig({
          ...lineChartConfig,
          ...overrides
        });
      case 'area':
        return createChartConfig({
          ...areaChartConfig,
          ...overrides
        });
      default:
        return config;
    }
  }, [config, overrides]);
  
  return {
    config,
    updateConfig,
    resetConfig,
    getChartTypeConfig,
    // Export key parts of the config directly for convenience
    colors: config.colors,
    typography: config.typography,
    spacing: config.spacing,
    animation: config.animation,
    formatters: config.formatters
  };
};

export default useChartConfig;
