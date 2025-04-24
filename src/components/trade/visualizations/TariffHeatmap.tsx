
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { useTariffData } from "./tariff/useTariffData";
import { createAxisTitle } from "@/utils/chartUtils";
import { useChartResponsiveStyles } from "@/hooks/use-chart-responsive-styles";
import { TariffTooltip } from './tariff/TariffTooltip';
import { TariffAxisTick } from './tariff/TariffAxisTick';

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();
  const margins = { top: 30, right: 20, bottom: 60, left: 60 };
  const chartStyles = useChartResponsiveStyles();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Global Tariff Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Interactive visualization of tariff rates across different countries and trade volumes
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {tariffData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No tariff data available
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm mr-2 bg-green-500"></div>
                    <span className="text-sm">Low Tariff (0-5%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm mr-2 bg-amber-500"></div>
                    <span className="text-sm">Medium Tariff (6-15%)</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm mr-2 bg-red-500"></div>
                    <span className="text-sm">High Tariff (&gt;15%)</span>
                  </div>
                </div>
              </div>

              <div className="h-[500px]">
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
                      tick={TariffAxisTick}
                      tickLine={false}
                      axisLine={false}
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
                      content={<TariffTooltip />}
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
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TariffHeatmap;
