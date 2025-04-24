
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

// Enhanced custom tick component for X-axis labels
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        dx={-12} 
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

// Enhanced Y-axis tick component for better spacing
const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dx={-10}
        textAnchor="end"
        fill="#666"
        fontSize={12}
      >
        {`${payload.value}%`}
      </text>
    </g>
  );
};

// Custom tooltip content for better display
const CustomTooltipContent = (props: any) => {
  const { active, payload } = props;
  
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="font-semibold">{`Country: ${data.country}`}</p>
        <p className="text-sm">{`Tariff Rate: ${data.tariffRate}%`}</p>
        <p className="text-sm">{`Trade Volume: ${data.volume.toLocaleString()}`}</p>
      </div>
    );
  }
  
  return null;
};

const TariffHeatmap = () => {
  const { tariffData, getTariffColor } = useTariffData();
  
  // Adjusted margins for better spacing
  const margins = {
    top: 40,     // Top margin for legend
    right: 40,   // Increased right margin
    bottom: 100, // Increased bottom margin for X-axis labels
    left: 80     // Increased left margin for Y-axis labels
  };

  // Calculate bubble size based on volume - ensures proper scaling
  const calculateBubbleSize = (volume: number): number => {
    const minRadius = 5;
    const maxRadius = 20;
    const minVolume = Math.min(...tariffData.map(d => d.volume));
    const maxVolume = Math.max(...tariffData.map(d => d.volume));
    
    if (minVolume === maxVolume) return (minRadius + maxRadius) / 2;
    
    const scale = (volume - minVolume) / (maxVolume - minVolume);
    return minRadius + scale * (maxRadius - minRadius);
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
          <div className="h-[600px]">
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
                  opacity={0.3}
                />
                <XAxis 
                  type="category"
                  dataKey="country"
                  name="Country"
                  tick={<CustomXAxisTick />} 
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  height={80}
                  interval={0}
                  label={createAxisTitle('Countries', 'x', { offset: 60, position: 'insideBottom' })}
                  padding={{ left: 40, right: 40 }}
                />
                <YAxis
                  type="number"
                  dataKey="tariffRate"
                  name="Tariff Rate"
                  tick={<CustomYAxisTick />}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  domain={[0, 'dataMax + 5']}
                  label={createAxisTitle('Tariff Rate (%)', 'y', { offset: 60, position: 'insideLeft', angle: -90 })}
                  width={60}
                  padding={{ top: 20, bottom: 20 }}
                />
                <ChartTooltip 
                  content={<CustomTooltipContent />}
                  cursor={{ strokeDasharray: '3 3' }}
                />
                <Scatter 
                  data={tariffData} 
                  name="Countries"
                >
                  {tariffData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getTariffColor(entry.tariffRate)}
                      stroke={getTariffColor(entry.tariffRate)}
                      strokeWidth={1}
                      radius={calculateBubbleSize(entry.volume)}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
          
          {/* Custom standalone legend with proper styling */}
          <div className="flex justify-center mt-4 space-x-8">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-sm">Low Tariff (0-5%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
              <span className="text-sm">Medium Tariff (6-15%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-sm">High Tariff (>15%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <TariffInsights />
    </div>
  );
};

export default TariffHeatmap;
