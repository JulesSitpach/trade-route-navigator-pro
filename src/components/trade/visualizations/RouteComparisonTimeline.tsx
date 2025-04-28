
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Legend, Tooltip, ResponsiveContainer, Label 
} from 'recharts';
import { chartCommonConfig } from "@/utils/chartUtils";
import { RouteComparisonTooltip } from './RouteComparisonTooltip';
import { BarChartIcon, InfoIcon } from "lucide-react";
import { chartConfig } from "./chartConfig";
import { tooltipStyles, cursorStyles } from "@/components/ui/chart/theme/commonStyles";
import { RouteComparisonTimelineProps } from './types/visualizationTypes';
import { useLanguage } from "@/contexts/LanguageContext";

const RouteComparisonTimeline = ({ routes }: RouteComparisonTimelineProps) => {
  const { language, t } = useLanguage();
  
  const routeData = routes.map(route => {
    // Ensure all required properties have default values
    const name = route.name || route.path.split(' → ')[0] + ' to ' + route.path.split(' → ').pop();
    const customsClearance = route.customsClearance || 4;
    const localDelivery = route.localDelivery || 3;
    
    return {
      name: name,
      shipping: route.transitTime,
      customs: customsClearance,
      distribution: localDelivery,
      cost: `$${route.cost.toLocaleString()}`,
      totalDays: (route.transitTime + customsClearance + localDelivery)
    };
  });

  // Sort routes by total transit time for better comparison
  const sortedRouteData = [...routeData].sort((a, b) => a.totalDays - b.totalDays);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <BarChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Route Comparison Timeline' : 'Línea de Tiempo de Comparación de Rutas'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {language === 'en' 
          ? 'Compare transit times across different shipping routes and methods' 
          : 'Compare tiempos de tránsito entre diferentes rutas y métodos de envío'
        }
      </p>
      
      <Card>
        <CardContent className="p-6">
          {sortedRouteData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {language === 'en' 
                ? 'No route comparison data available' 
                : 'No hay datos de comparación de rutas disponibles'
              }
            </div>
          ) : (
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sortedRouteData}
                  margin={{
                    top: 20,
                    right: 30,
                    bottom: 60,
                    left: 20,
                  }}
                  barSize={32}
                  barGap={4}
                >
                  <CartesianGrid 
                    strokeDasharray="4 4"
                    stroke="#e5e7eb"
                    opacity={0.5}
                    vertical={false}
                  />
                  <Legend 
                    layout="horizontal"
                    verticalAlign="top"
                    align="center"
                    wrapperStyle={{
                      paddingBottom: '20px',
                      display: 'flex',
                      justifyContent: 'center',
                      fontSize: '12px'
                    }}
                  />
                  <XAxis 
                    dataKey="name"
                    tick={{
                      fontSize: 12,
                      fill: '#4b5563', 
                      width: 100,
                      angle: -30, 
                      textAnchor: 'end'
                    }}
                    axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                    tickLine={false}
                    height={60}
                  >
                    <Label 
                      value={language === 'en' ? "Shipping Routes" : "Rutas de Envío"} 
                      position="insideBottom" 
                      style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
                      offset={-15}
                    />
                  </XAxis>
                  <YAxis 
                    tickLine={false}
                    axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
                    tick={{
                      fontSize: 12,
                      fill: '#4b5563'
                    }}
                  >
                    <Label 
                      value={language === 'en' ? "Transit Days" : "Días de Tránsito"} 
                      angle={-90} 
                      position="insideLeft" 
                      style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
                      offset={-10}
                    />
                  </YAxis>
                  <Tooltip 
                    content={<RouteComparisonTooltip />}
                    cursor={cursorStyles.bar}
                  />
                  <Bar 
                    dataKey="shipping" 
                    stackId="a" 
                    name={language === 'en' ? "Shipping" : "Envío"}
                    fill={chartConfig.primaryRoute.color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="customs" 
                    stackId="a" 
                    name={language === 'en' ? "Customs" : "Aduana"}
                    fill={chartConfig.customs.color}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar 
                    dataKey="distribution" 
                    stackId="a" 
                    name={language === 'en' ? "Distribution" : "Distribución"}
                    fill={chartConfig.lastMile.color}
                    radius={[0, 0, 4, 4]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          
          {sortedRouteData.length > 0 && (
            <div className="mt-4 p-3 bg-slate-50 rounded border text-xs text-gray-600 flex items-start gap-2">
              <InfoIcon className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <div>
                {language === 'en' 
                  ? 'Routes are sorted by total transit time. Hover over each segment to view detailed breakdown. For full route details, visit the Routes tab.'
                  : 'Las rutas están ordenadas por tiempo total de tránsito. Coloque el cursor sobre cada segmento para ver el desglose detallado. Para detalles completos de rutas, visite la pestaña Rutas.'
                }
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteComparisonTimeline;
