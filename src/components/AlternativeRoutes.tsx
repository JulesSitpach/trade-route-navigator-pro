
import { Route } from './trade/types';
import RouteCard from './trade/routes/RouteCard';

interface AlternativeRoutesProps {
  routes: Route[];
}

const AlternativeRoutes = ({ routes }: AlternativeRoutesProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Alternative Routes and Transportation Methods</h2>
        <p className="text-gray-600 mb-4">
          Strategic shipping options tailored for small and medium-sized businesses to optimize costs, 
          timeline, and market opportunities.
        </p>
      </div>
      
      {routes.map((route, index) => (
        <RouteCard key={index} route={route} />
      ))}
    </div>
  );
};

export default AlternativeRoutes;
