
import * as React from "react"
import { chartTheme } from "./chartTheme"
import { ChartConfig, ExtendedChartConfig } from "./types"

interface ChartContextType {
  theme: typeof chartTheme;
  updateTheme: (newTheme: Partial<typeof chartTheme>) => void;
  config: ChartConfig | ExtendedChartConfig;
}

const ChartContext = React.createContext<ChartContextType | null>(null)

export const ChartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [theme, setTheme] = React.useState(chartTheme);
  
  const updateTheme = (newTheme: Partial<typeof chartTheme>) => {
    setTheme({
      ...theme,
      ...newTheme,
    });
  };
  
  return (
    <ChartContext.Provider value={{ theme, updateTheme, config: {} }}>
      {children}
    </ChartContext.Provider>
  );
};

export function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartProvider />")
  }

  return context
}

export function useChartTheme() {
  const context = useChart();
  return { theme: context.theme, updateTheme: context.updateTheme };
}

export { ChartContext }
