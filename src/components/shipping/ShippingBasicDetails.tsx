
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface ShippingBasicDetailsProps {
  quantity: string;
  onQuantityChange: (value: string) => void;
  errors: Record<string, string>;
  validateField: (field: string, value: string) => boolean;
}

const ShippingBasicDetails = ({ 
  quantity, 
  onQuantityChange, 
  errors, 
  validateField 
}: ShippingBasicDetailsProps) => {
  const { t } = useTranslation(['shipping', 'common']);

  return (
    <div className="space-y-2">
      <Label htmlFor="quantity" className="flex items-center gap-1">
        {t('shipping:quantity')}
        <span className="text-red-500">{t('common:required')}</span>
      </Label>
      <Input 
        id="quantity" 
        type="number" 
        min="1"
        value={quantity}
        placeholder={t('shipping:quantity')}
        onChange={(e) => {
          onQuantityChange(e.target.value);
          validateField('quantity', e.target.value);
        }}
        className={cn(
          errors.quantity && "border-red-500 focus-visible:ring-red-500"
        )}
      />
      {errors.quantity && (
        <p className="text-sm text-red-500 mt-1">{t('common:validation.required')}</p>
      )}
    </div>
  );
};

export default ShippingBasicDetails;
