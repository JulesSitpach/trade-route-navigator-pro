
import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

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
  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid />
          <XAxis 
            type="category" 
            dataKey="country" 
            name="Country" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            type="number"
            dataKey="tariffRate"
            name="Tariff Rate (%)"
            label={{ 
              value: 'Tariff Rate (%)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip 
            formatter={(value, name, props) => {
              if (name === "tariffRate") return [`${value}%`, "Tariff Rate"];
              if (name === "volume") return [`$${value}k`, "Trade Volume"];
              return [value, name];
            }}
            labelFormatter={(value) => `Country: ${value}`}
            cursor={{ 
              strokeDasharray: '3 3',
              fill: 'transparent',
              stroke: '#e5e7eb'
            }}
          />
          <Scatter name="Tariff Rates" data={data} fill="#8884d8">
            {data.map((entry, index) => {
              const color = getTariffColor(entry.tariffRate);
              return (
                <Cell 
                  key={`cell-${index}`} 
                  fill={color}
                  // Add the fill property to the payload for the tooltip to use
                  data-fill={color}
                  radius={Math.sqrt(entry.volume) / 2}
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
