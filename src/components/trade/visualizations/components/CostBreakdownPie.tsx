
import React from "react";
import { Pie, Cell } from "recharts";
import { CostBreakdownItem } from "../utils/costBreakdownCalculations";
import { CHART_COLORS } from "@/constants/chartStyles";

interface CostBreakdownPieProps {
  chartData: CostBreakdownItem[];
}

const CostBreakdownPie: React.FC<CostBreakdownPieProps> = ({ chartData }) => {
  // Calculate total for percentages
  const totalValue = chartData.reduce((sum, item) => sum + Number(item.value), 0);
  
  const renderLabel = (entry: any) => {
    // Ensure we're working with numbers
    const value = Number(entry.value);
    const percentage = ((value / totalValue) * 100).toFixed(1);
    
    // Only show percentage label if it's greater than 5%
    return Number(percentage) > 5 ? `${percentage}%` : '';
  };

  // Log to check that we're receiving the data correctly
  console.log("Pie Chart Data being rendered:", chartData);

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
      isAnimationActive={true}
    >
      {chartData.map((entry, index) => {
        // Use our consistent color palette
        const fillColor = entry.color || CHART_COLORS.primary[index % CHART_COLORS.primary.length];
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
