
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlternativeRoutes from './AlternativeRoutes';
import TradeOpportunities from './TradeOpportunities';
import TariffAnalysis from './TariffAnalysis';
import CostAnalysisTab from './trade/CostAnalysisTab';
import RegulationsTab from './trade/RegulationsTab';
import VisualizationsTab from './trade/VisualizationsTab';
import { Route } from './trade/types';
import { generateDynamicRoutes } from './trade/utils/routeGenerator';
import { ChartBar, Route as RouteIcon, FileText, ScrollText, BarChart } from 'lucide-react';

interface TradeAnalysisProps {
  data: {
    product: {
      productDescription: string;
      originCountry: string;
      destinationCountry: string;
      productValue: string;
      productCategory: string;
    };
    shipping: {
      quantity: string;
      transportMode: string;
      shipmentType: string;
      packageType: string;
      dangerousGoods: string;
      weight: string;
      length: string;
      width: string;
      height: string;
      specialRequirements: string;
    };
  };
}

const TradeAnalysis = ({ data }: TradeAnalysisProps) => {
  const dynamicRoutes = generateDynamicRoutes({
    origin: data.product.originCountry,
    destination: data.product.destinationCountry,
    transportMode: data.shipping.transportMode || 'sea'
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Trade Analysis Results</h2>
      
      <Tabs defaultValue="costs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="costs" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            Cost Breakdown
          </TabsTrigger>
          <TabsTrigger value="routes" className="flex items-center gap-2">
            <RouteIcon className="h-4 w-4" />
            Alternative Routes
          </TabsTrigger>
          <TabsTrigger value="tariffs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Tariff Analysis
          </TabsTrigger>
          <TabsTrigger value="regulations" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            Regulations
          </TabsTrigger>
          <TabsTrigger value="visualizations" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Visualizations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="costs">
          <CostAnalysisTab data={data} />
        </TabsContent>

        <TabsContent value="routes">
          <AlternativeRoutes routes={dynamicRoutes} />
        </TabsContent>

        <TabsContent value="tariffs">
          <TariffAnalysis 
            productCategory={data.product.productCategory}
            originCountry={data.product.originCountry}
            destinationCountry={data.product.destinationCountry}
            productValue={parseFloat(data.product.productValue)}
          />
        </TabsContent>

        <TabsContent value="regulations">
          <RegulationsTab 
            productCategory={data.product.productCategory}
            originCountry={data.product.originCountry}
            destinationCountry={data.product.destinationCountry}
            isDangerous={data.shipping.dangerousGoods === 'yes'}
            transportMode={data.shipping.transportMode}
          />
        </TabsContent>

        <TabsContent value="visualizations">
          <VisualizationsTab 
            data={data}
            routes={dynamicRoutes}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeAnalysis;
