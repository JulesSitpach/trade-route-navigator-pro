
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface RequirementItemProps {
  label: string;
  status: 'required' | 'warning' | 'not-required';
}

export const RequirementItem = ({ label, status }: RequirementItemProps) => {
  const { t } = useLanguage();
  
  // Define badge styling based on status
  const badgeStyles = {
    'required': 'bg-blue-50 text-blue-700 border border-blue-200',
    'warning': 'bg-amber-50 text-amber-700 border border-amber-200',
    'not-required': 'bg-gray-50 text-gray-700 border border-gray-200'
  };
  
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-gray-700">{label}</span>
      <Badge 
        variant="outline"
        className={badgeStyles[status]}
      >
        {t(`regulations.status.${status}`)}
      </Badge>
    </div>
  );
};
