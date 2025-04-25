
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
  
  // Translate route description based on transport mode and characteristics
  const getTranslatedDescription = () => {
    if (language === 'en') return route.description;
    
    const transportModeKey = route.description.includes('SEA') ? 'sea' :
                             route.description.includes('AIR') ? 'air' :
                             route.description.includes('RAIL') ? 'rail' : 
                             route.description.includes('MULTIMODAL') ? 'multimodal' : 'sea';
    
    const isStandard = route.description.includes('Standard shipping service');
    const isPremium = route.description.includes('Premium service');
    const isTimeSensitive = route.description.includes('time-sensitive');
    
    // Check if the route mentions via points or direct route
    const hasViaPoints = !route.description.includes('direct route');
    
    let translatedDesc = t(`routes.description.${transportModeKey}`);
    
    // Add service type description
    if (isPremium && isTimeSensitive) {
      translatedDesc += ` ${t('routes.description.premium')}`;
    } else if (isStandard) {
      translatedDesc += ` ${t('routes.description.standard')}`;
    }
    
    // Add via points mention or direct route
    if (hasViaPoints) {
      // Extract the via points from the original description if possible
      const viaMatch = route.description.match(/via ([^.]+)/);
      const viaPoints = viaMatch ? viaMatch[1] : '';
      translatedDesc = t('routes.description.via', { points: viaPoints });
    } else {
      translatedDesc += ` ${t('routes.description.direct')}`;
    }
    
    return translatedDesc;
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
              {t('route.select')}
            </Button>
            <Button variant="outline">
              {t('route.compare')}
            </Button>
          </div>
        </div>
        
        {/* Core metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard icon={<Clock className="h-5 w-5 text-blue-500" />} 
                     title={t('route.transitTime')} 
                     value={route.transitTime} />
          <MetricCard icon={<DollarSign className="h-5 w-5 text-green-500" />} 
                     title={t('route.cost')} 
                     value={route.cost} />
          <MetricCard icon={<Shield className="h-5 w-5 text-amber-500" />} 
                     title={t('route.risk')} 
                     value={getTranslatedRiskLevel(route.riskLevel)} />
          {route.carbonFootprint && (
            <MetricCard icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} 
                       title={t('route.carbon')} 
                       value={route.carbonFootprint} />
          )}
        </div>
        
        {/* Tabs for detailed information */}
        <Tabs defaultValue="advantages" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="advantages">
              {t('routecard.smb')}
            </TabsTrigger>
            <TabsTrigger value="markets">
              {t('routecard.markets')}
            </TabsTrigger>
            <TabsTrigger value="risks">
              {t('routecard.risks')}
            </TabsTrigger>
            <TabsTrigger value="growth">
              {t('routecard.growth')}
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
