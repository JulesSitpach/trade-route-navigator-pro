import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlternativeRoutes from './AlternativeRoutes';
import TradeOpportunities from './TradeOpportunities';
import TariffAnalysis from './TariffAnalysis';
import CostAnalysisTab from './trade/CostAnalysisTab';
import RegulationsTab from './trade/RegulationsTab';
import VisualizationsTab from './trade/VisualizationsTab';
import { Route } from './trade/types';
import { routes, opportunities } from './trade/data';

const TradeAnalysis = ({ data }: { data: any }) => {
  // Use sample routes data from sampleData.ts file
  const sampleRoutes = routes;
  
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Trade Analysis Results</h2>
      
      <Tabs defaultValue="costs" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="routes">Alternative Routes</TabsTrigger>
          <TabsTrigger value="tariffs">Tariff Analysis</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
        </TabsList>

        <TabsContent value="costs">
          <CostAnalysisTab />
        </TabsContent>

        <TabsContent value="routes">
          <AlternativeRoutes routes={sampleRoutes} />
        </TabsContent>

        <TabsContent value="tariffs">
          <TariffAnalysis />
        </TabsContent>

        <TabsContent value="regulations">
          <RegulationsTab />
        </TabsContent>

        <TabsContent value="visualizations">
          <VisualizationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeAnalysis;
