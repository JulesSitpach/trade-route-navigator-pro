
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
        case "high": return "#E74C3C";    // Error Red
        case "medium": return "#F39C12";  // Warning Amber
        case "low": return "#27AE60";     // Success Green
        default: return "#BDC3C7";        // Mid Gray
      }
    };

    const riskColor = getRiskColor(data.riskLevel);
    
    return (
      <div className="bg-white border border-[#BDC3C7] rounded-md shadow-sm p-3 max-w-[250px]">
        <div className="font-semibold text-sm text-[#2C3E50] mb-2 border-b border-[#ECF0F1] pb-1">
          {data.label}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#7F8C8D]">
              {language === 'en' ? 'Route:' : 'Ruta:'}
            </span>
            <span className="font-medium text-xs text-[#2C3E50]">
              {data.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#7F8C8D]">
              {language === 'en' ? 'Cost:' : 'Costo:'}
            </span>
            <span className="font-medium text-xs text-[#2C3E50]">
              ${data.x.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#7F8C8D]">
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
            <span className="text-xs text-[#7F8C8D]">
              {language === 'en' ? 'Reliability:' : 'Fiabilidad:'}
            </span>
            <span className="font-medium text-xs text-[#2C3E50]">
              {data.z}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
