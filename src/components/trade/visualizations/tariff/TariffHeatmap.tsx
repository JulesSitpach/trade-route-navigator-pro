
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { useTariffData } from './useTariffData';
import TariffScatterChart from './TariffScatterChart';
import TariffInsights from './TariffInsights';
import { TableIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Visualization card with chart and insights in vertical layout */}
      <Card className="border shadow-sm">
        <CardContent className="p-6 space-y-8">
          {/* Chart section */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TableIcon className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">
                {t('tariffheatmap.title')}
              </h3>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              {t('tariffheatmap.description')}
            </p>
            
            <TariffScatterChart data={tariffData} getTariffColor={getTariffColor} />
          </div>
          
          {/* Key insights section - now below the chart */}
          <div>
            <h3 className="text-base font-medium mb-4">
              {language === 'en' ? 'Key Insights' : 'Información Clave'}
            </h3>
            <TariffInsights />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TariffHeatmap;
