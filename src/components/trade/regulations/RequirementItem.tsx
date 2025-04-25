
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface RequirementItemProps {
  label: string;
  status: 'required' | 'warning' | 'not-required';
}

export const RequirementItem = ({ label, status }: RequirementItemProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{label}</span>
      <Badge 
        variant={status === 'warning' ? 'destructive' : status === 'required' ? 'default' : 'secondary'}
      >
        {t(`regulations.status.${status}`)}
      </Badge>
    </div>
  );
};
