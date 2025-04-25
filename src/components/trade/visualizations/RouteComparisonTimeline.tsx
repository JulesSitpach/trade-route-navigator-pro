
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Legend, Tooltip, ResponsiveContainer 
} from 'recharts';
import { chartCommonConfig } from "@/utils/chartUtils";
import { RouteComparisonTooltip } from './RouteComparisonTooltip';
import { Route } from '../types';
import { BarChartIcon } from "lucide-react";
import { chartConfig } from "./chartConfig";
import { tooltipStyles, cursorStyles } from "@/components/ui/chart/theme/commonStyles";

interface RouteComparisonTimelineProps {
  routes: Route[];
}

const RouteComparisonTimeline = ({ routes }: RouteComparisonTimelineProps) => {
  const routeData = routes.map(route => ({
    name: route.name,
    shipping: route.transitTime,
    customs: route.customsClearance || 4,
    distribution: route.localDelivery || 3,
    cost: `$${route.cost.toLocaleString()}`,
    totalDays: (route.transitTime + (route.customsClearance || 4) + (route.localDelivery || 3))
  }));

  return (
    <div className="space-y-4">
      {routeData.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No route comparison data available
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <BarChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Route Comparison Timeline</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Compare transit times across different shipping routes and methods
      </p>
      
      <Card>
        <CardContent className="p-6">
          {routeData.length > 0 ? (
            <div className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={routeData}
                  margin={chartCommonConfig.margins.default}
                  barSize={32}
                >
                  <CartesianGrid 
                    strokeDasharray="4 4"
                    stroke="#e0e0e0"
                    opacity={0.3}
                    vertical={false}
                  />
                  <Legend 
                    layout="horizontal"
                    verticalAlign="top"
                    align="center"
                    wrapperStyle={{
                      paddingBottom: '20px',
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  />
                  <XAxis 
                    dataKey="name"
                    tick={chartCommonConfig.axis.tick}
                    axisLine={chartCommonConfig.axis.line}
                    tickLine={false}
                    height={60}
                    label={{ value: 'Shipping Routes', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    tickLine={false}
                    axisLine={chartCommonConfig.axis.line}
                    tick={chartCommonConfig.axis.tick}
                    label={{ value: 'Transit Days', angle: -90, position: 'insideLeft', dx: -10 }}
                  />
                  <Tooltip 
                    content={<RouteComparisonTooltip />}
                    cursor={cursorStyles.bar}
                    wrapperStyle={tooltipStyles.wrapper}
                    contentStyle={tooltipStyles.contentStyle}
                  />
                  <Bar 
                    dataKey="shipping" 
                    stackId="a" 
                    name="Shipping" 
                    fill={chartConfig.primaryRoute.color}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="customs" 
                    stackId="a" 
                    name="Customs" 
                    fill={chartConfig.customs.color}
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar 
                    dataKey="distribution" 
                    stackId="a" 
                    name="Distribution" 
                    fill={chartConfig.lastMile.color}
                    radius={[0, 0, 4, 4]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteComparisonTimeline;
