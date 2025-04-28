
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from "@/components/ui/badge";

export const ProductRegulations = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t('regulations.productRequirements')}</h3>
      <div className="space-y-4 text-gray-700">
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('regulations.type.safety')}:</span> 
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">ISO 9001:2015</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('regulations.type.environmental')}:</span>
          <Badge className="bg-green-50 text-green-700 border-green-200">EMC Directive</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('regulations.type.labeling')}:</span>
          <Badge className="bg-amber-50 text-amber-700 border-amber-200">Product Origin Marking</Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">{t('regulations.type.customs')}:</span>
          <Badge className="bg-purple-50 text-purple-700 border-purple-200">HS Code Required</Badge>
        </div>
      </div>
    </Card>
  );
};
