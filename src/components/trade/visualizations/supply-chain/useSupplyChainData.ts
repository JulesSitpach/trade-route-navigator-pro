
import { useState, useMemo } from 'react';
import { PackageIcon, ShipIcon, NetworkIcon, ClipboardCheckIcon, WarehouseIcon, TruckIcon, CircleDotIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { SupplyChainStep } from './types';

export const useSupplyChainData = () => {
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Supply chain diagram steps and nodes with translations
  const supplyChainSteps = useMemo<SupplyChainStep[]>(() => [
    {
      id: 'manufacturer',
      labelKey: 'supplychain.step.manufacturer',
      label: t('supplychain.step.manufacturer'),
      icon: <PackageIcon className="h-5 w-5" />,
      timeframe: '1-2 days',
      risks: ['production delays', 'quality issues'],
      cost: '15-20%',
      description: language === 'en' ? 
        'Product manufacturing and initial quality control' : 
        'Fabricación de productos y control de calidad inicial'
    },
    {
      id: 'port-origin',
      labelKey: 'supplychain.step.port.origin',
      label: t('supplychain.step.port.origin'),
      icon: <ShipIcon className="h-5 w-5" />,
      timeframe: '2-3 days',
      risks: ['port congestion', 'documentation issues'],
      cost: '5-8%',
      description: language === 'en' ? 
        'Preparation for international shipping and customs documentation' : 
        'Preparación para envío internacional y documentación aduanera'
    },
    {
      id: 'transport',
      labelKey: 'supplychain.step.transport',
      label: t('supplychain.step.transport'),
      icon: <NetworkIcon className="h-5 w-5" />,
      timeframe: '14-30 days',
      risks: ['weather delays', 'route disruptions', 'piracy'],
      cost: '25-35%',
      description: language === 'en' ? 
        'Ocean/air freight transportation between countries' : 
        'Transporte marítimo/aéreo entre países'
    },
    {
      id: 'port-destination',
      labelKey: 'supplychain.step.port.destination',
      label: t('supplychain.step.port.destination'),
      icon: <ShipIcon className="h-5 w-5" />,
      timeframe: '3-5 days',
      risks: ['customs clearance delays', 'inspection issues'],
      cost: '5-8%',
      description: language === 'en' ? 
        'Arrival processing and customs entry' : 
        'Procesamiento de llegada y entrada aduanera'
    },
    {
      id: 'customs',
      labelKey: 'supplychain.step.customs',
      label: t('supplychain.step.customs'),
      icon: <ClipboardCheckIcon className="h-5 w-5" />,
      timeframe: '2-7 days',
      risks: ['incomplete documentation', 'classification issues', 'tariff assessment'],
      cost: '10-15%',
      description: language === 'en' ? 
        'Import duties payment and compliance verification' : 
        'Pago de aranceles de importación y verificación de cumplimiento'
    },
    {
      id: 'warehouse',
      labelKey: 'supplychain.step.warehouse',
      label: t('supplychain.step.warehouse'),
      icon: <WarehouseIcon className="h-5 w-5" />,
      timeframe: '1-2 days',
      risks: ['inventory management', 'storage capacity', 'damage'],
      cost: '5-8%',
      description: language === 'en' ? 
        'Product storage and distribution preparation' : 
        'Almacenamiento de productos y preparación para distribución'
    },
    {
      id: 'distribution',
      labelKey: 'supplychain.step.distribution',
      label: t('supplychain.step.distribution'),
      icon: <TruckIcon className="h-5 w-5" />,
      timeframe: '1-5 days',
      risks: ['last-mile delivery issues', 'local disruptions'],
      cost: '8-12%',
      description: language === 'en' ? 
        'Delivery to retail locations or fulfillment centers' : 
        'Entrega a puntos de venta o centros de distribución'
    },
    {
      id: 'customer',
      labelKey: 'supplychain.step.customer',
      label: t('supplychain.step.customer'),
      icon: <CircleDotIcon className="h-5 w-5" />,
      timeframe: 'N/A',
      risks: ['order fulfillment', 'satisfaction', 'returns'],
      cost: '0-2%',
      description: language === 'en' ? 
        'Final delivery and customer satisfaction' : 
        'Entrega final y satisfacción del cliente'
    }
  ], [t, language]);

  // Calculate total transit time
  const totalTransitDays = useMemo(() => {
    return supplyChainSteps.reduce((total, step) => {
      if (step.timeframe === 'N/A') return total;
      const days = step.timeframe.split('-');
      // Use the higher end of the range for worst-case calculation
      return total + parseInt(days[days.length-1]);
    }, 0);
  }, [supplyChainSteps]);

  return {
    supplyChainSteps,
    totalTransitDays,
    activeStep,
    setActiveStep,
    language
  };
};
