
import { NetworkIcon } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import SupplyChainFlowDiagram from '../SupplyChainFlowDiagram';
import { useLanguage } from '@/contexts/LanguageContext';

const SupplyChainTab = () => {
  const { language } = useLanguage();

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <NetworkIcon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">
            {language === 'en' ? 'Supply Chain Flow' : 'Flujo de Cadena de Suministro'}
          </CardTitle>
        </div>
        <CardDescription>
          {language === 'en' 
            ? "Visualize your product's supply chain from origin to destination" 
            : "Visualice la cadena de suministro de su producto desde el origen hasta el destino"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SupplyChainFlowDiagram />
      </CardContent>
    </Card>
  );
};

export default SupplyChainTab;
