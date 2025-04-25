
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { NetworkIcon, TruckIcon, PackageIcon, WarehouseIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from "@/components/ui/badge";

const SupplyChainFlowDiagram = () => {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Supply chain diagram steps and nodes with translations
  const supplyChainSteps = [
    {
      id: 'manufacturer',
      labelKey: 'supplychain.step.manufacturer',
      icon: <PackageIcon className="h-5 w-5" />,
      timeframe: '1-2 days',
      risks: ['production delays', 'quality issues']
    },
    {
      id: 'port-origin',
      labelKey: 'supplychain.step.port.origin',
      icon: <TruckIcon className="h-5 w-5" />,
      timeframe: '2-3 days',
      risks: ['port congestion', 'documentation issues']
    },
    {
      id: 'transport',
      labelKey: 'supplychain.step.transport',
      icon: <NetworkIcon className="h-5 w-5" />,
      timeframe: '14-30 days',
      risks: ['weather delays', 'route disruptions']
    },
    {
      id: 'port-destination',
      labelKey: 'supplychain.step.port.destination',
      icon: <TruckIcon className="h-5 w-5" />,
      timeframe: '3-5 days',
      risks: ['customs clearance delays', 'inspection issues']
    },
    {
      id: 'customs',
      labelKey: 'supplychain.step.customs',
      icon: <PackageIcon className="h-5 w-5" />,
      timeframe: '2-7 days',
      risks: ['incomplete documentation', 'classification issues']
    },
    {
      id: 'warehouse',
      labelKey: 'supplychain.step.warehouse',
      icon: <WarehouseIcon className="h-5 w-5" />,
      timeframe: '1-2 days',
      risks: ['inventory management', 'storage capacity']
    },
    {
      id: 'distribution',
      labelKey: 'supplychain.step.distribution',
      icon: <TruckIcon className="h-5 w-5" />,
      timeframe: '1-5 days',
      risks: ['last-mile delivery issues', 'local disruptions']
    },
    {
      id: 'customer',
      labelKey: 'supplychain.step.customer',
      icon: <PackageIcon className="h-5 w-5" />,
      timeframe: 'N/A',
      risks: ['order fulfillment', 'satisfaction']
    }
  ];

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
          <div className="h-[400px] flex flex-col items-center justify-center border rounded-lg bg-gray-50 overflow-x-auto">
            <div className="min-w-[800px] w-full px-4 py-8">
              {/* Supply chain flow visualization */}
              <div className="flex justify-between items-center relative">
                {/* Connection lines */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 -z-10"></div>
                
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
                  </div>
                ))}
              </div>
              
              {/* Details panel for active step */}
              {activeStep !== null && (
                <div className="mt-8 bg-white p-4 rounded-md border border-blue-200 shadow-sm">
                  <h4 className="text-sm font-medium mb-2 text-blue-700">
                    {t(supplyChainSteps[activeStep].labelKey)} Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="block text-gray-500 mb-1">Time Frame:</span>
                      <Badge variant="outline" className="bg-blue-50">
                        {supplyChainSteps[activeStep].timeframe}
                      </Badge>
                    </div>
                    <div>
                      <span className="block text-gray-500 mb-1">Potential Risks:</span>
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
                    {t('supplychain.click.info')}
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
