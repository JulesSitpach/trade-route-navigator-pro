
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Disclaimer = () => {
  const { t } = useLanguage();

  return (
    <Alert className="mb-6 bg-[#EBF5FB] border-[#3498DB]">
      <Info className="h-5 w-5 text-[#3498DB]" />
      <AlertTitle className="text-[#2C3E50] font-medium">
        {t('disclaimer.title')}
      </AlertTitle>
      <AlertDescription className="text-[#5D6D7E] mt-1">
        {t('disclaimer.message')}
      </AlertDescription>
    </Alert>
  );
};

export default Disclaimer;
