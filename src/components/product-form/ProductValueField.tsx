
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
  const { language } = useLanguage();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="productValue" className="flex items-center gap-1">
        {language === 'en' ? 'Product Value (USD)' : 'Valor del Producto (USD)'}
        <span className="text-red-500">*</span>
      </Label>
      <Input 
        id="productValue" 
        type="number" 
        placeholder={language === 'en' ? "Enter product value" : "Ingrese valor del producto"}
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
