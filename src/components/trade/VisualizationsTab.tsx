
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
  const { t } = useLanguage();

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CostBreakdownChart 
              productValue={parseFloat(data.product.productValue)}
              originCountry={data.product.originCountry}
              destinationCountry={data.product.destinationCountry}
              productCategory={data.product.productCategory}
              transportMode={data.shipping.transportMode}
              quantity={parseInt(data.shipping.quantity)}
              weight={parseFloat(data.shipping.weight)}
            />
            
            <RouteComparisonTimeline routes={routes} />
            
            <TariffHeatmap />
            
            <SeasonalityGraph />
            
            <RiskAssessmentMatrix />
            
            <SupplyChainFlowDiagram />
            
            <RegulatoryComplianceDashboard />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisualizationsTab;
