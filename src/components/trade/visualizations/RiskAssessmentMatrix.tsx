
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon } from "lucide-react";
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
  Cell
} from 'recharts';
import { RiskMatrixTooltip } from './risk/RiskMatrixTooltip';

const RiskAssessmentMatrix = () => {
  const { t } = useLanguage();

  // Sample risk data for different routes
  const riskData = [
    { name: 'Sea Route A', x: 5000, y: 3, z: 92, label: 'Port Delays', riskLevel: 'low' },
    { name: 'Sea Route B', x: 4800, y: 5, z: 85, label: 'Weather Disruption', riskLevel: 'medium' },
    { name: 'Air Route A', x: 9500, y: 2, z: 95, label: 'Capacity Constraints', riskLevel: 'low' },
    { name: 'Air Route B', x: 8900, y: 4, z: 88, label: 'Fuel Price Volatility', riskLevel: 'medium' },
    { name: 'Multimodal A', x: 6200, y: 7, z: 75, label: 'Border Closures', riskLevel: 'high' },
    { name: 'Rail Route', x: 5400, y: 6, z: 78, label: 'Infrastructure Issues', riskLevel: 'medium' }
  ];

  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#ccc";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {t('risk.assessment.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('risk.assessment.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Cost" 
                  unit="$" 
                  domain={['dataMin - 500', 'dataMax + 500']}
                  label={{ value: t('risk.cost'), position: 'bottom', offset: 0 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Risk Level" 
                  unit="/10"
                  domain={[0, 10]}
                  label={{ value: t('risk.level'), angle: -90, position: 'left' }}
                />
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[50, 400]} 
                  name="Reliability" 
                  unit="%" 
                />
                <Tooltip content={<RiskMatrixTooltip />} />
                <Legend />
                <Scatter name={t('risk.routes')} data={riskData}>
                  {
                    riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRiskColor(entry.riskLevel)} />
                    ))
                  }
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">{t('risk.high')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-sm">{t('risk.medium')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">{t('risk.low')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentMatrix;
