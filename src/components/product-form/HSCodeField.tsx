
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface HSCodeFieldProps {
  value: string;
  productCategory: string;
  onChange: (value: string) => void;
}

export const HSCodeField = ({ value, productCategory, onChange }: HSCodeFieldProps) => {
  const { t } = useLanguage();
  
  const suggestHsCode = () => {
    const hsCodes = {
      'agricultural': '0713.10',
      'industrial': '8481.80',
      'textiles': '6204.43',
      'electronics': '8517.12',
      'automobiles': '8703.23',
    };
    
    const suggestedCode = hsCodes[productCategory as keyof typeof hsCodes] || '8479.89';
    onChange(suggestedCode);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="hsCode">
        {t('product.hscode')}
      </Label>
      <div className="flex gap-2">
        <Input 
          id="hsCode" 
          placeholder={t('product.hscode')}
          className="flex-1 bg-white"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <Button 
          variant="secondary" 
          className="bg-[#3498db] hover:bg-[#2980b9] text-white"
          onClick={suggestHsCode}
        >
          {t('suggest')}
        </Button>
      </div>
    </div>
  );
};
