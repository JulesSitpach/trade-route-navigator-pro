
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { SeasonalityChart } from "@/components/ui/chart";
import { LineChartIcon } from "lucide-react";
import { useSeasonalityData } from "./seasonality/useSeasonalityData";
import { useLanguage } from '@/contexts/LanguageContext';

const SeasonalityGraph = () => {
  const { seasonalityData, loading, error } = useSeasonalityData();
  const { language } = useLanguage();

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <LineChartIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Seasonality Analysis' : 'Análisis de Estacionalidad'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {language === 'en' 
          ? 'Track how shipping costs, transit times, and risks fluctuate throughout the year'
          : 'Siga cómo los costos de envío, tiempos de tránsito y riesgos fluctúan a lo largo del año'
        }
      </p>
      
      <Card>
        <CardContent className="p-6">
          {loading ? (
            <div className="text-center text-muted-foreground py-12">
              {language === 'en' ? 'Loading seasonality data...' : 'Cargando datos de estacionalidad...'}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-12">
              {error}
            </div>
          ) : seasonalityData.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {language === 'en' ? 'No seasonality data available' : 'No hay datos de estacionalidad disponibles'}
            </div>
          ) : (
            <SeasonalityChart 
              data={seasonalityData}
              title={language === 'en' ? "Annual Shipping Trends" : "Tendencias Anuales de Envío"}
              subtitle={language === 'en' 
                ? "Monthly freight costs, congestion, and risk indicators"
                : "Costos de flete mensuales, congestion y indicadores de riesgo"
              }
              legendProps={{
                verticalAlign: "top",
                align: "center",
                wrapperStyle: {
                  paddingBottom: '20px',
                  display: 'flex',
                  justifyContent: 'center'
                }
              }}
            />
          )}
        </CardContent>
      </Card>

      {seasonalityData.length > 0 && (
        <div className="text-sm mt-6">
          <p className="font-medium mb-2">
            {language === 'en' ? 'Key Seasonal Factors:' : 'Factores Estacionales Clave:'}
          </p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>
              {language === 'en' 
                ? 'Q4 shipping rates peak during holiday season (October-December)'
                : 'Las tarifas de envío de Q4 alcanzan su máximo durante la temporada navideña (octubre-diciembre)'
              }
            </li>
            <li>
              {language === 'en' 
                ? 'Chinese New Year (January-February) causes manufacturing delays'
                : 'El Año Nuevo Chino (enero-febrero) causa retrasos en la fabricación'
              }
            </li>
            <li>
              {language === 'en' 
                ? 'Summer months show increased port congestion'
                : 'Los meses de verano muestran mayor congestión portuaria'
              }
            </li>
            <li>
              {language === 'en' 
                ? 'Consider shipping in Q2 for optimal balance of cost and efficiency'
                : 'Considere envíos en Q2 para un balance óptimo entre costo y eficiencia'
              }
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SeasonalityGraph;
