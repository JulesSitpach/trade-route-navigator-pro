
import { Card } from "@/components/ui/card";
import { CostItem } from "../shared/CostItem";
import { useLanguage } from '@/contexts/LanguageContext';

export const ComplianceCostSummary = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t('regulations.compliance')}</h3>
      <div className="space-y-3">
        <CostItem label={t('regulations.fees.document')} value="$225.00" />
        <CostItem label={t('regulations.fees.testing')} value="$1,500.00" />
        <CostItem label={t('regulations.fees.licensing')} value="$350.00" />
        <CostItem label={t('regulations.fees.customs')} value="$275.00" />
        <div className="border-t-2 border-gray-200 pt-3 mt-4">
          <CostItem 
            label={t('regulations.fees.total')}
            value="$2,350.00" 
            className="font-semibold"
          />
        </div>
        <p className="text-gray-600 italic mt-2">{t('regulations.preparation.time')}: 3-4 {t('regulations.weeks')}</p>
      </div>
    </Card>
  );
};
