
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useLanguage } from '@/contexts/LanguageContext';

interface CountryComparisonProps {
  countryComparisonData: Array<{
    country: string;
    rate: number;
  }>;
}

export const CountryComparison = ({ countryComparisonData }: CountryComparisonProps) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'en' ? "Country Rate Comparison" : "Comparación de Tasas por País"}</CardTitle>
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
          <BarChart data={countryComparisonData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="country" />
            <YAxis />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => [`${value}%`, language === 'en' ? "Tariff Rate" : "Tasa Arancelaria"]}
                />
              }
            />
            <Legend />
            <Bar dataKey="rate" name={language === 'en' ? "Tariff Rate %" : "Tasa Arancelaria %"} fill="var(--color-rate)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
