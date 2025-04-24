
import { LegendProps } from 'recharts';
import { legendStyles } from './theme/commonStyles';

export const ChartCustomLegend = (props: LegendProps & {
  verticalAlign?: string;
  align?: string;
  height?: number;
  wrapperStyle?: React.CSSProperties;
}) => {
  const { payload, verticalAlign, align, height, wrapperStyle } = props;
  
  if (!payload || !payload.length) return null;
  
  return (
    <div 
      style={{
        ...legendStyles.container,
        verticalAlign,
        height,
        ...wrapperStyle
      }}
    >
      {payload.map((entry, index) => (
        <div key={`legend-item-${index}`} style={legendStyles.item}>
          <div 
            style={{
              ...legendStyles.icon,
              backgroundColor: entry.color
            }} 
          />
          <span style={legendStyles.text}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

