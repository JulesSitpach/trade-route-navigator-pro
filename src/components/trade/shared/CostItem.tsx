
interface CostItemProps {
  label: string;
  value: string;
  className?: string;
}

export const CostItem = ({ label, value, className = "" }: CostItemProps) => (
  <div className={`flex justify-between items-center ${className}`}>
    <span className="text-gray-700">{label}</span>
    <span className="text-blue-900 font-semibold">{value}</span>
  </div>
);
