
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Legend, Tooltip, ResponsiveContainer 
} from 'recharts';
import { RouteComparisonTooltip } from './RouteComparisonTooltip';

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
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Route Comparison Timeline</h3>
        <p className="text-sm text-muted-foreground">
          Compare transit times across different shipping routes and methods
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
                barSize={32}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  height={80}
                  angle={-35}
                  textAnchor="end"
                />
                <YAxis 
                  label={{ value: 'Transit Days', angle: -90, position: 'insideLeft', offset: -5 }}
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
    </div>
  );
};

export default RouteComparisonTimeline;
