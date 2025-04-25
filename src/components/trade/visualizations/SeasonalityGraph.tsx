
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SeasonalityChart } from "@/components/ui/chart";
import { LineChartIcon } from "lucide-react";
import { useSeasonalityData } from "./seasonality/useSeasonalityData";
import { useLanguage } from '@/contexts/LanguageContext';

const SeasonalityGraph = () => {
  const { seasonalityData, loading, error } = useSeasonalityData();
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LineChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {t('seasonality.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('seasonality.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center text-muted-foreground py-12">
              {t('seasonality.loading')}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              {error}
            </div>
          ) : seasonalityData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {t('seasonality.no.data')}
            </div>
          ) : (
            <SeasonalityChart 
              data={seasonalityData}
              title={t('seasonality.chart.title')}
              subtitle={t('seasonality.chart.subtitle')}
              legendProps={{
                verticalAlign: "top",
                align: "center",
                wrapperStyle: {
                  paddingBottom: '20px',
                  display: 'flex',
                  justifyContent: 'center'
                }
              }}
            />
          )}
        </CardContent>
      </Card>

      {seasonalityData.length > 0 && (
        <div className="text-sm mt-6">
          <p className="font-medium mb-2">
            {t('seasonality.key.factors')}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>{t('seasonality.factor.q4')}</li>
            <li>{t('seasonality.factor.chinese.new.year')}</li>
            <li>{t('seasonality.factor.summer')}</li>
            <li>{t('seasonality.factor.q2')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeasonalityGraph;
