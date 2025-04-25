
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  Label
} from 'recharts';
import { RiskMatrixTooltip } from './risk/RiskMatrixTooltip';

const RiskAssessmentMatrix = () => {
  const { t } = useLanguage();
  const [activeRiskType, setActiveRiskType] = useState<string | null>(null);

  // Enhanced risk data for different routes with more details
  const riskData = [
    { name: 'Sea Route A', x: 5000, y: 3, z: 92, label: 'Port Delays', riskLevel: 'low', details: 'Low risk of port congestion at both ends' },
    { name: 'Sea Route B', x: 4800, y: 5, z: 85, label: 'Weather Disruption', riskLevel: 'medium', details: 'Moderate risk due to seasonal weather patterns' },
    { name: 'Air Route A', x: 9500, y: 2, z: 95, label: 'Capacity Constraints', riskLevel: 'low', details: 'Reliable capacity with minor seasonal fluctuations' },
    { name: 'Air Route B', x: 8900, y: 4, z: 88, label: 'Fuel Price Volatility', riskLevel: 'medium', details: 'Moderate exposure to fuel price changes' },
    { name: 'Multimodal A', x: 6200, y: 7, z: 75, label: 'Border Closures', riskLevel: 'high', details: 'High risk due to multiple border crossings' },
    { name: 'Rail Route', x: 5400, y: 6, z: 78, label: 'Infrastructure Issues', riskLevel: 'medium', details: 'Occasional infrastructure maintenance delays' }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#ccc";
    }
  };

  const filterData = (data: typeof riskData) => {
    if (!activeRiskType) return data;
    return data.filter(item => item.riskLevel === activeRiskType);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-medium">
          {t('risk.assessment.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('risk.assessment.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-end mb-4 gap-3">
            <div className="flex items-center space-x-1">
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{t('risk.matrix.help')}</span>
            </div>
          </div>

          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 60, left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Cost" 
                  unit="$" 
                  domain={['dataMin - 500', 'dataMax + 500']}
                  tickFormatter={(value) => `$${value}`}
                >
                  <Label value={t('risk.cost')} position="bottom" offset={20} />
                </XAxis>
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Risk Level" 
                  unit="/10"
                  domain={[0, 10]}
                  tickCount={6}
                >
                  <Label value={t('risk.level')} angle={-90} position="left" offset={-20} />
                </YAxis>
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[60, 400]} 
                  name="Reliability" 
                  unit="%" 
                />
                <Tooltip content={<RiskMatrixTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value, entry) => <span className="text-sm font-medium">{value}</span>} 
                />
                <Scatter name={t('risk.routes')} data={filterData(riskData)}>
                  {
                    riskData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getRiskColor(entry.riskLevel)} 
                        stroke={getRiskColor(entry.riskLevel)}
                        strokeWidth={1}
                      />
                    ))
                  }
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button 
              onClick={() => setActiveRiskType(activeRiskType === 'high' ? null : 'high')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${activeRiskType === 'high' ? 'bg-red-100' : 'hover:bg-gray-100'}`}
            >
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">{t('risk.high')}</span>
            </button>
            <button 
              onClick={() => setActiveRiskType(activeRiskType === 'medium' ? null : 'medium')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${activeRiskType === 'medium' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}
            >
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm">{t('risk.medium')}</span>
            </button>
            <button 
              onClick={() => setActiveRiskType(activeRiskType === 'low' ? null : 'low')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${activeRiskType === 'low' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
            >
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">{t('risk.low')}</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentMatrix;
