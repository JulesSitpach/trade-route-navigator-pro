
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
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateCostItems } from "../data/costData";

interface CostBreakdownChartProps {
  productValue?: number;
  shippingData?: {
    quantity: string;
    weight: string;
    transportMode: string;
  };
}

// Transform cost data from costData.ts to chart format
const useCostData = (props: CostBreakdownChartProps) => {
  const { language } = useLanguage();
  const [costData, setCostData] = useState([]);

  useEffect(() => {
    // Get cost items with user's product value or fall back to 0
    const productValue = props.productValue || 0;
    
    // Generate cost items based on actual user data
    const items = generateCostItems({
      productValue,
      shippingData: props.shippingData || {
        quantity: '1',
        weight: '0',
        transportMode: 'sea'
      }
    });
    
    // Transform to chart data format with colors
    const chartData = items.map((item, index) => {
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

    setCostData(chartData);
  }, [language, props.productValue, props.shippingData]);

  return { costData };
};

// Helper function to translate labels to Spanish
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

const CostBreakdownChart = ({ productValue, shippingData }: CostBreakdownChartProps) => {
  const { costData } = useCostData({ productValue, shippingData });
  const { t, language } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Donut className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Cost Breakdown Analysis' : 'Análisis de Desglose de Costos'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {language === 'en' 
          ? 'Visualize the distribution of costs across different components in your supply chain'
          : 'Visualice la distribución de costos entre los diferentes componentes de su cadena de suministro'
        }
      </p>
      
      <Card>
        <CardContent className="p-6">
          {costData.length === 0 ? (
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
                    data={costData}
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
                    {costData.map((entry, index) => (
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
