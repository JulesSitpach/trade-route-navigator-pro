
import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  createAxisTitle,
  getChartMargins
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { useTariffData } from "./tariff/useTariffData";
import TariffLegend from "./tariff/TariffLegend";
import TariffInsights from "./tariff/TariffInsights";

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();
  
  const margins = getChartMargins({
    hasXAxisTitle: true,
    hasYAxisTitle: true,
    hasRotatedLabels: true,
    hasLegend: true,
    legendPosition: 'top'
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tariff Heatmap Analysis</h3>
        <p className="text-sm text-muted-foreground">
          Visualize tariff rates across different countries and identify opportunities for tariff optimization
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="h-[450px]">
            <ChartContainer 
              config={chartConfig} 
              height={450}
              title="Country Tariff Comparison"
              subtitle="Bubble size represents trade volume"
            >
              <ScatterChart margin={margins}>
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray}
                  stroke={chartCommonConfig.grid.stroke}
                  strokeOpacity={chartCommonConfig.grid.strokeOpacity}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  align="center"
                  layout="horizontal"
                  wrapperStyle={{ paddingBottom: "20px" }}
                />
                <XAxis 
                  type="category"
                  dataKey="country"
                  name="Country"
                  tick={chartCommonConfig.axis.tick}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  label={createAxisTitle('Countries', 'x', { offset: 5, position: 'insideBottom' })}
                  dy={10}
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate"
                  tick={chartCommonConfig.axis.tick}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={createAxisTitle('Tariff Rate (%)', 'y', { offset: 10, position: 'insideLeft' })}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Scatter 
                  data={tariffData} 
                  fill="#8884d8"
                >
                  {tariffData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getTariffColor(entry.tariffRate)}
                      stroke={getTariffColor(entry.tariffRate)}
                      strokeWidth={1}
                      radius={Math.sqrt(entry.volume) / 2}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <TariffLegend />
      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
