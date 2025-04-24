
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, DollarSign, Shield, TrendingUp } from "lucide-react";
import { Route } from '../../trade/types';
import MetricCard from './MetricCard';
import RouteAdvantagesTab from './RouteAdvantagesTab';
import RouteMarketsTab from './RouteMarketsTab';
import RouteRisksTab from './RouteRisksTab';
import RouteGrowthTab from './RouteGrowthTab';

interface RouteCardProps {
  route: Route;
}

const RouteCard = ({ route }: RouteCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        {/* Header with basic route information */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{route.path}</h3>
              {route.recommended && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Recommended</Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm">{route.description}</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="default">Select Route</Button>
            <Button variant="outline">Compare</Button>
          </div>
        </div>
        
        {/* Core metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={<Clock className="h-5 w-5 text-blue-500" />} 
                     title="Transit Time" 
                     value={route.transitTime} />
          <MetricCard icon={<DollarSign className="h-5 w-5 text-green-500" />} 
                     title="Total Cost" 
                     value={route.cost} />
          <MetricCard icon={<Shield className="h-5 w-5 text-amber-500" />} 
                     title="Risk Level" 
                     value={route.riskLevel} />
          {route.carbonFootprint && (
            <MetricCard icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} 
                       title="Carbon Footprint" 
                       value={route.carbonFootprint} />
          )}
        </div>
        
        {/* Tabs for detailed information */}
        <Tabs defaultValue="advantages" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="advantages">SMB Advantages</TabsTrigger>
            <TabsTrigger value="markets">Market Opportunities</TabsTrigger>
            <TabsTrigger value="risks">Risk & Finance</TabsTrigger>
            <TabsTrigger value="growth">Growth & Scaling</TabsTrigger>
          </TabsList>
          
          <TabsContent value="advantages">
            <RouteAdvantagesTab route={route} />
          </TabsContent>
          
          <TabsContent value="markets">
            <RouteMarketsTab route={route} />
          </TabsContent>
          
          <TabsContent value="risks">
            <RouteRisksTab route={route} />
          </TabsContent>
          
          <TabsContent value="growth">
            <RouteGrowthTab route={route} />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default RouteCard;
