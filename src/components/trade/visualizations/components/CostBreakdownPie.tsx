
import { Pie, Cell } from "recharts";
import { CostBreakdownItem } from "../utils/costBreakdownCalculations";
import { getCategoryColor } from '@/utils/chartUtils';

interface CostBreakdownPieProps {
  chartData: CostBreakdownItem[];
}

const CostBreakdownPie: React.FC<CostBreakdownPieProps> = ({ chartData }) => {
  const renderLabel = (entry: any) => {
    // Ensure we're working with numbers
    const value = Number(entry.value);
    const totalValue = chartData.reduce((sum: number, item: any) => sum + Number(item.value), 0);
    const percentage = ((value / totalValue) * 100).toFixed(1);
    
    // Only show percentage label if it's greater than 5%
    return Number(percentage) > 5 ? `${percentage}%` : '';
  };

  return (
    <Pie
      data={chartData}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderLabel}
      outerRadius={140}
      innerRadius={100}
      paddingAngle={2}
      dataKey="value"
      nameKey="name"
      cornerRadius={4}
    >
      {chartData.map((entry, index) => {
        // Use the color from the entry if available, otherwise get it from the category
        const fillColor = entry.color || getCategoryColor(entry.category);
        return (
          <Cell 
            key={`cell-${index}`} 
            fill={fillColor}
            stroke={fillColor}
            strokeWidth={1}
          />
        );
      })}
    </Pie>
  );
};

export default CostBreakdownPie;
