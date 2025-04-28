
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

  // Enhanced vibrant colors
  const colorPalette = [
    "#3498DB", // Bright Blue
    "#9B59B6", // Purple
    "#E74C3C", // Red
    "#F39C12", // Orange
    "#16A085", // Teal
    "#27AE60", // Green
    "#D35400", // Dark Orange
    "#8E44AD", // Dark Purple
    "#2980B9", // Dark Blue
    "#1ABC9C"  // Turquoise
  ];

  return (
    <Pie
      data={chartData}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={renderLabel}
      outerRadius={140}
      innerRadius={90}
      paddingAngle={3}
      dataKey="value"
      nameKey="name"
      cornerRadius={5}
    >
      {chartData.map((entry, index) => {
        // Use a vibrant color palette instead of category-based colors
        const fillColor = entry.color || colorPalette[index % colorPalette.length];
        return (
          <Cell 
            key={`cell-${index}`} 
            fill={fillColor}
            stroke="#FFFFFF"
            strokeWidth={2}
          />
        );
      })}
    </Pie>
  );
};

export default CostBreakdownPie;
