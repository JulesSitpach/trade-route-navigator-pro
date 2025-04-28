
import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Label
} from "recharts";
import { cursorStyles, tooltipStyles } from "@/components/ui/chart/theme/commonStyles";
import { calculateBubbleSize } from "@/utils/chartUtils";
import { TariffTooltip } from "./TariffTooltip";
import { useLanguage } from '@/contexts/LanguageContext';

interface TariffData {
  country: string;
  tariffRate: number;
  productCategory: string;
  volume: number;
}

interface TariffScatterChartProps {
  data: TariffData[];
  getTariffColor: (rate: number) => string;
}

const TariffScatterChart: React.FC<TariffScatterChartProps> = ({ data, getTariffColor }) => {
  const { language } = useLanguage();
  
  // Extract volumes for bubble sizing calculation
  const volumes = data.map(item => item.volume);
  
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 60,
            left: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis 
            type="category" 
            dataKey="country" 
            name="Country" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            interval={0}
            angle={-45}
            textAnchor="end"
            height={80}
          >
            <Label 
              value={language === 'en' ? "Country" : "País"} 
              position="insideBottom" 
              offset={-15}
              style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="tariffRate"
            name="Tariff Rate (%)"
            domain={[0, 'dataMax + 2']}
            axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            tickLine={{ stroke: '#9ca3af' }}
            tick={{ fontSize: 12 }}
          >
            <Label 
              value={language === 'en' ? "Tariff Rate (%)" : "Tasa Arancelaria (%)"} 
              position="insideLeft" 
              angle={-90}
              style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
              offset={-20}
            />
          </YAxis>
          <Tooltip 
            content={<TariffTooltip />}
            cursor={cursorStyles.scatter}
          />
          <Scatter name="Tariff Rates" data={data} fill="#8884d8">
            {data.map((entry, index) => {
              const color = getTariffColor(entry.tariffRate);
              const size = calculateBubbleSize(entry.volume, volumes, { minRadius: 8, maxRadius: 25 });
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={color}
                  fillOpacity={0.7}
                  stroke={color}
                  strokeWidth={1}
                  r={size}
                />
              );
            })}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TariffScatterChart;
