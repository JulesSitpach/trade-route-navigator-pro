
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

// Transform cost data from the format in CostAnalysisTab to the format needed for the chart
const useCostData = () => {
  const [costData, setCostData] = useState([
    { name: "Product Value", value: 10000, color: "#3498db" },
    { name: "Import Duty", value: 850, color: "#e74c3c" },
    { name: "Freight Cost", value: 1200, color: "#2ecc71" },
    { name: "Insurance", value: 120, color: "#f39c12" },
    { name: "Documentation Fees", value: 75, color: "#9b59b6" },
    { name: "Customs Clearance", value: 150, color: "#16a085" },
    { name: "Inland Transportation", value: 300, color: "#d35400" },
    { name: "Warehousing", value: 200, color: "#8e44ad" },
    { name: "Other Taxes and Fees", value: 180, color: "#7f8c8d" }
  ]);
  
  const { language } = useLanguage();
  
  useEffect(() => {
    if (language === 'es') {
      setCostData([
        { name: "Valor del Producto", value: 10000, color: "#3498db" },
        { name: "Arancel de Importación", value: 850, color: "#e74c3c" },
        { name: "Costo de Flete", value: 1200, color: "#2ecc71" },
        { name: "Seguro", value: 120, color: "#f39c12" },
        { name: "Tarifas de Documentación", value: 75, color: "#9b59b6" },
        { name: "Despacho Aduanero", value: 150, color: "#16a085" },
        { name: "Transporte Terrestre", value: 300, color: "#d35400" },
        { name: "Almacenaje", value: 200, color: "#8e44ad" },
        { name: "Otros Impuestos y Tarifas", value: 180, color: "#7f8c8d" }
      ]);
    } else {
      setCostData([
        { name: "Product Value", value: 10000, color: "#3498db" },
        { name: "Import Duty", value: 850, color: "#e74c3c" },
        { name: "Freight Cost", value: 1200, color: "#2ecc71" },
        { name: "Insurance", value: 120, color: "#f39c12" },
        { name: "Documentation Fees", value: 75, color: "#9b59b6" },
        { name: "Customs Clearance", value: 150, color: "#16a085" },
        { name: "Inland Transportation", value: 300, color: "#d35400" },
        { name: "Warehousing", value: 200, color: "#8e44ad" },
        { name: "Other Taxes and Fees", value: 180, color: "#7f8c8d" }
      ]);
    }
  }, [language]);

  return { costData };
};

const CostBreakdownChart = () => {
  const { costData } = useCostData();
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
