
import React from 'react';
import { getChartTheme } from '@/components/ui/chart/chartTheme';
import { useLanguage } from '@/contexts/LanguageContext';

const TariffLegend: React.FC = () => {
  const theme = getChartTheme();
  const { language } = useLanguage();
  
  return (
    <div className="bg-white rounded-md border p-4 shadow-sm">
      <h4 className="text-sm font-medium mb-3">
        {language === 'en' ? 'Tariff Categories Legend' : 'Leyenda de Categorías Arancelarias'}
      </h4>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: theme.colors.tariff.low }}
          />
          <div>
            <p className="text-sm font-medium">
              {language === 'en' ? 'Low Tariff (0-5%)' : 'Arancel Bajo (0-5%)'}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' 
                ? 'Minimal to no trade barriers, ideal for cost-effective importing'
                : 'Barreras comerciales mínimas o inexistentes, ideal para importaciones rentables'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: theme.colors.tariff.medium }}
          />
          <div>
            <p className="text-sm font-medium">
              {language === 'en' ? 'Medium Tariff (6-15%)' : 'Arancel Medio (6-15%)'}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' 
                ? 'Moderate trade barriers that may impact cost calculations'
                : 'Barreras comerciales moderadas que pueden impactar en los cálculos de costos'
              }
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: theme.colors.tariff.high }}
          />
          <div>
            <p className="text-sm font-medium">
              {language === 'en' ? 'High Tariff (>15%)' : 'Arancel Alto (>15%)'}
            </p>
            <p className="text-xs text-muted-foreground">
              {language === 'en' 
                ? 'Significant trade barriers that require careful cost consideration'
                : 'Barreras comerciales significativas que requieren una cuidadosa consideración de costos'
              }
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t">
        <p className="text-xs text-muted-foreground">
          {language === 'en' 
            ? <><strong>Note:</strong> Bubble size represents trade volume in units. Larger bubbles indicate higher trade volume with the corresponding country.</>
            : <><strong>Nota:</strong> El tamaño de la burbuja representa el volumen comercial en unidades. Las burbujas más grandes indican mayor volumen comercial con el país correspondiente.</>
          }
        </p>
      </div>
    </div>
  );
};

export default TariffLegend;
