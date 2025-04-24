
import { Badge } from "@/components/ui/badge";

interface RequirementItemProps {
  label: string;
  status: 'required' | 'warning' | 'not-required';
}

export const RequirementItem = ({ label, status }: RequirementItemProps) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <Badge variant={status === 'warning' ? 'destructive' : status === 'required' ? 'default' : 'secondary'}>
      {status === 'not-required' ? 'Not Required' : 'Required'}
    </Badge>
  </div>
);
