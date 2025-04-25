
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';

export const HelpfulResources = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t('regulations.resources')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Customs Brokers</h4>
          <ul className="space-y-1 text-gray-700">
            <li>Global Trade Solutions: (555) 123-4567</li>
            <li>Express Customs Brokers: (555) 987-6543</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Trade Assistance</h4>
          <ul className="space-y-1 text-gray-700">
            <li>International Trade Administration</li>
            <li>U.S. Commercial Service</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-medium text-gray-800">Regulatory Authorities</h4>
          <ul className="space-y-1 text-gray-700">
            <li>Customs and Border Protection</li>
            <li>Food and Drug Administration</li>
            <li>Consumer Product Safety Commission</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
