
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
  const { t } = useLanguage();
  
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  const data = payload[0]?.payload;
  const total = payload.reduce((sum, entry) => sum + entry.value, 0);
  
  // Translate entry names using t function
  const getTranslatedName = (name: string): string => {
    const translationKeys: Record<string, string> = {
      'Shipping': 'tooltip.shipping',
      'Customs': 'tooltip.customs',
      'Distribution': 'tooltip.distribution',
      'Processing': 'tooltip.processing',
      'Documentation': 'tooltip.documentation',
      'Handling': 'tooltip.handling'
    };
    
    return translationKeys[name] ? t(translationKeys[name], name) : name;
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
              {entry.value} {t('common.days', 'days')}
            </Badge>
          </div>
        ))}
        <div style={{ ...tooltipStyles.row, marginTop: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '8px' }}>
          <span className="font-medium">
            {t('common.total', 'Total')}:
          </span>
          <Badge variant="outline" className="ml-2 font-medium text-xs bg-gray-50">
            {total} {t('common.days', 'days')}
          </Badge>
        </div>
      </div>
    </div>
  );
};
