
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Legend, Tooltip, ResponsiveContainer 
} from 'recharts';
import { RouteComparisonTooltip } from './RouteComparisonTooltip';
import { BarChartIcon } from "lucide-react";

// Updated data to match the image
const data = [
  { name: "Shanghai → Panama → LA → Chicago", shipping: 18, customs: 3, distribution: 3 },
  { name: "Shanghai → LA → Chicago (Air)", shipping: 2, customs: 0.5, distribution: 0.5 },
  { name: "Vietnam → Singapore → LA → Chicago", shipping: 22, customs: 2, distribution: 3 },
  { name: "China → Mexico → US (USMCA)", shipping: 14, customs: 5, distribution: 2 },
];

const RouteComparisonTimeline = () => {
  return (
    <div className="space-y-6">
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
                data={data}
                margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                barSize={32}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  height={80}
                  angle={-35}
                  textAnchor="end"
                  label={{ value: 'Shipping Routes', position: 'insideBottom', offset: -10 }}
                />
                <YAxis 
                  label={{ value: 'Transit Days', angle: -90, position: 'insideLeft', dx: -10 }}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<RouteComparisonTooltip />} />
                <Legend 
                  verticalAlign="top"
                  align="center"
                  height={36}
                  wrapperStyle={{ paddingBottom: '20px' }}
                />
                <Bar 
                  dataKey="shipping" 
                  stackId="a" 
                  name="Shipping" 
                  fill="#8884d8" 
                />
                <Bar 
                  dataKey="customs" 
                  stackId="a" 
                  name="Customs" 
                  fill="#4caf50" 
                />
                <Bar 
                  dataKey="distribution" 
                  stackId="a" 
                  name="Distribution" 
                  fill="#2196f3" 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm">
        <p className="font-medium mb-2">Key Insights:</p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li>Air shipping reduces transit time by 85% but increases costs by 130%</li>
          <li>Panama Canal route offers the best balance of cost and speed</li>
          <li>USMCA triangular trade route requires additional processing time but reduces tariffs</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteComparisonTimeline;
