
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
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, ResponsiveContainer } from "recharts";
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { useTariffData } from "./tariff/useTariffData";
import TariffLegend from "./tariff/TariffLegend";
import TariffInsights from "./tariff/TariffInsights";

// Custom tick component for rotated X-axis labels
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={25} // Increased vertical spacing for better separation
        dx={-10} // Further offset to prevent overlap 
        textAnchor="end" 
        fill="#666"
        fontSize={12}
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();
  
  // Enhanced margins with more generous spacing
  const margins = {
    top: 50,    // Increased top margin for legend and header
    right: 50,  // More space on the right side
    bottom: 140, // Much more space for rotated X-axis labels
    left: 100   // Significantly wider left margin for Y-axis labels
  };

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
          <div className="h-[600px]"> {/* Maintained increased height for better visualization */}
            <ChartContainer 
              config={chartConfig} 
              height={600}
              title="Country Tariff Comparison"
              subtitle="Bubble size represents trade volume - larger bubbles indicate higher volume"
            >
              <ScatterChart margin={margins}>
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray}
                  stroke={chartCommonConfig.grid.stroke}
                  opacity={0.2}
                />
                <XAxis 
                  type="category"
                  dataKey="country"
                  name="Country"
                  tick={<CustomXAxisTick />} 
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  height={120}   // Even more height for X-axis labels
                  interval={0}   // Show all country names
                  label={createAxisTitle('Countries', 'x', { offset: 100, position: 'insideBottom' })}
                  padding={{ left: 30, right: 30 }} // More padding to X-axis
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate"
                  tick={{
                    fontSize: 12,
                    dx: -15, // Move Y-axis ticks further from the axis
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  domain={[0, 'dataMax + 2']} // Add some padding at the top
                  label={createAxisTitle('Tariff Rate (%)', 'y', { offset: 80, position: 'insideLeft' })}
                  tickFormatter={(value) => `${value}%`}
                  width={100}    // Even wider to ensure Y-axis labels fit comfortably
                  padding={{ top: 30, bottom: 30 }} // More padding to Y-axis
                />
                <ChartLegend 
                  content={<ChartLegendContent />}
                  verticalAlign="top"
                  align="center"
                  layout="horizontal"
                />
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                  cursor={{ strokeDasharray: '3 3' }}
                />
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
                      radius={Math.max(5, Math.sqrt(entry.volume) / 1.2)} 
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
