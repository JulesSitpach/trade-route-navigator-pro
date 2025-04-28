
import { PieChart } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import CostBreakdownChart from '../CostBreakdownChart';
import { useLanguage } from '@/contexts/LanguageContext';

interface CostsTabProps {
  productValue: string;
  originCountry: string;
  destinationCountry: string;
  productCategory: string;
  transportMode: string;
  quantity: string;
  weight: string;
}

const CostsTab = ({
  productValue,
  originCountry,
  destinationCountry,
  productCategory,
  transportMode,
  quantity,
  weight
}: CostsTabProps) => {
  const { t } = useLanguage();
  
  console.log("CostsTab props:", {
    productValue,
    originCountry,
    destinationCountry,
    productCategory,
    transportMode,
    quantity,
    weight
  });

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">{t('cost.breakdown')}</CardTitle>
        </div>
        <CardDescription>{t('analysis.costs.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <CostBreakdownChart 
          productValue={parseFloat(productValue) || 0}
          originCountry={originCountry}
          destinationCountry={destinationCountry}
          productCategory={productCategory}
          transportMode={transportMode}
          quantity={parseInt(quantity) || 1}
          weight={parseFloat(weight) || 0}
        />
      </CardContent>
    </Card>
  );
};

export default CostsTab;
