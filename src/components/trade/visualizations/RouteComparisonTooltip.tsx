
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { tooltipStyles } from "@/components/ui/chart/theme/commonStyles";
import { useLanguage } from '@/contexts/LanguageContext';
import { enhancedColors } from '@/utils/chartUtils';

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
    <div style={{
      ...tooltipStyles.wrapper,
      backgroundColor: '#FFFFFF',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '12px 16px',
      minWidth: '220px',
    }}>
      <div style={{
        ...tooltipStyles.title,
        fontSize: '14px',
        fontWeight: 600,
        color: '#2C3E50',
        marginBottom: '8px',
        borderBottom: '1px solid #ECF0F1',
        paddingBottom: '6px',
      }}>
        {data?.fullRoute || label}
      </div>
      <div className="space-y-2" style={tooltipStyles.content}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={{
            ...tooltipStyles.row, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '6px',
          }}>
            <span style={{ fontSize: '12px', color: entry.fill }}>{getTranslatedName(entry.name)}:</span>
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
        <div style={{ 
          ...tooltipStyles.row, 
          marginTop: '8px', 
          borderTop: '1px solid #f3f4f6', 
          paddingTop: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span className="font-medium" style={{ fontSize: '13px', color: '#2C3E50' }}>
            {t('common.total', 'Total')}:
          </span>
          <Badge variant="outline" className="ml-2 font-medium text-xs bg-gray-50">
            {total} {t('common.days', 'days')}
          </Badge>
        </div>
        
        {data?.cost && (
          <div style={{ 
            ...tooltipStyles.row, 
            marginTop: '4px',
            paddingTop: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span className="font-medium" style={{ fontSize: '13px', color: '#2C3E50' }}>
              {t('common.cost', 'Cost')}:
            </span>
            <Badge variant="outline" className="ml-2 font-medium text-xs" style={{
              backgroundColor: `${enhancedColors.orange}15`,
              color: enhancedColors.orange,
              borderColor: `${enhancedColors.orange}30`
            }}>
              {data.cost}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
};
