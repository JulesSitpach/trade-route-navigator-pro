
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

export const ProductRegulations = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t('regulations.productRequirements')}</h3>
      <div className="space-y-4 text-gray-700">
        <p>
          <span className="font-medium">{t('regulations.type.safety')}:</span> ISO 9001:2015
        </p>
        <p>
          <span className="font-medium">{t('regulations.type.environmental')}:</span> EMC
        </p>
        <p>
          <span className="font-medium">{t('regulations.type.labeling')}:</span>
        </p>
      </div>
    </Card>
  );
};
