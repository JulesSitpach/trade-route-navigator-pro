
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import CostBreakdownChart from './visualizations/CostBreakdownChart';
import RouteComparisonTimeline from './visualizations/RouteComparisonTimeline';
import TariffHeatmap from './visualizations/TariffHeatmap';
import SeasonalityGraph from './visualizations/SeasonalityGraph';
import RiskAssessmentMatrix from './visualizations/RiskAssessmentMatrix';
import SupplyChainFlowDiagram from './visualizations/SupplyChainFlowDiagram';
import RegulatoryComplianceDashboard from './visualizations/RegulatoryComplianceDashboard';
import { BarChart, PieChart, LineChart, ScatterChart, NetworkIcon } from 'lucide-react';
import { VisualizationsTabProps } from './visualizations/types/visualizationTypes';

const VisualizationsTab = ({ data, routes }: VisualizationsTabProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("costs");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('analysis.visualizations')}</CardTitle>
          <CardDescription>
            {t('analysis.visualizations.description')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2">
              <TabsTrigger value="costs" className="flex items-center gap-2">
                <PieChart className="h-4 w-4" />
                {t('cost.breakdown')}
              </TabsTrigger>
              <TabsTrigger value="routes" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                {t('route.comparison')}
              </TabsTrigger>
              <TabsTrigger value="tariffs" className="flex items-center gap-2">
                <ScatterChart className="h-4 w-4" />
                {t('tariff.analysis')}
              </TabsTrigger>
              <TabsTrigger value="seasonality" className="flex items-center gap-2">
                <LineChart className="h-4 w-4" />
                {t('seasonality.title')}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="costs">
              <CostBreakdownChart 
                productValue={parseFloat(data.product.productValue)}
                originCountry={data.product.originCountry}
                destinationCountry={data.product.destinationCountry}
                productCategory={data.product.productCategory}
                transportMode={data.shipping.transportMode}
                quantity={parseInt(data.shipping.quantity)}
                weight={parseFloat(data.shipping.weight)}
              />
            </TabsContent>

            <TabsContent value="routes">
              <RouteComparisonTimeline routes={routes} />
            </TabsContent>

            <TabsContent value="tariffs">
              <TariffHeatmap />
            </TabsContent>

            <TabsContent value="seasonality">
              <SeasonalityGraph />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <RiskAssessmentMatrix />
            </div>
            <div>
              <SupplyChainFlowDiagram />
            </div>
            <div className="md:col-span-2">
              <RegulatoryComplianceDashboard />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualizationsTab;
