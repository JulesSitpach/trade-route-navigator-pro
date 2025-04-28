
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
      ...(overrides && typeof overrides === 'object' && 'colors' in overrides ? overrides.colors : {})
    }
  });
  
  // Function to update specific config parts
  const updateConfig = useCallback((newOverrides: any) => {
    setOverrides(prev => {
      // Create safe nested updates to handle potentially missing properties
      const prevColors = prev && typeof prev === 'object' && 'colors' in prev ? prev.colors : {};
      const prevTypography = prev && typeof prev === 'object' && 'typography' in prev ? prev.typography : {};
      const prevTypographyFontSize = prevTypography && typeof prevTypography === 'object' && 'fontSize' in prevTypography ? prevTypography.fontSize : {};
      
      const newColors = newOverrides && typeof newOverrides === 'object' && 'colors' in newOverrides ? newOverrides.colors : {};
      const newTypography = newOverrides && typeof newOverrides === 'object' && 'typography' in newOverrides ? newOverrides.typography : {};
      const newTypographyFontSize = newTypography && typeof newTypography === 'object' && 'fontSize' in newTypography ? newTypography.fontSize : {};

      return {
        ...prev,
        ...newOverrides,
        // Handle nested updates properly
        colors: {
          ...prevColors,
          ...newColors
        },
        typography: {
          ...prevTypography,
          ...newTypography,
          fontSize: {
            ...prevTypographyFontSize,
            ...newTypographyFontSize
          }
        }
      };
    });
  }, []);
  
  // Reset to defaults with only theme adjustments
  const resetConfig = useCallback(() => {
    setOverrides({});
  }, []);
  
  // Get a specific chart type config
  const getChartTypeConfig = useCallback((chartType: 'pie' | 'bar' | 'line' | 'area') => {
    let baseConfig;
    switch (chartType) {
      case 'pie':
        baseConfig = pieChartConfig;
        break;
      case 'bar':
        baseConfig = barChartConfig;
        break;
      case 'line':
        baseConfig = lineChartConfig;
        break;
      case 'area':
        baseConfig = areaChartConfig;
        break;
      default:
        baseConfig = defaultChartConfig;
    }
    
    return createChartConfig({
      ...baseConfig,
      ...overrides
    });
  }, [overrides]);
  
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
