
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { NetworkIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import SupplyChainFlow from './supply-chain/SupplyChainFlow';
import { useSupplyChainData } from './supply-chain/useSupplyChainData';

const SupplyChainFlowDiagram = () => {
  const { t } = useLanguage();
  const { 
    supplyChainSteps, 
    totalTransitDays, 
    activeStep, 
    setActiveStep, 
    language 
  } = useSupplyChainData();

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

          <SupplyChainFlow 
            steps={supplyChainSteps}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            language={language}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplyChainFlowDiagram;
