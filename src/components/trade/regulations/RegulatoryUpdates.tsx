
import { Card } from "@/components/ui/card";
import { RegulatoryUpdate } from "./types";
import { useLanguage } from '@/contexts/LanguageContext';

interface RegulatoryUpdatesProps {
  updates: RegulatoryUpdate[];
}

export const RegulatoryUpdates = ({ updates }: RegulatoryUpdatesProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t('regulations.updates')}</h3>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="text-amber-700 font-medium">{update.date}: {update.title}</p>
            <p className="text-gray-700">{update.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
