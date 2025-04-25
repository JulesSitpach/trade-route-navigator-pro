
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { Route } from '../../trade/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface RouteMarketsTabProps {
  route: Route;
}

const RouteMarketsTab = ({ route }: RouteMarketsTabProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4 pt-4">
      <div className="space-y-4">
        <h4 className="font-medium flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {t('markets.emerging.title')}
        </h4>
        
        {route.emergingMarkets?.hubs && route.emergingMarkets.hubs.length > 0 && (
          <div className="space-y-1">
            <div className="font-medium text-sm">{t('markets.hubs.title')}</div>
            <div className="flex flex-wrap gap-2">
              {route.emergingMarkets.hubs.map((hub, i) => (
                <Badge key={i} variant="outline" className="bg-amber-50">{hub}</Badge>
              ))}
            </div>
          </div>
        )}
        
        {route.emergingMarkets?.growthPotential && (
          <div className="text-sm">
            <span className="font-medium">{t('markets.growth.title')}</span> {t('markets.growth.level')}
          </div>
        )}
        
        {route.emergingMarkets?.economicZones && route.emergingMarkets.economicZones.length > 0 && (
          <div className="space-y-1">
            <div className="font-medium text-sm">{t('markets.zones.title')}</div>
            <div className="flex flex-wrap gap-2">
              {route.emergingMarkets.economicZones.map((zone, i) => (
                <Badge key={i} variant="outline" className="bg-blue-50">{zone}</Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteMarketsTab;
