
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { getTariffColor } from "@/utils/chartUtils";
import { useLanguage } from '@/contexts/LanguageContext';

interface TariffTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const TariffTooltip: React.FC<TariffTooltipProps> = ({ active, payload }) => {
  const { language } = useLanguage();
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const tariffColor = getTariffColor(data.tariffRate);
    
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 max-w-[250px]">
        <div className="font-semibold text-sm text-gray-800 mb-2 border-b border-gray-100 pb-1">
          {data.country}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Tariff Rate:' : 'Tasa Arancelaria:'}
            </span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs" 
              style={{ 
                backgroundColor: `${tariffColor}15`, 
                color: tariffColor,
                borderColor: `${tariffColor}30`
              }}
            >
              {data.tariffRate}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Trade Volume:' : 'Volumen Comercial:'}
            </span>
            <span className="font-medium text-xs text-gray-800">
              ${Number(data.volume).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Category:' : 'Categoría:'}
            </span>
            <span className="font-medium text-xs text-gray-800">
              {data.productCategory}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
