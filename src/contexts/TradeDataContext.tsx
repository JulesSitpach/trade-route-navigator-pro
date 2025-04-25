
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { CostBreakdownInput, CostItem } from '@/components/trade/data/types/costTypes';
import { generateCostItems, calculateTotalCost } from '@/components/trade/data/costData';

interface TradeDataContextType {
  costItems: CostItem[];
  updateCostData: (data: CostBreakdownInput) => void;
  totalLandedCost: number;
}

const TradeDataContext = createContext<TradeDataContextType | undefined>(undefined);

export const TradeDataProvider = ({ children }: { children: ReactNode }) => {
  const [costItems, setCostItems] = useState<CostItem[]>([]);
  const [totalLandedCost, setTotalLandedCost] = useState(0);

  const updateCostData = (data: CostBreakdownInput) => {
    const items = generateCostItems(data);
    setCostItems(items);
    setTotalLandedCost(calculateTotalCost(items));
  };

  return (
    <TradeDataContext.Provider value={{ costItems, updateCostData, totalLandedCost }}>
      {children}
    </TradeDataContext.Provider>
  );
};

export const useTradeData = () => {
  const context = useContext(TradeDataContext);
  if (context === undefined) {
    throw new Error('useTradeData must be used within a TradeDataProvider');
  }
  return context;
};
