
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
  
  const getTranslatedDescription = () => {
    const transportMode = route.description.includes('SEA') ? 'sea' :
                         route.description.includes('AIR') ? 'air' :
                         route.description.includes('RAIL') ? 'rail' : 
                         route.description.includes('MULTIMODAL') ? 'multimodal' : 'sea';
    
    const serviceType = route.description.includes('Premium service') ? 'premium' : 'standard';
    
    const transportText = t(`routes.description.${transportMode}`);
    const serviceText = t(`routes.description.${serviceType}`);
    
    const viaMatch = route.description.match(/via ([^.]+)/);
    if (viaMatch) {
      const viaText = t('routes.description.via').replace('{{points}}', viaMatch[1]);
      return `${transportText} ${viaText} ${serviceText}`;
    }
    
    return `${transportText} ${t('routes.description.direct')} ${serviceText}`;
  };
  
  const getTranslatedRiskLevel = (riskLevel: string) => {
    if (language === 'en') return riskLevel;
    
    const riskTranslations: Record<string, string> = {
      'Low': 'Bajo',
      'Medium': 'Medio',
      'High': 'Alto',
    };
    
    return riskTranslations[riskLevel] || riskLevel;
  };
  
  // Define tabs with proper translation keys
  const tabs = [
    { value: 'advantages', translationKey: 'routecard.smb' },
    { value: 'markets', translationKey: 'routecard.markets' },
    { value: 'risks', translationKey: 'routecard.risks' },
    { value: 'growth', translationKey: 'routecard.growth' }
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{route.path}</h3>
              {route.recommended && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  {t('route.recommended')}
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
        
        <Tabs defaultValue="advantages" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4">
            {tabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {t(tab.translationKey)}
              </TabsTrigger>
            ))}
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
