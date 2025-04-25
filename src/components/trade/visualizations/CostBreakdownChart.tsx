
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartLegend,
  ChartLegendContent, 
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";
import { Donut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTradeData } from "@/contexts/TradeDataContext";

const CostBreakdownChart = () => {
  const { costItems } = useTradeData();
  const { language } = useLanguage();

  const translateLabel = (label: string): string => {
    const translations: { [key: string]: string } = {
      "Product Value": "Valor del Producto",
      "Import Duty": "Arancel de Importación",
      "Freight Cost": "Costo de Flete",
      "Insurance": "Seguro",
      "Documentation Fees": "Tarifas de Documentación",
      "Customs Clearance": "Despacho Aduanero",
      "Inland Transportation": "Transporte Terrestre",
      "Warehousing": "Almacenaje",
      "Other Taxes and Fees": "Otros Impuestos y Tarifas"
    };
    return translations[label] || label;
  };

  const chartData = costItems.map((item, index) => {
    const colors = [
      "#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6",
      "#16a085", "#d35400", "#8e44ad", "#7f8c8d"
    ];
    
    const value = parseFloat(item.value.replace(/[$,]/g, ''));
    
    return {
      name: language === 'es' ? translateLabel(item.label) : item.label,
      value: value,
      color: colors[index % colors.length]
    };
  });

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
              config={chartConfig} 
              height={400}
              className="w-full"
              title={language === 'en' ? "Cost Distribution" : "Distribución de Costos"}
            >
              <ResponsiveContainer width="100%" height={400}>
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <ChartLegend 
                    content={<ChartLegendContent />}
                    verticalAlign="top"
                    align="center"
                    layout="horizontal"
                    wrapperStyle={{ paddingBottom: "20px" }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={140}
                    innerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    cornerRadius={4}
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={800}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
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
