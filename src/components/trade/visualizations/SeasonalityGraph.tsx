
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';
import { ChartContainer } from "@/components/ui/chart";
import { LineChartIcon, AlertCircleIcon } from "lucide-react";
import { useSeasonalityData } from "./seasonality/useSeasonalityData";
import { useLanguage } from '@/contexts/LanguageContext';
import { SeasonalityTooltip } from "./seasonality/SeasonalityTooltip";
import { chartConfig } from "./chartConfig";
import { cursorStyles } from "@/components/ui/chart/theme/commonStyles";
import { enhancedColors } from '@/utils/chart/enhancedColors';

const SeasonalityGraph = () => {
  const { seasonalityData, loading, error } = useSeasonalityData();
  const { t, language } = useLanguage();

  // Format data to ensure consistent month names and values
  const enhancedData = seasonalityData.map(item => ({
    ...item,
    month: language === 'en' ? item.month : 
      item.month.replace('Jan', 'Ene')
               .replace('Apr', 'Abr')
               .replace('Aug', 'Ago')
               .replace('Dec', 'Dic')
  }));

  // Custom distinct colors for better visibility
  const lineColors = {
    freight: enhancedColors.blue,    // Bright Blue
    congestion: enhancedColors.orange, // Orange
    risk: enhancedColors.red        // Red
  };

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
            <div className="text-center text-red-500 py-12 flex flex-col items-center gap-2">
              <AlertCircleIcon className="h-6 w-6" />
              <span>{error}</span>
            </div>
          ) : enhancedData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {t('seasonality.no.data')}
            </div>
          ) : (
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={enhancedData}
                  margin={{ top: 20, right: 30, bottom: 60, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                    tickLine={{ stroke: '#9ca3af' }}
                  >
                    <Label 
                      value={language === 'en' ? "Month" : "Mes"} 
                      position="insideBottom" 
                      offset={-5}
                      style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
                    />
                  </XAxis>
                  <YAxis 
                    yAxisId="left"
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                    tickLine={{ stroke: '#9ca3af' }}
                  >
                    <Label 
                      value={language === 'en' ? "Freight Cost Index" : "Índice de Costo de Flete"} 
                      position="insideLeft" 
                      angle={-90}
                      style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
                      offset={-5}
                    />
                  </YAxis>
                  <YAxis 
                    yAxisId="right" 
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                    tickLine={{ stroke: '#9ca3af' }}
                  >
                    <Label 
                      value={language === 'en' ? "Percentage (%)" : "Porcentaje (%)"} 
                      position="insideRight" 
                      angle={-90}
                      style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
                      offset={15}
                    />
                  </YAxis>
                  <Tooltip 
                    content={<SeasonalityTooltip />}
                    cursor={cursorStyles.line}
                  />
                  <Legend 
                    verticalAlign="top"
                    align="center"
                    height={36}
                    wrapperStyle={{
                      paddingBottom: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    yAxisId="left" 
                    type="monotone" 
                    dataKey="freight" 
                    stroke={lineColors.freight} 
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} 
                    name={language === 'en' ? "Freight" : "Flete"}
                    strokeWidth={3}
                    dot={{ strokeWidth: 2, r: 4, fill: '#fff', stroke: lineColors.freight }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="congestion" 
                    stroke={lineColors.congestion} 
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} 
                    name={language === 'en' ? "Congestion" : "Congestión"}
                    strokeWidth={3}
                    dot={{ strokeWidth: 2, r: 4, fill: '#fff', stroke: lineColors.congestion }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="risk" 
                    stroke={lineColors.risk} 
                    activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }} 
                    name={language === 'en' ? "Risk" : "Riesgo"}
                    strokeWidth={3}
                    dot={{ strokeWidth: 2, r: 4, fill: '#fff', stroke: lineColors.risk }}
                    strokeDasharray="5 5"  // Make this line dashed for better distinction
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {enhancedData.length > 0 && (
        <div className="text-sm mt-6 p-4 border rounded-md bg-slate-50">
          <p className="font-medium mb-2">
            {t('seasonality.key.factors')}
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
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
