
import { Route } from '../../trade/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface RouteAdvantagesTabProps {
  route: Route;
}

const RouteAdvantagesTab = ({ route }: RouteAdvantagesTabProps) => {
  const { language, t } = useLanguage();
  
  // Sample advantages for visualization
  const smbAdvantages = [
    { 
      en: {
        title: 'Consolidated Shipping', 
        description: 'Lower costs through combined shipments'
      },
      es: {
        title: 'Envío Consolidado', 
        description: 'Costos más bajos mediante envíos combinados'
      }
    },
    { 
      en: {
        title: 'Shared Container', 
        description: 'Split container costs with other businesses'
      },
      es: {
        title: 'Contenedor Compartido', 
        description: 'Divida los costos de contenedores con otros negocios'
      }
    },
    { 
      en: {
        title: 'Flexible Pickup', 
        description: 'Accommodates irregular shipping schedules'
      },
      es: {
        title: 'Recogida Flexible', 
        description: 'Se adapta a horarios de envío irregulares'
      }
    },
    { 
      en: {
        title: 'Lower Minimum Quantity', 
        description: 'Suited for smaller order volumes'
      },
      es: {
        title: 'Menor Cantidad Mínima', 
        description: 'Adaptado para volúmenes de pedido más pequeños'
      }
    }
  ];
  
  return (
    <div className="pt-4">
      <h4 className="font-medium mb-3">
        {t('routeadvantages.title')}
      </h4>
      <div className="space-y-2">
        {smbAdvantages.map((advantage, index) => (
          <div key={index} className="flex flex-col space-y-1">
            <p className="font-medium">
              {language === 'en' ? advantage.en.title : advantage.es.title}
            </p>
            <p className="text-sm text-gray-600">
              {language === 'en' ? advantage.en.description : advantage.es.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteAdvantagesTab;
