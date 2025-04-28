
import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell,
  Label
} from 'recharts';
import { RiskMatrixTooltip } from '../risk/RiskMatrixTooltip';
import { cursorStyles, tooltipStyles } from '@/components/ui/chart/theme/commonStyles';
import { getChartTheme } from '@/components/ui/chart/chartTheme';

interface RiskData {
  name: string;
  x: number;
  y: number;
  z: number;
  label: string;
  riskLevel: string;
  details: string;
}

interface RiskScatterChartProps {
  data: RiskData[];
  activeRiskType: string | null;
  language: string;
}

const RiskScatterChart: React.FC<RiskScatterChartProps> = ({ 
  data, 
  activeRiskType, 
  language 
}) => {
  const filterData = (data: RiskData[]) => {
    if (!activeRiskType) return data;
    return data.filter(item => item.riskLevel === activeRiskType);
  };

  const theme = getChartTheme();

  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case "high": return theme.colors.risk.high;
      case "medium": return theme.colors.risk.medium;
      case "low": return theme.colors.risk.low;
      default: return "#ccc";
    }
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme.grid.stroke} opacity={0.5} />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Cost" 
            unit="$" 
            domain={['dataMin - 500', 'dataMax + 500']}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            axisLine={{ stroke: theme.colors.grid, strokeWidth: 1 }}
            tick={{
              fontSize: theme.typography.fontSize.axis,
              fill: theme.colors.text
            }}
          >
            <Label 
              value={language === 'en' ? "Cost (USD)" : "Costo (USD)"} 
              position="bottom" 
              style={{ textAnchor: 'middle', fill: theme.colors.text, fontSize: 14, fontWeight: 500 }}
              offset={20} 
            />
          </XAxis>
          <YAxis 
            type="number" 
            dataKey="y" 
            name="Risk Level" 
            unit="/10"
            domain={[0, 10]}
            tickCount={6}
            axisLine={{ stroke: theme.colors.grid, strokeWidth: 1 }}
            tick={{
              fontSize: theme.typography.fontSize.axis,
              fill: theme.colors.text
            }}
          >
            <Label 
              value={language === 'en' ? "Risk Level" : "Nivel de Riesgo"} 
              angle={-90} 
              position="left" 
              style={{ textAnchor: 'middle', fill: theme.colors.text, fontSize: 14, fontWeight: 500 }}
              offset={-25} 
            />
          </YAxis>
          <ZAxis 
            type="number" 
            dataKey="z" 
            range={[60, 400]} 
            name="Reliability" 
            unit="%" 
          />
          <Tooltip 
            content={<RiskMatrixTooltip />}
            cursor={cursorStyles.scatter}
            wrapperStyle={tooltipStyles.wrapper}
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            align="center"
            wrapperStyle={{
              paddingBottom: '20px',
              fontSize: '12px'
            }}
            formatter={(value) => <span style={{ color: theme.colors.text, fontWeight: 500 }}>{language === 'en' ? value : value === "Shipping Routes" ? "Rutas de Envío" : value}</span>} 
          />
          <Scatter 
            name={language === 'en' ? "Shipping Routes" : "Rutas de Envío"} 
            data={filterData(data)}
          >
            {
              data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getRiskColor(entry.riskLevel)} 
                  stroke={getRiskColor(entry.riskLevel)}
                  strokeWidth={1}
                  fillOpacity={0.7}
                />
              ))
            }
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskScatterChart;
