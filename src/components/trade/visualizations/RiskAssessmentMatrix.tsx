import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangleIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const RiskAssessmentMatrix = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <AlertTriangleIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {t('risk.assessment.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('risk.assessment.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          {/* Risk assessment matrix visualization would be here */}
          <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-muted-foreground">
              {t('risk.assessment.visualization')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentMatrix;
