
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import TabButtons from './visualizations/TabButtons';
import CostsTab from './visualizations/tabs/CostsTab';
import RoutesTab from './visualizations/tabs/RoutesTab';
import TariffsTab from './visualizations/tabs/TariffsTab';
import SeasonalityTab from './visualizations/tabs/SeasonalityTab';
import SupplyChainTab from './visualizations/tabs/SupplyChainTab';
import RiskMatrixTab from './visualizations/tabs/RiskMatrixTab';
import ComplianceTab from './visualizations/tabs/ComplianceTab';
import { VisualizationsTabProps } from './visualizations/types/visualizationTypes';

const VisualizationsTab = ({ data, routes }: VisualizationsTabProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("costs");

  // Ensure we have all required data
  console.log("Visualizations Tab Data:", { data, routes });

  const renderTabContent = () => {
    switch(activeTab) {
      case "costs":
        return (
          <CostsTab 
            productValue={data.product.productValue || "0"}
            originCountry={data.product.originCountry || ""}
            destinationCountry={data.product.destinationCountry || ""}
            productCategory={data.product.productCategory || ""}
            transportMode={data.shipping.transportMode || ""}
            quantity={data.shipping.quantity || "1"}
            weight={data.shipping.weight || "0"}
          />
        );
      case "routes":
        return <RoutesTab routes={routes} />;
      case "tariffs":
        return <TariffsTab />;
      case "seasonality":
        return <SeasonalityTab />;
      case "supplychain":
        return <SupplyChainTab />;
      case "riskmatrix":
        return <RiskMatrixTab />;
      case "compliance":
        return <ComplianceTab />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {t('analysis.visualizations')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('analysis.visualizations.description')}
        </p>
      </div>

      <div>
        <TabButtons activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default VisualizationsTab;
