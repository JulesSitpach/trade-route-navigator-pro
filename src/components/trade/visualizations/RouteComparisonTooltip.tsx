
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { tooltipStyles } from "@/components/ui/chart/theme/commonStyles";
import { useLanguage } from '@/contexts/LanguageContext';

interface RouteComparisonTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const RouteComparisonTooltip: React.FC<RouteComparisonTooltipProps> = ({ active, payload, label }) => {
  const { language, t } = useLanguage();
  
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  const data = payload[0]?.payload;
  const total = payload.reduce((sum, entry) => sum + entry.value, 0);
  
  // Translate entry names if needed
  const getTranslatedName = (name: string): string => {
    if (language === 'en') return name;
    
    const translations: Record<string, string> = {
      'Shipping': 'Envío',
      'Customs': 'Aduanas',
      'Distribution': 'Distribución',
      'Processing': 'Procesamiento',
      'Documentation': 'Documentación',
      'Handling': 'Manipulación'
    };
    
    return translations[name] || name;
  };
  
  return (
    <div style={tooltipStyles.wrapper}>
      <div style={tooltipStyles.title}>
        {data?.fullRoute || label}
      </div>
      <div className="space-y-1" style={tooltipStyles.content}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={tooltipStyles.row}>
            <span>{getTranslatedName(entry.name)}:</span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${entry.fill}15`, 
                color: entry.fill,
                borderColor: `${entry.fill}30`
              }}
            >
              {entry.value} {language === 'en' ? 'days' : 'días'}
            </Badge>
          </div>
        ))}
        <div style={{ ...tooltipStyles.row, marginTop: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '8px' }}>
          <span className="font-medium">
            {language === 'en' ? 'Total:' : 'Total:'}
          </span>
          <Badge variant="outline" className="ml-2 font-medium text-xs bg-gray-50">
            {total} {language === 'en' ? 'days' : 'días'}
          </Badge>
        </div>
      </div>
    </div>
  );
};
