
import { Route } from './trade/types';
import { generateDynamicRoutes } from './trade/utils/routeGenerator';
import AlternativeRoutes from './AlternativeRoutes';
import TariffAnalysis from './TariffAnalysis';
import CostAnalysisTab from './trade/CostAnalysisTab';
import RegulationsTab from './trade/RegulationsTab';
import VisualizationsTab from './trade/VisualizationsTab';
import Disclaimer from './trade/Disclaimer';
import { ChartBar, Route as RouteIcon, FileText, ScrollText, BarChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

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
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("costs");
  
  const dynamicRoutes = generateDynamicRoutes({
    origin: data.product.originCountry,
    destination: data.product.destinationCountry,
    transportMode: data.shipping.transportMode || 'sea'
  });

  const tabs = [
    { id: "costs", icon: <ChartBar className="h-4 w-4" />, label: t('analysis.costs') },
    { id: "routes", icon: <RouteIcon className="h-4 w-4" />, label: t('analysis.routes') },
    { id: "tariffs", icon: <FileText className="h-4 w-4" />, label: t('analysis.tariffs') },
    { id: "regulations", icon: <ScrollText className="h-4 w-4" />, label: t('analysis.regulations') },
    { id: "visualizations", icon: <BarChart className="h-4 w-4" />, label: t('analysis.visualizations') }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case "costs":
        return <CostAnalysisTab data={data} />;
      case "routes":
        return <AlternativeRoutes routes={dynamicRoutes} />;
      case "tariffs":
        return (
          <TariffAnalysis 
            productCategory={data.product.productCategory}
            originCountry={data.product.originCountry}
            destinationCountry={data.product.destinationCountry}
          />
        );
      case "regulations":
        return (
          <RegulationsTab 
            productCategory={data.product.productCategory}
            originCountry={data.product.originCountry}
            destinationCountry={data.product.destinationCountry}
            isDangerous={data.shipping.dangerousGoods === 'yes'}
            transportMode={data.shipping.transportMode}
          />
        );
      case "visualizations":
        return <VisualizationsTab data={data} routes={dynamicRoutes} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-[#2C3E50] mb-6">{t('analysis.title')}</h2>
      
      <Disclaimer />
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium transition-all
                ${activeTab === tab.id && 'shadow-sm'}`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TradeAnalysis;
