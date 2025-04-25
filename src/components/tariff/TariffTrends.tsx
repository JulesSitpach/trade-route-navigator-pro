
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useLanguage } from '@/contexts/LanguageContext';

interface TariffTrendsProps {
  historicalData: Array<{
    year: string;
    rate: number;
    projected?: boolean;
  }>;
}

export const TariffTrends = ({ historicalData }: TariffTrendsProps) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Historical Tariff Rates & Projections" : "Tasas Arancelarias Históricas y Proyecciones"}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ChartContainer
          config={{
            rate: {
              label: language === 'en' ? "Rate %" : "Tasa %",
              color: "#8B5CF6"
            }
          }}
        >
          <LineChart data={historicalData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis domain={[0, 40]} />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, props) => {
                    const item = props.payload;
                    return [
                      `${value}%${item.projected ? (language === 'en' ? ' (Projected)' : ' (Proyectado)') : ''}`,
                      language === 'en' ? "Tariff Rate" : "Tasa Arancelaria"
                    ];
                  }}
                />
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="rate"
              name={language === 'en' ? "Tariff Rate %" : "Tasa Arancelaria %"}
              stroke="var(--color-rate)"
              strokeWidth={2}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
