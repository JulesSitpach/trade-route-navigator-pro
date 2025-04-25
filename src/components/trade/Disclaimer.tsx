
import { Info } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Disclaimer = () => {
  const { t } = useLanguage();

  return (
    <Alert className="mb-6 bg-[#F1F0FB] border-[#9b87f5]">
      <Info className="h-5 w-5 text-[#7E69AB]" />
      <AlertTitle className="text-[#1A1F2C] font-medium">
        {t('disclaimer.title')}
      </AlertTitle>
      <AlertDescription className="text-[#8E9196] mt-1">
        {t('disclaimer.message')}
      </AlertDescription>
    </Alert>
  );
};

export default Disclaimer;
