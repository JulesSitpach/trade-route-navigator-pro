
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, 
  CartesianGrid, Legend, Tooltip, ResponsiveContainer 
} from 'recharts';
import { RouteComparisonTooltip } from './RouteComparisonTooltip';
import { getTariffColor } from '@/utils/chartUtils';

const data = [
  { x: 0, y: 10, z: 200, name: 'Shanghai → LA → Chicago', shipping: 14, customs: 3, distribution: 4 },
  { x: 1, y: 15, z: 260, name: 'Hong Kong → Seattle → Dallas', shipping: 16, customs: 4, distribution: 5 },
  { x: 2, y: 8, z: 180, name: 'Shenzhen → Vancouver → Toronto', shipping: 12, customs: 2, distribution: 3 },
  { x: 3, y: 20, z: 280, name: 'Guangzhou → Panama → Miami', shipping: 18, customs: 5, distribution: 6 },
];

const RouteComparisonTimeline = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Route Comparison Timeline</h3>
        <p className="text-sm text-muted-foreground">
          Compare shipping routes based on duration and complexity
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 20, left: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Timeline" 
                  unit="" 
                  tick={{fontSize: 12}}
                  tickFormatter={(value) => `Week ${value + 1}`}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Duration" 
                  unit=" days"
                  tick={{fontSize: 12}}
                />
                <ZAxis 
                  type="number" 
                  dataKey="z" 
                  range={[60, 400]} 
                  name="Volume" 
                />
                <Tooltip content={<RouteComparisonTooltip />} />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  align="center"
                  wrapperStyle={{ paddingBottom: '20px' }}
                />
                <Scatter 
                  name="Routes" 
                  data={data} 
                  fill="#3b82f6"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteComparisonTimeline;
