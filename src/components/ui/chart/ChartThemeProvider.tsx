
import React, { createContext, useContext, ReactNode, useState, useMemo } from 'react';
import { chartTheme, lightTheme, darkTheme } from './chartTheme';
import { enhancedColors } from '@/utils/chart/enhancedColors';
import { ChartStyleEnforcer } from './ChartStyleEnforcer';

// Define the shape of our chart theme context
export interface ChartThemeContextType {
  theme: typeof lightTheme;
  colors: typeof enhancedColors;
  updateTheme: (newTheme: Partial<typeof lightTheme>) => void;
  toggleMode: () => void;
  mode: 'light' | 'dark';
}

// Create the context
export const ChartThemeContext = createContext<ChartThemeContextType | undefined>(undefined);

// Custom hook to use the chart theme
export const useChartTheme = () => {
  const context = useContext(ChartThemeContext);
  if (!context) {
    throw new Error('useChartTheme must be used within a ChartThemeProvider');
  }
  return context;
};

interface ChartThemeProviderProps {
  children: ReactNode;
  initialMode?: 'light' | 'dark';
}

export const ChartThemeProvider: React.FC<ChartThemeProviderProps> = ({ 
  children, 
  initialMode = 'light' 
}) => {
  const [mode, setMode] = useState<'light' | 'dark'>(initialMode);
  
  // Select the appropriate theme based on mode
  const currentTheme = mode === 'dark' ? darkTheme : lightTheme;
  
  // Toggle between light and dark mode
  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  // Update theme with partial theme object
  const updateTheme = (newTheme: Partial<typeof lightTheme>) => {
    // This would be implemented if we wanted to support dynamic theme updates
    console.log('Theme update requested', newTheme);
    // For now, we're not implementing dynamic theme updates as it's beyond the scope
  };
  
  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme: currentTheme,
    colors: enhancedColors,
    updateTheme,
    toggleMode,
    mode
  }), [currentTheme, mode]);
  
  return (
    <ChartThemeContext.Provider value={contextValue}>
      <ChartStyleEnforcer>
        {children}
      </ChartStyleEnforcer>
    </ChartThemeContext.Provider>
  );
};
