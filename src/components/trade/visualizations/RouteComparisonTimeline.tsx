import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Legend, Tooltip, ResponsiveContainer 
} from 'recharts';
import { chartCommonConfig } from "@/utils/chartUtils";
import { RouteComparisonTooltip } from './RouteComparisonTooltip';
import { BarChartIcon } from "lucide-react";
import { chartConfig } from "./chartConfig";
import { StyleDebugger } from './debug/StyleDebugger';
import { tooltipStyles, cursorStyles } from "@/components/ui/chart/theme/commonStyles";
import { ChartCustomLegend } from '@/components/ui/chart/ChartCustomLegend';

const RouteComparisonTimeline = () => {
  // Sample route comparison data with simplified names
  const routeData = [
    {
      name: "Primary Route",
      fullRoute: "Shanghai → Panama → LA → Chicago",
      shipping: 18,
      customs: 3,
      distribution: 3,
      label: "Primary Route"
    },
    {
      name: "Express Air Route",
      fullRoute: "Shanghai → LA → Chicago (Air)",
      shipping: 2,
      customs: 0.5,
      distribution: 0.5,
      label: "Express Air Route"
    },
    {
      name: "Alternative Route",
      fullRoute: "Vietnam → Singapore → LA → Chicago",
      shipping: 22,
      customs: 2,
      distribution: 3,
      label: "Alternative Route"
    },
    {
      name: "USMCA Route",
      fullRoute: "China → Mexico → US (USMCA)",
      shipping: 14,
      customs: 5,
      distribution: 2,
      label: "Triangular Trade Route"
    }
  ];

  return (
    <div className="space-y-4">
      <StyleDebugger />
      <div className="flex items-center gap-2">
        <BarChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Route Comparison Timeline</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Compare transit times across different shipping routes and methods
      </p>
      
      <Card>
        <CardContent className="p-6">
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
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteComparisonTimeline;
