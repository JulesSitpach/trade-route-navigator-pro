import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  createAxisTitle
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig, chartDimensions } from "@/utils/chartUtils";
import { useTariffData } from "./tariff/useTariffData";
import TariffLegend from "./tariff/TariffLegend";
import TariffInsights from "./tariff/TariffInsights";

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();

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
            <ChartContainer config={chartConfig}>
              <ScatterChart margin={chartCommonConfig.margins.withXLabels}>
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray}
                  stroke={chartCommonConfig.grid.stroke}
                  strokeOpacity={chartCommonConfig.grid.strokeOpacity}
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  align="center"
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
                  height={80}
                  label={createAxisTitle('Countries', 'x', { offset: 30 })}
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate"
                  tick={chartCommonConfig.axis.tick}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={createAxisTitle('Tariff Rate (%)', 'y', { offset: 10 })}
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
