
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { NetworkIcon, TruckIcon, PackageIcon, WarehouseIcon, ShipIcon, ClipboardCheckIcon, CircleDotIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from "@/components/ui/badge";

const SupplyChainFlowDiagram = () => {
  const { t, language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Supply chain diagram steps and nodes with translations
  const supplyChainSteps = [
    {
      id: 'manufacturer',
      labelKey: 'supplychain.step.manufacturer',
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
      icon: <CircleDotIcon className="h-5 w-5" />,
      timeframe: 'N/A',
      risks: ['order fulfillment', 'satisfaction', 'returns'],
      cost: '0-2%',
      description: language === 'en' ? 
        'Final delivery and customer satisfaction' : 
        'Entrega final y satisfacción del cliente'
    }
  ];

  // Calculate total transit time
  const totalTransitDays = supplyChainSteps.reduce((total, step) => {
    if (step.timeframe === 'N/A') return total;
    const days = step.timeframe.split('-');
    // Use the higher end of the range for worst-case calculation
    return total + parseInt(days[days.length-1]);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <NetworkIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {t('supplychain.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('supplychain.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">{language === 'en' ? 'Est. Total Transit:' : 'Tránsito Total Est.:'}</span> {totalTransitDays} {language === 'en' ? 'days (maximum)' : 'días (máximo)'}
              </div>
              <div className="text-sm">
                <span className="font-medium">{language === 'en' ? 'Critical Paths:' : 'Rutas Críticas:'}</span> {language === 'en' ? 'Transport, Customs' : 'Transporte, Aduanas'}
              </div>
            </div>
          </div>

          <div className="h-[400px] flex flex-col items-center justify-center border rounded-lg bg-gray-50 overflow-x-auto">
            <div className="min-w-[800px] w-full px-4 py-8">
              {/* Supply chain flow visualization */}
              <div className="flex justify-between items-center relative">
                {/* Connection lines with directional flow */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-100 to-blue-300 -z-10"></div>
                {/* Directional arrows */}
                {supplyChainSteps.slice(0, -1).map((_, index) => (
                  <div key={`arrow-${index}`} className="absolute" style={{ left: `${(index + 1) * (100 / supplyChainSteps.length) - 1.5}%`, top: 'calc(50% - 6px)' }}>
                    <div className="w-3 h-3 border-t-2 border-r-2 border-blue-400 transform rotate-45"></div>
                  </div>
                ))}
                
                {/* Nodes */}
                {supplyChainSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div 
                      className={`w-14 h-14 rounded-full ${activeStep === index ? 'bg-blue-100 border-2 border-blue-500' : 'bg-blue-50 border border-blue-300'} flex items-center justify-center mb-2 z-10 cursor-pointer transition-all hover:bg-blue-200`}
                      onClick={() => setActiveStep(activeStep === index ? null : index)}
                    >
                      <div className="flex flex-col items-center justify-center">
                        {React.cloneElement(step.icon, { className: `h-5 w-5 ${activeStep === index ? 'text-blue-700' : 'text-blue-500'}` })}
                        <span className={`text-xs mt-0.5 ${activeStep === index ? 'font-medium text-blue-700' : 'text-blue-500'}`}>{index + 1}</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-center max-w-[80px]">
                      {t(step.labelKey)}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      {step.timeframe}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Details panel for active step */}
              {activeStep !== null && (
                <div className="mt-8 bg-white p-4 rounded-md border border-blue-200 shadow-sm">
                  <h4 className="text-sm font-medium mb-2 text-blue-700">
                    {t(supplyChainSteps[activeStep].labelKey)} {language === 'en' ? 'Details' : 'Detalles'}
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    {supplyChainSteps[activeStep].description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="block text-gray-500 mb-1">{language === 'en' ? 'Time Frame:' : 'Plazo:'}</span>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {supplyChainSteps[activeStep].timeframe}
                      </Badge>
                    </div>
                    <div>
                      <span className="block text-gray-500 mb-1">{language === 'en' ? 'Est. Cost Impact:' : 'Impacto en Costos Est.:'}</span>
                      <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                        {supplyChainSteps[activeStep].cost}
                      </Badge>
                    </div>
                    <div>
                      <span className="block text-gray-500 mb-1">{language === 'en' ? 'Potential Risks:' : 'Riesgos Potenciales:'}</span>
                      <div className="flex flex-wrap gap-1">
                        {supplyChainSteps[activeStep].risks.map((risk, i) => (
                          <Badge key={i} variant="outline" className="bg-red-50 text-red-600 border-red-200">
                            {risk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Legend */}
              {activeStep === null && (
                <div className="mt-8 bg-white p-4 rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium mb-2">
                    {t('supplychain.stages')}
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                    {supplyChainSteps.map((step, index) => (
                      <div key={`legend-${step.id}`} className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-300 flex items-center justify-center text-[10px] text-blue-700">{index + 1}</span>
                        <span>{t(step.labelKey)}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    {language === 'en' ? 'Click on any node to view detailed information' : 'Haga clic en cualquier nodo para ver información detallada'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChainFlowDiagram;
