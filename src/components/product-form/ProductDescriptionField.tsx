
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
      <Label htmlFor="productDescription" className="flex items-center gap-1 text-[#2C3E50]">
        {t('product.description')}
        <span className="text-[#E74C3C]">*</span>
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
          error && "border-[#E74C3C] focus-visible:ring-[#E74C3C]"
        )}
      />
      {error && (
        <p className="text-sm text-[#E74C3C] mt-1">{error}</p>
      )}
    </div>
  );
};
