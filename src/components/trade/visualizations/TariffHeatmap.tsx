
import React, { useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { useTariffData } from "./tariff/useTariffData";
import TariffInsights from "./tariff/TariffInsights";
import { createAxisTitle, getChartMargins } from "@/utils/chartUtils";
import { chartCommonConfig } from "@/utils/chartUtils";
import { useChartResponsiveStyles } from "@/hooks/use-chart-responsive-styles";
import { Badge } from "@/components/ui/badge";
import TariffLegend from './tariff/TariffLegend';

const CustomTooltipContent = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const tariffColor = getTariffColor(data.tariffRate);
    
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
        <div className="font-semibold text-base border-b border-gray-100 pb-2 mb-2 text-gray-800">
          {data.country}
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Tariff Rate:</span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium" 
              style={{ 
                backgroundColor: `${tariffColor}15`, 
                color: tariffColor,
                borderColor: `${tariffColor}30`
              }}
            >
              {data.tariffRate}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Trade Volume:</span>
            <span className="font-medium text-sm text-gray-700">
              ${Number(data.volume).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="font-medium text-sm text-gray-700">
              {data.productCategory}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = (props) => {
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

const getTariffColor = (tariffRate) => {
  if (tariffRate <= 5) return TARIFF_COLORS.low;
  if (tariffRate <= 15) return TARIFF_COLORS.medium;
  return TARIFF_COLORS.high;
};

const TariffHeatmap = () => {
  const { tariffData } = useTariffData();
  const margins = useMemo(() => getChartMargins('scatter'), []);
  const chartStyles = useChartResponsiveStyles();
  
  const calculateBubbleSize = useMemo(() => (volume) => {
    const minVolume = Math.min(...tariffData.map(d => d.volume));
    const maxVolume = Math.max(...tariffData.map(d => d.volume));
    
    const minRadius = 5;
    const maxRadius = 20;
    
    if (minVolume === maxVolume) return (minRadius + maxRadius) / 2;
    
    const scale = (volume - minVolume) / (maxVolume - minVolume);
    return minRadius + scale * (maxRadius - minRadius);
  }, [tariffData]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-gray-800">Global Tariff Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Interactive visualization of tariff rates across different countries and trade volumes
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="overflow-hidden border shadow-sm">
            <CardContent className="p-6">
              <div className="h-[550px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={margins}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#e2e8f0" 
                      vertical={true} 
                      horizontal={true} 
                    />
                    <XAxis 
                      type="category"
                      dataKey="country"
                      name="Country"
                      tick={<CustomXAxisTick />}
                      axisLine={{ stroke: '#e2e8f0' }}
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
                      axisLine={{ stroke: '#e2e8f0' }}
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
                    <ZAxis 
                      type="number" 
                      dataKey="volume" 
                      range={[50, 500]} 
                      name="Trade Volume" 
                    />
                    <Tooltip 
                      content={<CustomTooltipContent />}
                      cursor={{ 
                        stroke: '#64748b',
                        strokeDasharray: '3 3',
                        strokeOpacity: 0.5
                      }} 
                    />
                    <Scatter 
                      data={tariffData} 
                      isAnimationActive={false}
                    >
                      {tariffData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getTariffColor(entry.tariffRate)}
                          style={{
                            filter: 'drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.1))'
                          }}
                          stroke="#ffffff"
                          strokeWidth={1}
                          r={calculateBubbleSize(entry.volume)}
                        />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <TariffLegend />
        </div>
      </div>

      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
