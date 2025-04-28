
import { useState } from 'react';

export interface RiskDataItem {
  name: string;
  x: number;
  y: number;
  z: number;
  label: string;
  riskLevel: string;
  details: string;
}

export const useRiskData = () => {
  const [activeRiskType, setActiveRiskType] = useState<string | null>(null);
  
  // Mock risk data for different routes with more details
  const riskData: RiskDataItem[] = [
    { name: 'Sea Route A', x: 5000, y: 3, z: 92, label: 'Port Delays', riskLevel: 'low', details: 'Low risk of port congestion at both ends' },
    { name: 'Sea Route B', x: 4800, y: 5, z: 85, label: 'Weather Disruption', riskLevel: 'medium', details: 'Moderate risk due to seasonal weather patterns' },
    { name: 'Air Route A', x: 9500, y: 2, z: 95, label: 'Capacity Constraints', riskLevel: 'low', details: 'Reliable capacity with minor seasonal fluctuations' },
    { name: 'Air Route B', x: 8900, y: 4, z: 88, label: 'Fuel Price Volatility', riskLevel: 'medium', details: 'Moderate exposure to fuel price changes' },
    { name: 'Multimodal A', x: 6200, y: 7, z: 75, label: 'Border Closures', riskLevel: 'high', details: 'High risk due to multiple border crossings' },
    { name: 'Rail Route', x: 5400, y: 6, z: 78, label: 'Infrastructure Issues', riskLevel: 'medium', details: 'Occasional infrastructure maintenance delays' }
  ];
  
  return {
    riskData,
    activeRiskType,
    setActiveRiskType
  };
};
