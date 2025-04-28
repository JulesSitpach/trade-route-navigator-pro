
import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Donut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { calculateTariff } from '@/data/countryTariffData';
import { calculateFreightCost } from '../data/calculations/freightCosts';
import { calculateInlandTransportation } from '../data/calculations/inlandTransportation';
import { formatCurrency } from '../data/utils/formatters';
import { getCategoryColor } from '@/utils/chartUtils';

interface CostBreakdownChartProps {
  productValue: number;
  originCountry: string;
  destinationCountry: string;
  productCategory: string;
  transportMode: string;
  quantity: number;
  weight: number;
}

const CostBreakdownChart = ({
  productValue,
  originCountry,
  destinationCountry,
  productCategory,
  transportMode,
  quantity,
  weight
}: CostBreakdownChartProps) => {
  const { language } = useLanguage();

  const totalProductValue = productValue * quantity;
  const importDutyRate = calculateTariff(originCountry, destinationCountry, productCategory);
  const importDuty = (totalProductValue * importDutyRate) / 100;
  
  const freightCost = calculateFreightCost(weight, productValue, transportMode, quantity);
  
  const insuranceRate = 1.5;
  const insuranceRateAdjustment = totalProductValue > 10000 ? 1.2 : 1;
  const insurance = Math.max((totalProductValue * insuranceRate * insuranceRateAdjustment) / 100, 50);
  
  const documentationFees = transportMode === 'air' ? 95 : 125;
  
  const customsClearance = Math.max(175, totalProductValue * 0.01) * (totalProductValue > 50000 ? 1.2 : 1);
  
  const inlandTransportation = calculateInlandTransportation(
    originCountry,
    destinationCountry,
    transportMode,
    quantity,
    weight,
    totalProductValue,
    productCategory
  );
  
  const warehouseDailyRate = transportMode === 'air' ? 1.5 : 4;
  const estimatedDays = transportMode === 'air' ? 2 : 7;
  const warehouseBaseCharge = transportMode === 'air' ? 75 : 100;
  const quantityFactor = Math.min(Math.sqrt(quantity) * 1.2, quantity * 0.3);
  const warehouseCostRaw = warehouseBaseCharge + 
    (warehouseDailyRate * estimatedDays * quantityFactor) * 
    (totalProductValue > 20000 ? 1.15 : 1);
  const warehouseCost = Math.min(warehouseCostRaw, transportMode === 'air' ? 800 : 2000);
  
  const otherFeesRate = totalProductValue > 15000 ? 2.5 : 2.0;
  const otherFees = (totalProductValue * otherFeesRate) / 100;

  // Create categories that match our universal chart guidelines
  const chartData = [
    {
      name: language === 'es' ? 'Arancel de Importación' : 'Import Duty',
      value: importDuty,
      category: 'importDuty'
    },
    {
      name: language === 'es' ? 'Costo de Flete' : 'Freight Cost',
      value: freightCost,
      category: 'freight'
    },
    {
      name: language === 'es' ? 'Seguro' : 'Insurance',
      value: insurance,
      category: 'insurance'
    },
    {
      name: language === 'es' ? 'Tarifas de Documentación' : 'Documentation Fees',
      value: documentationFees,
      category: 'documentation'
    },
    {
      name: language === 'es' ? 'Despacho Aduanero' : 'Customs Clearance',
      value: customsClearance,
      category: 'customs'
    },
    {
      name: language === 'es' ? 'Transporte Terrestre' : 'Inland Transportation',
      value: inlandTransportation,
      category: 'shipping'
    },
    {
      name: language === 'es' ? 'Almacenaje' : 'Warehousing',
      value: warehouseCost,
      category: 'warehousing'
    },
    {
      name: language === 'es' ? 'Otros Impuestos y Tarifas' : 'Other Taxes and Fees',
      value: otherFees,
      category: 'customs'
    }
  ].filter(item => item.value > 0);

  // Get colors based on our chart guidelines
  const getItemColor = (category: string) => {
    return getCategoryColor(category);
  };

  const renderLabel = (entry: any) => {
    const percentage = ((entry.value / chartData.reduce((sum: number, item: any) => sum + item.value, 0)) * 100).toFixed(1);
    return percentage > 5 ? `${percentage}%` : '';
  };

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
            >
              <ResponsiveContainer width="100%" height={400}>
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <ChartLegend 
                    content={<ChartLegendContent />}
                    verticalAlign="top"
                    align="center"
                    layout="horizontal"
                  />
                  <Tooltip 
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => [
                          formatCurrency(Number(value)), 
                          name
                        ]}
                      />
                    } 
                  />
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
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getItemColor(entry.category)}
                        stroke={getItemColor(entry.category)}
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
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
