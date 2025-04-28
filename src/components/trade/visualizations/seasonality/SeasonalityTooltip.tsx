
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { tooltipStyles } from "@/components/ui/chart/theme/commonStyles";
import { useLanguage } from '@/contexts/LanguageContext';

interface SeasonalityTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const SeasonalityTooltip: React.FC<SeasonalityTooltipProps> = ({ active, payload }) => {
  const { language } = useLanguage();
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    // Translate month names if in Spanish
    const getTranslatedMonth = (month: string): string => {
      if (language === 'en') return month;
      
      const monthTranslations: Record<string, string> = {
        'January': 'Enero',
        'February': 'Febrero',
        'March': 'Marzo',
        'April': 'Abril',
        'May': 'Mayo',
        'June': 'Junio',
        'July': 'Julio',
        'August': 'Agosto',
        'September': 'Septiembre',
        'October': 'Octubre',
        'November': 'Noviembre',
        'December': 'Diciembre'
      };
      
      return monthTranslations[month] || month;
    };
    
    return (
      <div style={tooltipStyles.wrapper}>
        <div className="font-semibold text-sm text-gray-800 mb-2 border-b border-gray-100 pb-1">
          {getTranslatedMonth(data.month)}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Freight:' : 'Flete:'}
            </span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${'#3b82f6'}15`, 
                color: '#3b82f6',
                borderColor: `${('#3b82f6')}30`
              }}
            >
              {data.freight}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Congestion:' : 'Congestión:'}
            </span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${('#f59e0b')}15`, 
                color: '#f59e0b',
                borderColor: `${('#f59e0b')}30`
              }}
            >
              {data.congestion}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">
              {language === 'en' ? 'Risk:' : 'Riesgo:'}
            </span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${('#ef4444')}15`, 
                color: '#ef4444',
                borderColor: `${('#ef4444')}30`
              }}
            >
              {data.risk}%
            </Badge>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
