
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CostBreakdownChart from './visualizations/CostBreakdownChart';
import RouteComparisonTimeline from './visualizations/RouteComparisonTimeline';
import TariffHeatmap from './visualizations/TariffHeatmap';
import GlobalTradeMap from './visualizations/GlobalTradeMap';
import SeasonalityGraph from './visualizations/SeasonalityGraph';
import RiskAssessmentMatrix from './visualizations/RiskAssessmentMatrix';
import SupplyChainFlowDiagram from './visualizations/SupplyChainFlowDiagram';
import RegulatoryComplianceDashboard from './visualizations/RegulatoryComplianceDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const VisualizationsTab = () => {
  const [activeChart, setActiveChart] = useState('cost-breakdown');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Trade Data Visualizations</CardTitle>
          <CardDescription>
            Interactive visualizations to help you understand your global trade data and opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
            <TabsList className="grid grid-cols-4 w-full md:grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="cost-breakdown">Cost Breakdown</TabsTrigger>
              <TabsTrigger value="route-comparison">Routes Timeline</TabsTrigger>
              <TabsTrigger value="global-map">Global Map</TabsTrigger>
              <TabsTrigger value="tariff-heatmap">Tariff Heatmap</TabsTrigger>
              <TabsTrigger value="seasonality">Seasonality</TabsTrigger>
              <TabsTrigger value="risk-matrix">Risk Matrix</TabsTrigger>
              <TabsTrigger value="supply-chain">Supply Chain</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="cost-breakdown" className="pt-6">
              <CostBreakdownChart />
            </TabsContent>
            
            <TabsContent value="route-comparison" className="pt-6">
              <RouteComparisonTimeline />
            </TabsContent>
            
            <TabsContent value="global-map" className="pt-6">
              <GlobalTradeMap />
            </TabsContent>
            
            <TabsContent value="tariff-heatmap" className="pt-6">
              <TariffHeatmap />
            </TabsContent>
            
            <TabsContent value="seasonality" className="pt-6">
              <SeasonalityGraph />
            </TabsContent>
            
            <TabsContent value="risk-matrix" className="pt-6">
              <RiskAssessmentMatrix />
            </TabsContent>
            
            <TabsContent value="supply-chain" className="pt-6">
              <SupplyChainFlowDiagram />
            </TabsContent>
            
            <TabsContent value="compliance" className="pt-6">
              <RegulatoryComplianceDashboard />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualizationsTab;
