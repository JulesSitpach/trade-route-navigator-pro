
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

const MetricCard = ({ icon, title, value }: MetricCardProps) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md transition-all duration-300 hover:bg-gray-100 hover:shadow-md transform hover:-translate-y-1">
      <div className="transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold transition-colors duration-300 hover:text-blue-600">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
