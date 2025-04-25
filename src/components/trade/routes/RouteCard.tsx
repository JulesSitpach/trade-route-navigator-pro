
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, DollarSign, Shield, TrendingUp } from "lucide-react";
import { Route } from '../../trade/types';
import MetricCard from './MetricCard';
import RouteAdvantagesTab from './RouteAdvantagesTab';
import RouteMarketsTab from './RouteMarketsTab';
import RouteRisksTab from './RouteRisksTab';
import RouteGrowthTab from './RouteGrowthTab';
import { useLanguage } from '@/contexts/LanguageContext';

interface RouteCardProps {
  route: Route;
}

const RouteCard = ({ route }: RouteCardProps) => {
  const { language, t } = useLanguage();
  
  // Translate route description if in Spanish mode
  const getTranslatedDescription = () => {
    if (language === 'en') return route.description;
    
    // Simple translation logic for route descriptions
    if (route.description.includes('SEA freight route')) {
      return route.description.replace('SEA freight route via nearest major port. Standard shipping service.', 
        'Ruta de carga MARÍTIMA a través del puerto principal más cercano. Servicio de envío estándar.');
    } else if (route.description.includes('AIR freight')) {
      return route.description.replace('AIR freight expedited service.', 
        'Servicio acelerado de carga AÉREA.');
    } else if (route.description.includes('MULTIMODAL')) {
      return route.description.replace('MULTIMODAL route combining road and rail transport.', 
        'Ruta MULTIMODAL que combina transporte terrestre y ferroviario.');
    } else if (route.description.includes('RAIL')) {
      return route.description.replace('RAIL freight using international rail corridors.', 
        'Carga FERROVIARIA utilizando corredores ferroviarios internacionales.');
    }
    
    return route.description;
  };
  
  // Translate risk level
  const getTranslatedRiskLevel = (riskLevel: string) => {
    if (language === 'en') return riskLevel;
    
    const riskTranslations: Record<string, string> = {
      'Low': 'Bajo',
      'Medium': 'Medio',
      'High': 'Alto',
    };
    
    return riskTranslations[riskLevel] || riskLevel;
  };
  
  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        {/* Header with basic route information */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{route.path}</h3>
              {route.recommended && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  {language === 'en' ? 'Recommended' : 'Recomendada'}
                </Badge>
              )}
            </div>
            <p className="text-gray-600 text-sm">{getTranslatedDescription()}</p>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button variant="default">
              {language === 'en' ? 'Select Route' : 'Seleccionar Ruta'}
            </Button>
            <Button variant="outline">
              {language === 'en' ? 'Compare' : 'Comparar'}
            </Button>
          </div>
        </div>
        
        {/* Core metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={<Clock className="h-5 w-5 text-blue-500" />} 
                     title={language === 'en' ? "Transit Time" : "Tiempo de Tránsito"} 
                     value={route.transitTime} />
          <MetricCard icon={<DollarSign className="h-5 w-5 text-green-500" />} 
                     title={language === 'en' ? "Total Cost" : "Costo Total"} 
                     value={route.cost} />
          <MetricCard icon={<Shield className="h-5 w-5 text-amber-500" />} 
                     title={language === 'en' ? "Risk Level" : "Nivel de Riesgo"} 
                     value={getTranslatedRiskLevel(route.riskLevel)} />
          {route.carbonFootprint && (
            <MetricCard icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} 
                       title={language === 'en' ? "Carbon Footprint" : "Huella de Carbono"} 
                       value={route.carbonFootprint} />
          )}
        </div>
        
        {/* Tabs for detailed information */}
        <Tabs defaultValue="advantages" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="advantages">
              {language === 'en' ? 'SMB Advantages' : 'Ventajas PYME'}
            </TabsTrigger>
            <TabsTrigger value="markets">
              {language === 'en' ? 'Market Opportunities' : 'Oportunidades de Mercado'}
            </TabsTrigger>
            <TabsTrigger value="risks">
              {language === 'en' ? 'Risk & Finance' : 'Riesgo & Finanzas'}
            </TabsTrigger>
            <TabsTrigger value="growth">
              {language === 'en' ? 'Growth & Scaling' : 'Crecimiento & Escalabilidad'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="advantages">
            <RouteAdvantagesTab route={route} />
          </TabsContent>
          
          <TabsContent value="markets">
            <RouteMarketsTab route={route} />
          </TabsContent>
          
          <TabsContent value="risks">
            <RouteRisksTab route={route} />
          </TabsContent>
          
          <TabsContent value="growth">
            <RouteGrowthTab route={route} />
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
};

export default RouteCard;
