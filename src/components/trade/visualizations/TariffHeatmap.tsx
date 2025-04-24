import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Tooltip } from "recharts";
import { chartConfig } from "./chartConfig";
import { useTariffData } from "./tariff/useTariffData";
import TariffInsights from "./tariff/TariffInsights";
import { createAxisTitle, getChartMargins } from "@/utils/chartUtils";
import { chartCommonConfig } from "@/utils/chartUtils";

const CustomTooltipContent = (props: any) => {
  const { active, payload } = props;
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-md shadow-md text-sm">
        <div className="font-medium mb-1">{data.country}</div>
        <div className="flex items-center mb-1">
          <div 
            className="w-3 h-3 rounded-full mr-2" 
            style={{ backgroundColor: getTariffColor(data.tariffRate) }}
          />
          <span>Tariff Rate: {data.tariffRate}%</span>
        </div>
        <div>Volume: {data.volume.toLocaleString()}</div>
      </div>
    );
  }
  
  return null;
};

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        dx={-20}
        textAnchor="end" 
        fill="#666"
        fontSize={12}
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const TARIFF_COLORS = {
  low: "#10b981",    // Green color for low tariffs
  medium: "#f59e0b", // Amber color for medium tariffs
  high: "#ef4444"    // Red color for high tariffs
};

const getTariffColor = (tariffRate: number): string => {
  if (tariffRate <= 5) return TARIFF_COLORS.low;
  if (tariffRate <= 15) return TARIFF_COLORS.medium;
  return TARIFF_COLORS.high;
};

const TariffHeatmap = () => {
  const { tariffData } = useTariffData();
  const margins = getChartMargins('scatter');
  
  const calculateBubbleSize = (volume: number): number => {
    const minVolume = Math.min(...tariffData.map(d => d.volume));
    const maxVolume = Math.max(...tariffData.map(d => d.volume));
    
    const minRadius = 5;
    const maxRadius = 20;
    
    if (minVolume === maxVolume) return (minRadius + maxRadius) / 2;
    
    const scale = (volume - minVolume) / (maxVolume - minVolume);
    return minRadius + scale * (maxRadius - minRadius);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tariff Heatmap Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Visualize tariff rates across different countries and identify opportunities for tariff optimization
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[600px]">
            <ChartContainer 
              config={chartConfig}
              height={600}
              title="Country Tariff Comparison"
              subtitle="Bubble size represents trade volume - larger bubbles indicate higher volume"
            >
              <ScatterChart margin={margins}>
                <CartesianGrid className="stroke-border/50" strokeDasharray="4 4" />
                <XAxis 
                  type="category"
                  dataKey="country"
                  name="Country"
                  tick={<CustomXAxisTick />} 
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  height={80}
                  interval={0}
                  label={createAxisTitle('Countries', 'x', { 
                    offset: -5,
                    position: 'insideBottom'
                  })}
                  padding={{ left: 30, right: 30 }}
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate"
                  tick={{
                    fontSize: 12,
                    dx: -10,
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  domain={[0, 'dataMax + 5']}
                  label={createAxisTitle('Tariff Rate (%)', 'y', { 
                    offset: -45, 
                    position: 'insideLeft',
                    angle: -90
                  })}
                  tickFormatter={(value) => `${value}%`}
                  width={65}
                  padding={{ top: 20, bottom: 20 }}
                />
                <Tooltip content={<CustomTooltipContent />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={tariffData} name="Countries">
                  {tariffData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getTariffColor(entry.tariffRate)}
                      stroke={getTariffColor(entry.tariffRate)}
                      strokeWidth={1}
                      r={calculateBubbleSize(entry.volume)}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
          
          <div className="flex justify-center mt-4">
            <div className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-md shadow-md text-sm">
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: TARIFF_COLORS.low }} />
                <span>Low Tariff (0-5%)</span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: TARIFF_COLORS.medium }} />
                <span>Medium Tariff (6-15%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: TARIFF_COLORS.high }} />
                <span>High Tariff ({'>'}15%)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
