
import { Badge } from "@/components/ui/badge";
import { Factory, TrendingUp } from "lucide-react";
import { Route } from '../../trade/types';

interface RouteGrowthTabProps {
  route: Route;
}

const RouteGrowthTab = ({ route }: RouteGrowthTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <h4 className="font-medium flex items-center gap-2">
        <Factory className="h-4 w-4" />
        Scaling Considerations
      </h4>
      
      {route.scalingConsiderations && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {route.scalingConsiderations.growthAccommodation && (
            <div>
              <span className="font-medium">Growth Accommodation:</span> {route.scalingConsiderations.growthAccommodation}
            </div>
          )}
          {route.scalingConsiderations.volumeThresholds && (
            <div>
              <span className="font-medium">Volume Thresholds for Better Rates:</span> {route.scalingConsiderations.volumeThresholds}
            </div>
          )}
          {route.scalingConsiderations.peakSeasonFlexibility && (
            <div>
              <span className="font-medium">Peak Season Flexibility:</span> {route.scalingConsiderations.peakSeasonFlexibility}
            </div>
          )}
          {route.scalingConsiderations.infrastructureDevelopment && (
            <div>
              <span className="font-medium">Infrastructure Development:</span> {route.scalingConsiderations.infrastructureDevelopment}
            </div>
          )}
        </div>
      )}
      
      {route.savings && (
        <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <span className="font-medium text-green-700">Potential Long-Term Savings</span>
          </div>
          <p className="text-green-600 mt-1">{route.savings} compared to standard routes</p>
        </div>
      )}
    </div>
  );
};

export default RouteGrowthTab;
