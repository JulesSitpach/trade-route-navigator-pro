
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
import { VisualizationsTabProps } from './visualizations/types/visualizationTypes';

const VisualizationsTab = ({ data, routes }: VisualizationsTabProps) => {
  const [activeChart, setActiveChart] = useState('cost-breakdown');
  const { t } = useLanguage();

  const tabs = [
    { id: 'cost-breakdown', label: t('route.tab.costs'), icon: 'Costs' },
    { id: 'route-comparison', label: t('route.tab.routes'), icon: 'Routes' },
    { id: 'tariff-heatmap', label: t('route.tab.tariffs'), icon: 'Tariffs' },
    { id: 'seasonality', label: t('route.tab.seasonality'), icon: 'Seasonality' },
    { id: 'risk-matrix', label: t('route.tab.risks'), icon: 'Risks' },
    { id: 'supply-chain', label: t('route.tab.supply'), icon: 'Supply Chain' },
    { id: 'compliance', label: t('route.tab.compliance'), icon: 'Compliance' },
  ];

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
          <Tabs value={activeChart} onValueChange={setActiveChart} className="w-full">
            <TabsList className="grid grid-cols-4 w-full md:grid-cols-4 lg:grid-cols-7">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="cost-breakdown" className="pt-6">
              <CostBreakdownChart />
            </TabsContent>
            
            <TabsContent value="route-comparison" className="pt-6">
              <RouteComparisonTimeline routes={routes} />
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
