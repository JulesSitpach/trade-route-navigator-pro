
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartLegend } from "@/components/ui/chart";
import { PieChart as PieChartIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { calculateCostBreakdown, CostBreakdownInput } from "./utils/costBreakdownCalculations";
import CostBreakdownPie from "./components/CostBreakdownPie";
import CostBreakdownLegend from "./components/CostBreakdownLegend";
import CostBreakdownTooltip from "./components/CostBreakdownTooltip";
import { enhancedColors } from '@/utils/chart/enhancedColors';
import { chartConfig } from '@/components/ui/chart/config';

// Enhanced vibrant colors for the chart segments
const colorPalette = [
  enhancedColors.blue,      // Bright Blue
  enhancedColors.purple,    // Purple
  enhancedColors.red,       // Red
  enhancedColors.orange,    // Orange
  enhancedColors.teal,      // Teal
  enhancedColors.green,     // Green
  enhancedColors.darkOrange,// Dark Orange
  enhancedColors.darkPurple,// Dark Purple
  enhancedColors.darkBlue,  // Dark Blue
  enhancedColors.turquoise  // Turquoise
];

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

  // Get raw cost breakdown data
  const rawChartData = calculateCostBreakdown({
    productValue,
    originCountry,
    destinationCountry,
    productCategory,
    transportMode,
    quantity,
    weight
  }, language);
  
  // Enhance with vibrant colors
  const chartData = rawChartData.map((item, index) => ({
    ...item,
    color: colorPalette[index % colorPalette.length]
  }));

  // Log the chart data to check if we're getting values
  console.log("Cost Breakdown Chart Data:", chartData);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <PieChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Cost Breakdown Analysis' : 'Análisis de Desglose de Costos'}
        </h3>
      </div>
      
      <Card className="border shadow">
        <CardContent className="p-6">
          {chartData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {language === 'en' 
                ? 'No cost breakdown data available. Please complete all required fields above.' 
                : 'No hay datos de desglose de costos disponibles. Complete todos los campos requeridos arriba.'
              }
            </div>
          ) : (
            <ChartContainer 
              height={400} 
              className="w-full"
              config={chartConfig}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <ChartLegend>
                    <CostBreakdownLegend chartData={chartData} />
                  </ChartLegend>
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
