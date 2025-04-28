
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface ExclusionInformationProps {
  exclusionInfo: {
    available: boolean;
    process: string;
    criteria: string;
    timeline: string;
    successRate: string;
  };
}

export const ExclusionInformation = ({ exclusionInfo }: ExclusionInformationProps) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Exclusion Request Information" : "Información de Solicitud de Exclusión"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-semibold">
              {language === 'en' ? "Exclusion Available" : "Exclusión Disponible"}:
            </span>
            <Badge 
              variant={exclusionInfo.available ? "success" : "destructive"}
            >
              {exclusionInfo.available 
                ? (language === 'en' ? "Available" : "Disponible")
                : (language === 'en' ? "Not Available" : "No Disponible")}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">
                {language === 'en' ? "Process" : "Proceso"}
              </h4>
              <p className="text-sm text-gray-600">{exclusionInfo.process}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                {language === 'en' ? "Eligibility Criteria" : "Criterios de Elegibilidad"}
              </h4>
              <p className="text-sm text-gray-600">{exclusionInfo.criteria}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                {language === 'en' ? "Timeline" : "Cronograma"}
              </h4>
              <p className="text-sm text-gray-600">{exclusionInfo.timeline}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">
                {language === 'en' ? "Historical Success Rate" : "Tasa de Éxito Histórica"}
              </h4>
              <p className="text-sm text-gray-600">{exclusionInfo.successRate}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
