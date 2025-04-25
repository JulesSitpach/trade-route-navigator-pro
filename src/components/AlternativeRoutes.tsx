
import { Route } from './trade/types';
import RouteCard from './trade/routes/RouteCard';
import { useLanguage } from '@/contexts/LanguageContext';

interface AlternativeRoutesProps {
  routes: Route[];
}

const AlternativeRoutes = ({ routes }: AlternativeRoutesProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{t('routes.title')}</h2>
        <p className="text-gray-600 mb-4">
          {t('routes.description')}
        </p>
      </div>
      
      {routes.map((route, index) => (
        <RouteCard key={index} route={route} />
      ))}
    </div>
  );
};

export default AlternativeRoutes;
