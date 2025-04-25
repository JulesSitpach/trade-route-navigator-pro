
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductDescriptionFieldProps {
  value: string;
  error?: string;
  onChange: (value: string) => void;
  onValidate: (value: string) => void;
}

export const ProductDescriptionField = ({ 
  value, 
  error, 
  onChange, 
  onValidate 
}: ProductDescriptionFieldProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="productDescription" className="flex items-center gap-1">
        {t('product.description')}
        <span className="text-red-500">*</span>
      </Label>
      <Input 
        id="productDescription" 
        placeholder={t('product.description.placeholder')}
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
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};
