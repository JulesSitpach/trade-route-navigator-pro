
import { ChartTooltipContent } from "@/components/ui/chart";
import { formatCurrency } from '../../../trade/data/utils/formatters';

const CostBreakdownTooltip: React.FC = () => {
  return (
    <ChartTooltipContent
      formatter={(value, name) => [
        formatCurrency(Number(value)), 
        name
      ]}
    />
  );
};

export default CostBreakdownTooltip;
