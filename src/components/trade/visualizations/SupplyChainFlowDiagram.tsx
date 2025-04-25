
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { NetworkIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const SupplyChainFlowDiagram = () => {
  const { t, language } = useLanguage();

  // Supply chain diagram steps and nodes with translations
  const supplyChainSteps = [
    {
      id: 'manufacturer',
      labelEn: 'Manufacturer',
      labelEs: 'Fabricante',
    },
    {
      id: 'port-origin',
      labelEn: 'Port of Origin',
      labelEs: 'Puerto de Origen',
    },
    {
      id: 'transport',
      labelEn: 'Transport',
      labelEs: 'Transporte',
    },
    {
      id: 'port-destination',
      labelEn: 'Port of Destination',
      labelEs: 'Puerto de Destino',
    },
    {
      id: 'customs',
      labelEn: 'Customs',
      labelEs: 'Aduanas',
    },
    {
      id: 'warehouse',
      labelEn: 'Warehouse',
      labelEs: 'Almacén',
    },
    {
      id: 'distribution',
      labelEn: 'Distribution',
      labelEs: 'Distribución',
    },
    {
      id: 'customer',
      labelEn: 'Customer',
      labelEs: 'Cliente',
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
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -z-10"></div>
                
                {/* Nodes */}
                {supplyChainSteps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center mb-2 z-10">
                      <span className="text-blue-700 font-medium">{index + 1}</span>
                    </div>
                    <span className="text-sm font-medium text-center max-w-[80px]">
                      {language === 'en' ? step.labelEn : step.labelEs}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Legend */}
              <div className="mt-12 bg-white p-4 rounded-md border border-gray-200">
                <h4 className="text-sm font-medium mb-2">
                  {language === 'en' ? 'Supply Chain Stages' : 'Etapas de la Cadena de Suministro'}
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                  {supplyChainSteps.map((step, index) => (
                    <div key={`legend-${step.id}`} className="flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-[10px] text-blue-700">{index + 1}</span>
                      <span>{language === 'en' ? step.labelEn : step.labelEs}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChainFlowDiagram;
