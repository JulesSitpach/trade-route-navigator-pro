
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SeasonalityChart } from "@/components/ui/chart";
import { LineChartIcon } from "lucide-react";

const SeasonalityGraph = () => {
  // Removed hardcoded seasonality data
  const seasonalityData: any[] = [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LineChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">Seasonality Analysis</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Track how shipping costs, transit times, and risks fluctuate throughout the year
      </p>
      
      <Card>
        <CardContent className="p-6">
          {seasonalityData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              No seasonality data available
            </div>
          ) : (
            <SeasonalityChart 
              data={seasonalityData}
              title="Annual Shipping Trends"
              subtitle="Monthly freight costs, congestion, and risk indicators"
              legendProps={{
                verticalAlign: "top",
                align: "center",
                wrapperStyle: {
                  paddingBottom: '20px',
                  display: 'flex',
                  justifyContent: 'center'
                }
              }}
            />
          )}
        </CardContent>
      </Card>

      {seasonalityData.length > 0 && (
        <div className="text-sm mt-6">
          <p className="font-medium mb-2">Key Seasonal Factors:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Q4 shipping rates peak during holiday season (October-December)</li>
            <li>Chinese New Year (January-February) causes manufacturing delays</li>
            <li>Summer months show increased port congestion</li>
            <li>Consider shipping in Q2 for optimal balance of cost and efficiency</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeasonalityGraph;
