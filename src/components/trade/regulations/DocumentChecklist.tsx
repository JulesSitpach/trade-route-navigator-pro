
import { Card } from "@/components/ui/card";
import { RequirementItem } from "./RequirementItem";
import { useLanguage } from '@/contexts/LanguageContext';

interface DocumentChecklistProps {
  requiredDocuments: Array<{
    name: string;
    status: 'required' | 'warning' | 'not-required';
  }>;
}

export const DocumentChecklist = ({ requiredDocuments }: DocumentChecklistProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t('regulations.documentation')}</h3>
      <div className="space-y-3">
        {requiredDocuments.map((doc, index) => (
          <RequirementItem 
            key={index} 
            label={doc.name} 
            status={doc.status} 
          />
        ))}
      </div>
    </Card>
  );
};
