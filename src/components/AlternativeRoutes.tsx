
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface RouteOption {
  path: string;
  transitTime: string;
  cost: string;
  riskLevel: string;
  description: string;
  savings?: string;
  recommended?: boolean;
}

interface AlternativeRoutesProps {
  routes: RouteOption[];
}

const AlternativeRoutes = ({ routes }: AlternativeRoutesProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Alternative Routes and Transportation Methods</h2>
      <p className="text-gray-600 mb-4">
        We've analyzed several alternative shipping routes and methods that may offer cost savings or other advantages.
      </p>
      
      {routes.map((route, index) => (
        <Card key={index} className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{route.path}</h3>
                {route.recommended && (
                  <span className="text-green-500 text-sm">Recommended</span>
                )}
              </div>
              
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-lg font-semibold">{route.transitTime}</p>
                  <p className="text-sm text-gray-500">Transit Time</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{route.cost}</p>
                  <p className="text-sm text-gray-500">Total Cost</p>
                </div>
                <div>
                  <p className="text-lg font-semibold">{route.riskLevel}</p>
                  <p className="text-sm text-gray-500">Risk Level</p>
                </div>
              </div>
              
              <p className="text-gray-600">{route.description}</p>
              
              {route.savings && (
                <p className="text-green-600">+{route.savings}</p>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="default">Select Route</Button>
              <Button variant="outline">Compare</Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AlternativeRoutes;
