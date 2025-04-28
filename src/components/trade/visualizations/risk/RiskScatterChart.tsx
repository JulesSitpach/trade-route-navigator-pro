
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
import { cursorStyles } from '@/components/ui/chart/theme/commonStyles';

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

  const getRiskColor = (riskLevel: string) => {
    switch(riskLevel) {
      case "high": return "#ef4444";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#ccc";
    }
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 20, right: 30, bottom: 60, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
          <XAxis 
            type="number" 
            dataKey="x" 
            name="Cost" 
            unit="$" 
            domain={['dataMin - 500', 'dataMax + 500']}
            tickFormatter={(value) => `$${value}`}
            axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            tick={{
              fontSize: 12,
              fill: '#4b5563'
            }}
          >
            <Label 
              value={language === 'en' ? "Cost (USD)" : "Costo (USD)"} 
              position="bottom" 
              style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
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
            axisLine={{ stroke: '#9ca3af', strokeWidth: 1 }}
            tick={{
              fontSize: 12,
              fill: '#4b5563'
            }}
          >
            <Label 
              value={language === 'en' ? "Risk Level" : "Nivel de Riesgo"} 
              angle={-90} 
              position="left" 
              style={{ textAnchor: 'middle', fill: '#4b5563', fontSize: 14, fontWeight: 500 }}
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
          />
          <Legend 
            verticalAlign="top" 
            height={36}
            align="center"
            wrapperStyle={{
              paddingBottom: '20px',
              fontSize: '12px'
            }}
            formatter={(value) => <span style={{ color: '#4b5563', fontWeight: 500 }}>{value}</span>} 
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
