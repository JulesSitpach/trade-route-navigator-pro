
import React from 'react';
import { useTariffData } from './useTariffData';
import { getChartTheme } from '@/components/ui/chart/chartTheme';
import { useLanguage } from '@/contexts/LanguageContext';

const TariffInsights: React.FC = () => {
  const { tariffData, getTariffInsights } = useTariffData();
  const theme = getChartTheme();
  const { t, language } = useLanguage();
  
  // Get insights data
  const { countryGroups, volumeByCategory, totalVolume } = getTariffInsights();
  
  // Find optimal trade routes (countries with lowest tariffs and high volume)
  const optimalRoutes = tariffData
    .filter(item => item.tariffRate <= 5)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 3);
  
  // Find high-risk routes (countries with high tariffs and significant volume)
  const highRiskRoutes = tariffData
    .filter(item => item.tariffRate > 15)
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 3);
  
  return (
    <div className="space-y-4">
      {/* Trade volume distribution by tariff category */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">
          {language === 'en' ? 'Trade Volume Distribution' : 'Distribución del Volumen Comercial'}
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="flex items-center mb-1">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: theme.colors.tariff.low }}
              />
              <span className="text-xs font-medium">
                {language === 'en' ? 'Low Tariff Countries' : 'Países con Aranceles Bajos'}
              </span>
            </div>
            <p className="text-lg font-semibold">
              {countryGroups.low.length} {language === 'en' ? 'countries' : 'países'}
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round((volumeByCategory.low / totalVolume) * 100)}% {language === 'en' ? 'of total volume' : 'del volumen total'}
            </p>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="flex items-center mb-1">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: theme.colors.tariff.medium }}
              />
              <span className="text-xs font-medium">
                {language === 'en' ? 'Medium Tariff Countries' : 'Países con Aranceles Medios'}
              </span>
            </div>
            <p className="text-lg font-semibold">
              {countryGroups.medium.length} {language === 'en' ? 'countries' : 'países'}
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round((volumeByCategory.medium / totalVolume) * 100)}% {language === 'en' ? 'of total volume' : 'del volumen total'}
            </p>
          </div>
          
          <div className="bg-slate-50 p-3 rounded-md">
            <div className="flex items-center mb-1">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: theme.colors.tariff.high }}
              />
              <span className="text-xs font-medium">
                {language === 'en' ? 'High Tariff Countries' : 'Países con Aranceles Altos'}
              </span>
            </div>
            <p className="text-lg font-semibold">
              {countryGroups.high.length} {language === 'en' ? 'countries' : 'países'}
            </p>
            <p className="text-xs text-muted-foreground">
              {Math.round((volumeByCategory.high / totalVolume) * 100)}% {language === 'en' ? 'of total volume' : 'del volumen total'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Recommendations */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">
          {language === 'en' ? 'Recommendations' : 'Recomendaciones'}
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Optimal trade routes */}
          <div className="bg-slate-50 p-3 rounded-md">
            <h5 className="text-xs font-medium mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              {language === 'en' ? 'Optimal Trade Routes' : 'Rutas Comerciales Óptimas'}
            </h5>
            <ul className="space-y-2">
              {optimalRoutes.map((route, index) => (
                <li key={`optimal-${index}`} className="text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">{route.country}</span>
                    <span>{route.tariffRate}% {language === 'en' ? 'tariff' : 'arancel'}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {language === 'en' ? 'Volume' : 'Volumen'}: {route.volume.toLocaleString()} {language === 'en' ? 'units' : 'unidades'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* High-risk routes */}
          <div className="bg-slate-50 p-3 rounded-md">
            <h5 className="text-xs font-medium mb-2 flex items-center">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
              {language === 'en' ? 'High-Risk Routes' : 'Rutas de Alto Riesgo'}
            </h5>
            <ul className="space-y-2">
              {highRiskRoutes.map((route, index) => (
                <li key={`risk-${index}`} className="text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">{route.country}</span>
                    <span>{route.tariffRate}% {language === 'en' ? 'tariff' : 'arancel'}</span>
                  </div>
                  <div className="text-muted-foreground">
                    {language === 'en' ? 'Volume' : 'Volumen'}: {route.volume.toLocaleString()} {language === 'en' ? 'units' : 'unidades'}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* General advice */}
      <div className="text-xs text-muted-foreground border-t pt-3">
        <p>
          {language === 'en' ? (
            <><strong>Strategy Tip:</strong> Consider diverting trade volume from high-tariff countries to low-tariff countries where possible to optimize costs. Evaluate trade agreements and special economic zones for potential tariff reductions.</>
          ) : (
            <><strong>Consejo Estratégico:</strong> Considere desviar el volumen comercial de países con altos aranceles a países con bajos aranceles cuando sea posible para optimizar costos. Evalúe acuerdos comerciales y zonas económicas especiales para posibles reducciones arancelarias.</>
          )}
        </p>
      </div>
    </div>
  );
};

export default TariffInsights;
