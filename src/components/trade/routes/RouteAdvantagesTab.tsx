
import { Badge } from "@/components/ui/badge";
import { Building, Package } from "lucide-react";
import { Route } from '../../trade/types';

interface RouteAdvantagesTabProps {
  route: Route;
}

const RouteAdvantagesTab = ({ route }: RouteAdvantagesTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Package className="h-4 w-4" />
            SMB-Specific Advantages
          </h4>
          <div className="space-y-2">
            {route.smbAdvantages?.consolidatedShipping && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50">Consolidated Shipping</Badge>
                <span className="text-sm text-gray-600">Lower costs through combined shipments</span>
              </div>
            )}
            {route.smbAdvantages?.sharedContainer && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50">Shared Container</Badge>
                <span className="text-sm text-gray-600">Split container costs with other businesses</span>
              </div>
            )}
            {route.smbAdvantages?.flexiblePickup && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50">Flexible Pickup</Badge>
                <span className="text-sm text-gray-600">Accommodates irregular shipping schedules</span>
              </div>
            )}
            {route.smbAdvantages?.lowerMinimumQuantity && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-50">Lower Minimum Quantity</Badge>
                <span className="text-sm text-gray-600">Suited for smaller order volumes</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Building className="h-4 w-4" />
            Partnership Opportunities
          </h4>
          <div className="space-y-2 text-sm text-gray-700">
            {route.partnerships?.distributors && route.partnerships.distributors.length > 0 && (
              <div>
                <span className="font-medium">Local Distributors:</span> {route.partnerships.distributors.join(", ")}
              </div>
            )}
            {route.partnerships?.warehousing && route.partnerships.warehousing.length > 0 && (
              <div>
                <span className="font-medium">Warehousing Partners:</span> {route.partnerships.warehousing.join(", ")}
              </div>
            )}
            {route.partnerships?.fulfillment && route.partnerships.fulfillment.length > 0 && (
              <div>
                <span className="font-medium">Fulfillment Services:</span> {route.partnerships.fulfillment.join(", ")}
              </div>
            )}
            {route.partnerships?.lastMile && route.partnerships.lastMile.length > 0 && (
              <div>
                <span className="font-medium">Last-Mile Options:</span> {route.partnerships.lastMile.join(", ")}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteAdvantagesTab;
