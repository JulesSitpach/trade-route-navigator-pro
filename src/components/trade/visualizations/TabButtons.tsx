
import { PieChart, BarChart, ScatterChart, LineChart, 
  NetworkIcon, AlertTriangleIcon, ClipboardCheckIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface TabButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabButtons = ({ activeTab, setActiveTab }: TabButtonsProps) => {
  const { t } = useLanguage();

  // Tab options with their icons and labels
  const tabOptions = [
    { id: "costs", icon: <PieChart className="h-4 w-4" />, label: t('cost.breakdown') },
    { id: "routes", icon: <BarChart className="h-4 w-4" />, label: t('route.comparison') },
    { id: "tariffs", icon: <ScatterChart className="h-4 w-4" />, label: t('tariff.analysis') },
    { id: "seasonality", icon: <LineChart className="h-4 w-4" />, label: t('seasonality.title') },
    { id: "supplychain", icon: <NetworkIcon className="h-4 w-4" />, label: t('supplychain.title', 'Supply Chain') },
    { id: "riskmatrix", icon: <AlertTriangleIcon className="h-4 w-4" />, label: t('riskmatrix.title', 'Risk Matrix') },
    { id: "compliance", icon: <ClipboardCheckIcon className="h-4 w-4" />, label: t('compliance.title', 'Compliance') }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tabOptions.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          variant={activeTab === tab.id ? "default" : "outline"}
          className="flex items-center justify-center px-4 py-2 gap-2 rounded-md text-sm"
        >
          {tab.icon}
          <span>{tab.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default TabButtons;
