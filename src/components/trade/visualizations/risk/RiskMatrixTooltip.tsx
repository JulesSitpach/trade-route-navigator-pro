
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface RiskMatrixTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const RiskMatrixTooltip: React.FC<RiskMatrixTooltipProps> = ({ active, payload }) => {
  const { language } = useLanguage();
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    const getRiskColor = (riskLevel: string) => {
      switch(riskLevel) {
        case "high": return "#ef4444";
        case "medium": return "#f59e0b";
        case "low": return "#10b981";
        default: return "#ccc";
      }
    };

    const riskColor = getRiskColor(data.riskLevel);
    
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 max-w-[250px]">
        <div className="font-semibold text-sm text-gray-800 mb-2 border-b border-gray-100 pb-1">
          {data.label}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Route:' : 'Ruta:'}
            </span>
            <span className="font-medium text-xs text-gray-800">
              {data.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Cost:' : 'Costo:'}
            </span>
            <span className="font-medium text-xs text-gray-800">
              ${data.x.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Risk Level:' : 'Nivel de Riesgo:'}
            </span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs" 
              style={{ 
                backgroundColor: `${riskColor}15`, 
                color: riskColor,
                borderColor: `${riskColor}30`
              }}
            >
              {data.y}/10
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Reliability:' : 'Fiabilidad:'}
            </span>
            <span className="font-medium text-xs text-gray-800">
              {data.z}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
