
import { PieChart, BarChart, ScatterChart, LineChart, 
  NetworkIcon, AlertTriangleIcon, ClipboardCheckIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabButtons = ({ activeTab, setActiveTab }: TabButtonsProps) => {
  const { t, language } = useLanguage();

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

export default TabButtons;
