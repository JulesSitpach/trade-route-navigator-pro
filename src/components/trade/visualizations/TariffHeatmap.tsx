import { Card, CardContent } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { chartConfig } from "./chartConfig";
import { useTariffData } from "./tariff/useTariffData";
import TariffInsights from "./tariff/TariffInsights";
import { createAxisTitle, getChartMargins } from "@/utils/chartUtils";
import { chartCommonConfig } from "@/utils/chartUtils";

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  
  const data = payload[0].payload;
  return (
    <ChartTooltipContent
      active={active}
      payload={[
        {
          name: "Country",
          value: data.country
        },
        {
          name: "Tariff Rate",
          value: `${data.tariffRate}%`
        },
        {
          name: "Trade Volume",
          value: data.volume.toLocaleString()
        }
      ]}
    />
  );
};

const CustomXAxisTick = ({ x, y, payload }: any) => (
  <g transform={`translate(${x},${y})`}>
    <text 
      x={0} 
      y={0} 
      dy={16} 
      dx={-12} 
      textAnchor="end" 
      className="fill-muted-foreground text-xs"
      transform="rotate(-45)"
    >
      {payload.value}
    </text>
  </g>
);

const TARIFF_COLORS = {
  low: "#10b981",    // Green color for low tariffs
  medium: "#f59e0b", // Amber color for medium tariffs
  high: "#ef4444"    // Red color for high tariffs
};

const getTariffColor = (tariffRate: number): string => {
  if (tariffRate <= 5) return TARIFF_COLORS.low;
  if (tariffRate <= 15) return TARIFF_COLORS.medium;
  return TARIFF_COLORS.high;
};

const TariffHeatmap = () => {
  const { tariffData } = useTariffData();
  const margins = getChartMargins('scatter');
  const volumeValues = tariffData.map(entry => entry.volume);

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
          <div className="h-[600px]">
            <ChartContainer 
              config={chartConfig}
              height={600}
              title="Country Tariff Comparison"
              subtitle="Bubble size represents trade volume - larger bubbles indicate higher volume"
            >
              <ScatterChart margin={margins}>
                <CartesianGrid className="stroke-border/50" strokeDasharray="4 4" />
                <XAxis 
                  type="category"
                  dataKey="country"
                  name="Country"
                  tick={<CustomXAxisTick />} 
                  axisLine={{ stroke: 'currentColor', strokeWidth: 1 }}
                  tickLine={false}
                  height={60}
                  interval={0}
                  label={createAxisTitle('Countries', 'x', { offset: 60, position: 'insideBottom' })}
                  padding={{ left: 30, right: 30 }}
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate"
                  tick={{
                    fontSize: 12,
                    dx: -10,
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  domain={[0, 'dataMax + 5']}
                  label={createAxisTitle('Tariff Rate (%)', 'y', { 
                    offset: -45, 
                    position: 'insideLeft',
                    angle: -90
                  })}
                  tickFormatter={(value) => `${value}%`}
                  width={65}
                  padding={{ top: 20, bottom: 20 }}
                />
                <ChartTooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Scatter data={tariffData} name="Countries">
                  {tariffData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getTariffColor(entry.tariffRate)}
                      stroke="currentColor"
                      strokeWidth={1}
                      r={entry.volume / Math.max(...volumeValues) * 20 + 5}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
          
          <ChartLegend>
            <ChartLegendContent
              payload={[
                { value: 'Low Tariff (0-5%)', color: TARIFF_COLORS.low },
                { value: 'Medium Tariff (6-15%)', color: TARIFF_COLORS.medium },
                { value: 'High Tariff (>15%)', color: TARIFF_COLORS.high }
              ]}
            />
          </ChartLegend>
        </CardContent>
      </Card>

      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
