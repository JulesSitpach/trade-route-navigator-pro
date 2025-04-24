import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Cell, Tooltip, ResponsiveContainer, ZAxis, Legend 
} from "recharts";
import { useTariffData } from "./tariff/useTariffData";
import { createAxisTitle, getTariffColor } from "@/utils/chartUtils";
import { useChartResponsiveStyles } from "@/hooks/use-chart-responsive-styles";
import { TariffTooltip } from './tariff/TariffTooltip';
import { TariffAxisTick } from './tariff/TariffAxisTick';
import { tooltipStyles, cursorStyles } from "@/components/ui/chart/theme/commonStyles";
import { ChartCustomLegend } from '@/components/ui/chart/ChartCustomLegend';
import { chartConfig } from "./chartConfig";
import { chartCommonConfig } from "@/utils/chartUtils";
import { lightTheme } from "@/components/ui/chart/chartTheme";
import { formatCurrency } from "@/components/ui/chart/chartUtils";
import { calculateBubbleSize } from "@/components/ui/chart/theme/commonStyles";

const RiskAssessmentMatrix = () => {
  // Sample risk assessment data
  const riskData = [
    { x: 2450, y: 7, z: 100, name: "Shanghai → Panama → LA → Chicago", riskLevel: "medium", label: "Standard Ocean Route" },
    { x: 5650, y: 2, z: 80, name: "Shanghai → LA → Chicago (Air)", riskLevel: "low", label: "Express Air Route" },
    { x: 2200, y: 7, z: 90, name: "Vietnam → Singapore → LA → Chicago", riskLevel: "high", label: "Alternative Ocean Route" },
    { x: 3100, y: 4, z: 70, name: "China → Mexico → US (USMCA)", riskLevel: "medium", label: "Triangular Trade Route" },
    { x: 2800, y: 3, z: 60, name: "Shanghai → Rotterdam → US East Coast", riskLevel: "low", label: "East Coast Route" }
  ];

  // Function to determine color based on risk level
  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case "high": return chartConfig.highRisk.color;
      case "medium": return chartConfig.mediumRisk.color;
      case "low": return chartConfig.lowRisk.color;
      default: return "#ccc";
    }
  };

  // Extract z values for proper bubble sizing
  const zValues = riskData.map(item => item.z);
  const minZ = Math.min(...zValues);
  const maxZ = Math.max(...zValues);
  const { tariffData } = useTariffData();
  const margins = { top: 30, right: 20, bottom: 60, left: 60 };
  const chartStyles = useChartResponsiveStyles();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Risk Assessment Matrix</h3>
        <p className="text-sm text-muted-foreground">
          Compare routes based on cost vs. risk factors to find your optimal balance
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {/* Replace custom legend with ChartCustomLegend */}
          <div className="h-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={margins}>
                <CartesianGrid 
                  strokeDasharray={chartCommonConfig.grid.strokeDasharray} 
                  stroke={chartCommonConfig.grid.stroke}
                  opacity={0.15}
                />
                <XAxis 
                  type="number"
                  dataKey="x"
                  name="Cost"
                  domain={[2000, 6000]}
                  tickCount={5}
                  tickFormatter={(value) => formatCurrency(value)}
                  tick={{
                    fontSize: 12,
                    fill: lightTheme.colors.text,
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={createAxisTitle('Total Route Cost', 'x', { offset: 40 })}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="Risk Score"
                  domain={[0, 10]}
                  tickCount={6}
                  tick={{
                    fontSize: 12,
                    fill: lightTheme.colors.text,
                  }}
                  axisLine={chartCommonConfig.axis.line}
                  tickLine={false}
                  label={createAxisTitle('Risk Level (0-10)', 'y', { offset: 35 })}
                />
                <ZAxis
                  type="number"
                  dataKey="z"
                  range={[60, 200]}
                  name="Reliability"
                />
                <Tooltip 
                  content={<TariffTooltip />} 
                  cursor={cursorStyles.scatter}
                  wrapperStyle={tooltipStyles.wrapper}
                  contentStyle={tooltipStyles.contentStyle}
                />
                <Legend 
                  content={<ChartCustomLegend />}
                  verticalAlign="top"
                  align="center"
                  height={36}
                  wrapperStyle={{ paddingBottom: '20px' }}
                />
                <Scatter data={riskData} fill={lightTheme.colors.primary}>
                  {riskData.map((entry, index) => {
                    const size = calculateBubbleSize(entry.z, minZ, maxZ);
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={getRiskColor(entry.riskLevel)}
                        stroke={getRiskColor(entry.riskLevel)}
                        strokeWidth={2}
                        r={size}
                      />
                    );
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentMatrix;
