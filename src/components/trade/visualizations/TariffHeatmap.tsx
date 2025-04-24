
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";
import { useTariffData } from "./tariff/useTariffData";
import TariffInsights from "./tariff/TariffInsights";
import { createAxisTitle, getChartMargins } from "@/utils/chartUtils";
import { chartCommonConfig } from "@/utils/chartUtils";
import { useChartResponsiveStyles } from "@/hooks/use-chart-responsive-styles";

const CustomTooltipContent = (props: any) => {
  const { active, payload } = props;
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg text-gray-800">
        <div className="font-medium mb-2 border-b pb-1">{data.country}</div>
        <div className="flex items-center mb-1">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: getTariffColor(data.tariffRate) }}></div>
          <span className="font-medium">Tariff Rate: </span>
          <span className="ml-1">{data.tariffRate}%</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium">Trade Volume: </span>
          <span className="ml-1">${(data.volume).toLocaleString()}</span>
        </div>
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
        dx={-15}
        textAnchor="end" 
        fill="#64748b"
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
  const margins = useMemo(() => getChartMargins('scatter'), []);
  const chartStyles = useChartResponsiveStyles();
  
  const calculateBubbleSize = useMemo(() => (volume: number): number => {
    const minVolume = Math.min(...tariffData.map(d => d.volume));
    const maxVolume = Math.max(...tariffData.map(d => d.volume));
    
    // Adjusted radius values for better visual balance
    const minRadius = 4;
    const maxRadius = 15;
    
    if (minVolume === maxVolume) return (minRadius + maxRadius) / 2;
    
    const scale = (volume - minVolume) / (maxVolume - minVolume);
    return minRadius + scale * (maxRadius - minRadius);
  }, [tariffData]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tariff Heatmap Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Visualize tariff rates across different countries and identify opportunities for tariff optimization
        </p>
      </div>
      
      <Card className="overflow-hidden border-border/50">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-6 px-6 py-3 rounded-lg border border-border/50 bg-muted/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Low Tariff (0-5%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <span className="text-sm">Medium Tariff (6-15%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-sm">High Tariff (&gt;15%)</span>
              </div>
            </div>
          </div>

          <div className="h-[550px]">
            <ChartContainer 
              config={chartConfig}
              height={550}
              title="Country Tariff Comparison"
              subtitle="Bubble size represents trade volume - larger bubbles indicate higher volume"
            >
              <ScatterChart margin={margins}>
                <CartesianGrid className="stroke-border/40" strokeDasharray="5 5" opacity={0.8} />
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
                    fill: '#64748b',
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
                <Tooltip 
                  content={<CustomTooltipContent />} 
                  cursor={{ 
                    strokeDasharray: '3 3',
                    stroke: '#64748b',
                    strokeOpacity: 0.7
                  }} 
                />
                <Scatter 
                  data={tariffData} 
                  name="Countries"
                  isAnimationActive={false} 
                >
                  {tariffData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getTariffColor(entry.tariffRate)}
                      stroke="#fff"
                      strokeWidth={0.5}
                      r={calculateBubbleSize(entry.volume)}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
