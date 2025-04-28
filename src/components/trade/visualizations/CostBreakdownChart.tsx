
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartLegend } from "@/components/ui/chart";
import { Donut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import chartConfig from '@/components/ui/chart/config';
import { calculateCostBreakdown, CostBreakdownInput } from "./utils/costBreakdownCalculations";
import CostBreakdownPie from "./components/CostBreakdownPie";
import CostBreakdownLegend from "./components/CostBreakdownLegend";
import CostBreakdownTooltip from "./components/CostBreakdownTooltip";

const CostBreakdownChart = ({
  productValue,
  originCountry,
  destinationCountry,
  productCategory,
  transportMode,
  quantity,
  weight
}: CostBreakdownInput) => {
  const { language } = useLanguage();

  const chartData = calculateCostBreakdown({
    productValue,
    originCountry,
    destinationCountry,
    productCategory,
    transportMode,
    quantity,
    weight
  }, language);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Donut className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Cost Breakdown Analysis' : 'Análisis de Desglose de Costos'}
        </h3>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {chartData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {language === 'en' 
                ? 'No cost breakdown data available' 
                : 'No hay datos de desglose de costos disponibles'
              }
            </div>
          ) : (
            <ChartContainer 
              height={400} 
              className="w-full"
              config={chartConfig}
            >
              <ResponsiveContainer width="100%" height={400}>
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <ChartLegend 
                    content={<CostBreakdownLegend chartData={chartData} />}
                    verticalAlign="top"
                    align="center"
                    layout="horizontal"
                  />
                  <Tooltip content={<CostBreakdownTooltip />} />
                  <CostBreakdownPie chartData={chartData} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CostBreakdownChart;
