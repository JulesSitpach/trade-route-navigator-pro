import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { useTariffData } from "./tariff/useTariffData";
import TariffInsights from "./tariff/TariffInsights";
import { createAxisTitle, getChartMargins, getTariffColor } from "@/utils/chartUtils";
import { useChartResponsiveStyles } from "@/hooks/use-chart-responsive-styles";
import { TariffTooltip } from './tariff/TariffTooltip';
import { TariffAxisTick } from './tariff/TariffAxisTick';
import TariffLegend from './tariff/TariffLegend';

const TariffHeatmap = () => {
  const { tariffData } = useTariffData();
  const margins = getChartMargins('scatter');
  const chartStyles = useChartResponsiveStyles();

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
                      tick={(props) => <TariffAxisTick x={props.x} y={props.y} payload={props.payload} />}
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
                    <Tooltip content={<TariffTooltip />} 
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
                          r={Math.sqrt(entry.volume) / 3}
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
