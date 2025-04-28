
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon, InfoIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import RiskFilterButtons from './risk/RiskFilterButtons';
import RiskInfoNote from './risk/RiskInfoNote';
import RiskScatterChart from './risk/RiskScatterChart';
import { useRiskData } from './risk/useRiskData';

const RiskAssessmentMatrix = () => {
  const { t, language } = useLanguage();
  const { riskData, activeRiskType, setActiveRiskType } = useRiskData();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-medium">
          {t('risk.assessment.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('risk.assessment.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-end mb-4 gap-3">
            <div className="flex items-center space-x-1">
              <InfoIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {language === 'en' 
                  ? 'Filter by risk level using buttons below' 
                  : 'Filtrar por nivel de riesgo usando botones abajo'
                }
              </span>
            </div>
          </div>

          <RiskScatterChart 
            data={riskData} 
            activeRiskType={activeRiskType} 
            language={language}
          />
          
          <RiskFilterButtons 
            activeRiskType={activeRiskType}
            setActiveRiskType={setActiveRiskType}
            language={language}
          />
          
          <RiskInfoNote language={language} />
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentMatrix;
