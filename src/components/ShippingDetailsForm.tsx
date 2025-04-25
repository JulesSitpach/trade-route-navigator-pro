
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import ShippingBasicDetails from './shipping/ShippingBasicDetails';
import ShippingDimensionsForm from './shipping/ShippingDimensionsForm';
import ShippingTypeSelector from './shipping/ShippingTypeSelector';

const ShippingDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  const { t } = useLanguage();
  const [values, setValues] = useState({
    quantity: '',
    transportMode: '',
    shipmentType: '',
    packageType: '',
    dangerousGoods: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    specialRequirements: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    if (value) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    onChange({ [field]: value });
  };

  const validateField = (field: string, value: string) => {
    if (!value || value.trim() === '') {
      setErrors(prev => ({ ...prev, [field]: 'This field is required' }));
      return false;
    }
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
    
    return true;
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {t('shipping.details')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ShippingBasicDetails
          quantity={values.quantity}
          onQuantityChange={(value) => updateField('quantity', value)}
          errors={errors}
          validateField={validateField}
        />

        <ShippingTypeSelector
          transportMode={values.transportMode}
          shipmentType={values.shipmentType}
          packageType={values.packageType}
          dangerousGoods={values.dangerousGoods}
          onTypeChange={updateField}
          errors={errors}
          validateField={validateField}
        />

        <ShippingDimensionsForm
          weight={values.weight}
          length={values.length}
          width={values.width}
          height={values.height}
          onDimensionChange={updateField}
        />

        <div className="col-span-2 space-y-2">
          <Label htmlFor="specialRequirements">{t('shipping.requirements')}</Label>
          <Textarea 
            id="specialRequirements" 
            placeholder={t('shipping.requirements')}
            value={values.specialRequirements}
            className="min-h-[100px]"
            onChange={(e) => updateField('specialRequirements', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
