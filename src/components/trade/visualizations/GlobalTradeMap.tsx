
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Truck, Ship, Plane } from "lucide-react";

const GlobalTradeMap = () => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Global Trade Map</h3>
      <p className="text-sm text-muted-foreground">
        Interactive map showing your shipping routes, transit points, and logistics network
      </p>
      
      <Card className="border-dashed border-2">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="bg-muted rounded-full p-3 mb-4">
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Interactive World Map Coming Soon</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            We're building a comprehensive interactive map with shipping lanes, port congestion 
            indicators, and real-time trade corridor visualization. Check back soon!
          </p>
          
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center">
              <Ship className="h-8 w-8 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Ocean Routes</span>
            </div>
            <div className="flex flex-col items-center">
              <Plane className="h-8 w-8 text-purple-500 mb-2" />
              <span className="text-sm font-medium">Air Routes</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-green-500 mb-2" />
              <span className="text-sm font-medium">Land Routes</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm">
        <p className="font-medium">Planned Features:</p>
        <ul className="list-disc pl-5 pt-2 space-y-1">
          <li>Interactive map with toggle between different route options</li>
          <li>Port congestion indicators for major shipping hubs</li>
          <li>Color-coded shipping lanes based on cost, time or risk</li>
        </ul>
      </div>
    </div>
  );
};

export default GlobalTradeMap;
