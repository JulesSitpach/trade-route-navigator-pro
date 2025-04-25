import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const RiskAssessmentMatrix = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {language === 'en' ? 'Risk Assessment Matrix' : 'Matriz de Evaluación de Riesgos'}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {language === 'en' 
          ? 'Compare routes based on cost vs. risk factors to find your optimal balance'
          : 'Compare rutas basadas en factores de costo vs riesgo para encontrar su balance óptimo'
        }
      </p>
      
      <Card>
        <CardContent className="p-6">
          {/* Risk assessment matrix visualization would be here */}
          <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Risk assessment matrix visualization' 
                : 'Visualización de matriz de evaluación de riesgos'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentMatrix;
