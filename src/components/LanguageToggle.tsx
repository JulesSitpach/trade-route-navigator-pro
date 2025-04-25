
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      {language === 'en' ? 'ES' : 'EN'}
    </Button>
  );
};

export default LanguageToggle;
