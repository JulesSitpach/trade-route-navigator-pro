
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface ShippingDimensionsFormProps {
  weight: string;
  length: string;
  width: string;
  height: string;
  onDimensionChange: (field: string, value: string) => void;
}

const ShippingDimensionsForm = ({
  weight,
  length,
  width,
  height,
  onDimensionChange
}: ShippingDimensionsFormProps) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="weight">{t('shipping.weight')}</Label>
        <Input 
          id="weight" 
          type="number" 
          value={weight}
          placeholder={t('shipping.weight')}
          onChange={(e) => onDimensionChange('weight', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>{t('shipping.dimensions')}</Label>
        <div className="grid grid-cols-3 gap-4">
          <Input 
            placeholder={t('shipping.length')} 
            value={length}
            onChange={(e) => onDimensionChange('length', e.target.value)}
          />
          <Input 
            placeholder={t('shipping.width')} 
            value={width}
            onChange={(e) => onDimensionChange('width', e.target.value)}
          />
          <Input 
            placeholder={t('shipping.height')} 
            value={height}
            onChange={(e) => onDimensionChange('height', e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default ShippingDimensionsForm;
