
import { ClipboardCheckIcon } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import RegulatoryComplianceDashboard from '../RegulatoryComplianceDashboard';
import { useLanguage } from '@/contexts/LanguageContext';

const ComplianceTab = () => {
  const { language } = useLanguage();

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ClipboardCheckIcon className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-medium">
            {language === 'en' ? 'Regulatory Compliance' : 'Cumplimiento Regulatorio'}
          </CardTitle>
        </div>
        <CardDescription>
          {language === 'en' 
            ? 'View regulatory compliance status across your supply chain' 
            : 'Ver estado de cumplimiento regulatorio en su cadena de suministro'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegulatoryComplianceDashboard />
      </CardContent>
    </Card>
  );
};

export default ComplianceTab;
