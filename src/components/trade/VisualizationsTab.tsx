
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import CostBreakdownChart from './visualizations/CostBreakdownChart';
import RouteComparisonTimeline from './visualizations/RouteComparisonTimeline';
import TariffHeatmap from './visualizations/TariffHeatmap';
import SeasonalityGraph from './visualizations/SeasonalityGraph';
import RiskAssessmentMatrix from './visualizations/RiskAssessmentMatrix';
import SupplyChainFlowDiagram from './visualizations/SupplyChainFlowDiagram';
import RegulatoryComplianceDashboard from './visualizations/RegulatoryComplianceDashboard';
import { 
  PieChart, BarChart, ScatterChart, LineChart, 
  NetworkIcon, AlertTriangleIcon, ClipboardCheckIcon
} from 'lucide-react';
import { VisualizationsTabProps } from './visualizations/types/visualizationTypes';

const VisualizationsTab = ({ data, routes }: VisualizationsTabProps) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("costs");

  // Tab options with their icons and labels
  const tabOptions = [
    { id: "costs", icon: <PieChart className="h-4 w-4 mr-2" />, label: t('cost.breakdown') },
    { id: "routes", icon: <BarChart className="h-4 w-4 mr-2" />, label: t('route.comparison') },
    { id: "tariffs", icon: <ScatterChart className="h-4 w-4 mr-2" />, label: t('tariff.analysis') },
    { id: "seasonality", icon: <LineChart className="h-4 w-4 mr-2" />, label: t('seasonality.title') },
    { id: "supplychain", icon: <NetworkIcon className="h-4 w-4 mr-2" />, label: language === 'en' ? 'Supply Chain' : 'Cadena de Suministro' },
    { id: "riskmatrix", icon: <AlertTriangleIcon className="h-4 w-4 mr-2" />, label: language === 'en' ? 'Risk Matrix' : 'Matriz de Riesgo' },
    { id: "compliance", icon: <ClipboardCheckIcon className="h-4 w-4 mr-2" />, label: language === 'en' ? 'Compliance' : 'Cumplimiento' }
  ];

  // Button-style tab layout
  const renderTabButtons = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
        {tabOptions.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${activeTab === tab.id 
                ? 'bg-primary text-white' 
                : 'bg-muted hover:bg-muted/80 text-muted-foreground'}
            `}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    );
  };

  const getActiveTabContent = () => {
    switch(activeTab) {
      case "costs":
        return (
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <PieChart className="h-5 w-5 mr-2 text-muted-foreground" />
              {t('cost.breakdown')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {t('analysis.costs.description')}
            </p>
            <CostBreakdownChart 
              productValue={parseFloat(data.product.productValue)}
              originCountry={data.product.originCountry}
              destinationCountry={data.product.destinationCountry}
              productCategory={data.product.productCategory}
              transportMode={data.shipping.transportMode}
              quantity={parseInt(data.shipping.quantity)}
              weight={parseFloat(data.shipping.weight)}
            />
          </div>
        );
      case "routes":
        return (
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <BarChart className="h-5 w-5 mr-2 text-muted-foreground" />
              {t('route.comparison')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'en' 
                ? 'Compare transit times across different shipping routes and methods' 
                : 'Compare tiempos de tránsito entre diferentes rutas y métodos de envío'
              }
            </p>
            <RouteComparisonTimeline routes={routes} />
          </div>
        );
      case "tariffs":
        return (
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <ScatterChart className="h-5 w-5 mr-2 text-muted-foreground" />
              {t('tariff.analysis')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'en' 
                ? 'Analyze tariff rates across product categories and countries' 
                : 'Analizar tarifas arancelarias entre categorías de productos y países'
              }
            </p>
            <TariffHeatmap />
          </div>
        );
      case "seasonality":
        return (
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <LineChart className="h-5 w-5 mr-2 text-muted-foreground" />
              {t('seasonality.title')}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'en' 
                ? 'Track how shipping costs, transit times, and risks fluctuate throughout the year' 
                : 'Seguimiento de cómo los costos de envío, tiempos de tránsito y riesgos fluctúan durante el año'
              }
            </p>
            <SeasonalityGraph />
          </div>
        );
      case "supplychain":
        return (
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <NetworkIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              {language === 'en' ? 'Supply Chain Flow' : 'Flujo de Cadena de Suministro'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'en' 
                ? 'Visualize your product's supply chain from origin to destination' 
                : 'Visualice la cadena de suministro de su producto desde el origen hasta el destino'
              }
            </p>
            <SupplyChainFlowDiagram />
          </div>
        );
      case "riskmatrix":
        return (
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <AlertTriangleIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              {language === 'en' ? 'Risk Assessment Matrix' : 'Matriz de Evaluación de Riesgos'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'en' 
                ? 'Analyze potential risks in your trade operations' 
                : 'Analice riesgos potenciales en sus operaciones comerciales'
              }
            </p>
            <RiskAssessmentMatrix />
          </div>
        );
      case "compliance":
        return (
          <div>
            <h3 className="text-lg font-medium flex items-center mb-2">
              <ClipboardCheckIcon className="h-5 w-5 mr-2 text-muted-foreground" />
              {language === 'en' ? 'Regulatory Compliance' : 'Cumplimiento Regulatorio'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {language === 'en' 
                ? 'View regulatory compliance status across your supply chain' 
                : 'Ver estado de cumplimiento regulatorio en su cadena de suministro'
              }
            </p>
            <RegulatoryComplianceDashboard />
          </div>
        );
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
        {renderTabButtons()}

        <div className="bg-card rounded-lg border p-6">
          {getActiveTabContent()}
        </div>
      </div>
    </div>
  );
};

export default VisualizationsTab;
