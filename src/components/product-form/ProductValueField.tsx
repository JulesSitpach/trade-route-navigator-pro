
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductValueFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onValidate: (value: string) => void;
}

export const ProductValueField = ({ 
  value, 
  error, 
  onChange, 
  onValidate 
}: ProductValueFieldProps) => {
  const { t } = useLanguage();
  
  // Translate error message if it's the default validation error
  const getTranslatedError = (errorMsg?: string) => {
    if (!errorMsg) return undefined;
    
    if (errorMsg === 'This field is required') {
      return t('validation.required');
    }
    
    return errorMsg;
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="productValue" className="flex items-center gap-1">
        {t('product.value')}
        <span className="text-red-500">{t('common:required')}</span>
      </Label>
      <Input 
        id="productValue" 
        type="number" 
        placeholder={t('product.value.placeholder')}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onValidate(e.target.value);
        }}
        className={cn(
          "bg-white",
          error && "border-red-500 focus-visible:ring-red-500"
        )}
      />
      {error && (
        <p className="text-sm text-red-500 mt-1">{getTranslatedError(error)}</p>
      )}
    </div>
  );
};
