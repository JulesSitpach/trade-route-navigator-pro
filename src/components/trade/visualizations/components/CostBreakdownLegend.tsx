
import { ChartLegendContent } from "@/components/ui/chart";
import { CostBreakdownItem } from "../utils/costBreakdownCalculations";
import { formatCurrency } from '../../../trade/data/utils/formatters';

interface CostBreakdownLegendProps {
  chartData: CostBreakdownItem[];
}

const CostBreakdownLegend: React.FC<CostBreakdownLegendProps> = ({ chartData }) => {
  return (
    <ChartLegendContent
      formatter={(value, entry) => {
        const item = chartData.find(item => item.name === entry?.payload?.name);
        return [
          formatCurrency(Number(item?.value || 0)),
          item?.name || ''
        ];
      }}
    />
  );
};

export default CostBreakdownLegend;
