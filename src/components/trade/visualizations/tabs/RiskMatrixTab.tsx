
import { AlertTriangleIcon } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import RiskAssessmentMatrix from '../RiskAssessmentMatrix';
import { useLanguage } from '@/contexts/LanguageContext';

const RiskMatrixTab = () => {
  const { language } = useLanguage();

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangleIcon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">
            {language === 'en' ? 'Risk Assessment Matrix' : 'Matriz de Evaluación de Riesgos'}
          </CardTitle>
        </div>
        <CardDescription>
          {language === 'en' 
            ? 'Analyze potential risks in your trade operations' 
            : 'Analice riesgos potenciales en sus operaciones comerciales'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RiskAssessmentMatrix />
      </CardContent>
    </Card>
  );
};

export default RiskMatrixTab;
