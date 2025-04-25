
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheckIcon } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

const RegulatoryComplianceDashboard = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardCheckIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {t('compliance.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('compliance.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          {/* Compliance dashboard visualization would be here */}
          <div className="h-[400px] flex items-center justify-center border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <p className="text-muted-foreground">
              {language === 'en' 
                ? 'Regulatory compliance dashboard visualization' 
                : 'Visualización del panel de cumplimiento regulatorio'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryComplianceDashboard;
