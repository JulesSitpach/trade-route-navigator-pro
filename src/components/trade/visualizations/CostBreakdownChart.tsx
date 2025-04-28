
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { PieChartIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { calculateCostBreakdown, CostBreakdownInput } from "./utils/costBreakdownCalculations";
import CostBreakdownPie from "./components/CostBreakdownPie";
import CostBreakdownLegend from "./components/CostBreakdownLegend";
import CostBreakdownTooltip from "./components/CostBreakdownTooltip";
import { CHART_COLORS } from "@/constants/chartStyles";

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

  console.log("CostBreakdownChart inputs:", {
    productValue,
    originCountry,
    destinationCountry,
    productCategory,
    transportMode,
    quantity,
    weight
  });

  const rawChartData = calculateCostBreakdown({
    productValue,
    originCountry,
    destinationCountry,
    productCategory,
    transportMode,
    quantity,
    weight
  }, language);
  
  // Calculate total for percentages
  const totalValue = rawChartData.reduce((sum, item) => sum + Number(item.value), 0);
  
  // Add percentage to each item
  const chartData = rawChartData.map((item, index) => ({
    ...item,
    color: item.color || CHART_COLORS.primary[index % CHART_COLORS.primary.length],
    percentage: ((Number(item.value) / totalValue) * 100).toFixed(1)
  }));

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
            <div className="w-full" style={{ height: '400px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CostBreakdownLegend chartData={chartData} />
                  <Tooltip content={<CostBreakdownTooltip />} />
                  <CostBreakdownPie chartData={chartData} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CostBreakdownChart;
