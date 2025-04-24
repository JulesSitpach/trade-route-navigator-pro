
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const MetricCard = ({ icon, title, value }: MetricCardProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
