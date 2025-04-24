
import React from 'react';
import { getChartTheme } from '@/components/ui/chart/chartTheme';

const TariffLegend: React.FC = () => {
  const theme = getChartTheme();
  
  return (
    <div className="bg-white rounded-md border p-4 shadow-sm">
      <h4 className="text-sm font-medium mb-3">Tariff Categories Legend</h4>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: theme.colors.tariff.low }}
          />
          <div>
            <p className="text-sm font-medium">Low Tariff (0-5%)</p>
            <p className="text-xs text-muted-foreground">
              Minimal to no trade barriers, ideal for cost-effective importing
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: theme.colors.tariff.medium }}
          />
          <div>
            <p className="text-sm font-medium">Medium Tariff (6-15%)</p>
            <p className="text-xs text-muted-foreground">
              Moderate trade barriers that may impact cost calculations
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: theme.colors.tariff.high }}
          />
          <div>
            <p className="text-sm font-medium">High Tariff (>15%)</p>
            <p className="text-xs text-muted-foreground">
              Significant trade barriers that require careful cost consideration
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> Bubble size represents trade volume in units. Larger bubbles indicate higher trade volume with the corresponding country.
        </p>
      </div>
    </div>
  );
};

export default TariffLegend;
