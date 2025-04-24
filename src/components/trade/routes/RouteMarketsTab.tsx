
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp } from "lucide-react";
import { Route } from '../../trade/types';

interface RouteMarketsTabProps {
  route: Route;
}

const RouteMarketsTab = ({ route }: RouteMarketsTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Emerging Market Opportunities
        </h4>
        
        {route.emergingMarkets?.hubs && route.emergingMarkets.hubs.length > 0 && (
          <div className="space-y-1">
            <div className="font-medium text-sm">Emerging Trade Hubs</div>
            <div className="flex flex-wrap gap-2">
              {route.emergingMarkets.hubs.map((hub, i) => (
                <Badge key={i} variant="outline" className="bg-amber-50">{hub}</Badge>
              ))}
            </div>
          </div>
        )}
        
        {route.emergingMarkets?.growthPotential && (
          <div className="text-sm">
            <span className="font-medium">Market Growth Potential:</span> {route.emergingMarkets.growthPotential}
          </div>
        )}
        
        {route.emergingMarkets?.economicZones && route.emergingMarkets.economicZones.length > 0 && (
          <div className="space-y-1">
            <div className="font-medium text-sm">Special Economic Zones</div>
            <div className="flex flex-wrap gap-2">
              {route.emergingMarkets.economicZones.map((zone, i) => (
                <Badge key={i} variant="outline" className="bg-blue-50">{zone}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteMarketsTab;
