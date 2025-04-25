import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

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
        <div className="space-y-2">
          <Label htmlFor="quantity" className="flex items-center gap-1">
            {t('shipping.quantity')}
            <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="quantity" 
            type="number" 
            min="1"
            value={values.quantity}
            placeholder={t('shipping.quantity.placeholder')}
            onChange={(e) => {
              updateField('quantity', e.target.value);
              validateField('quantity', e.target.value);
            }}
            className={cn(
              errors.quantity && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.quantity && (
            <p className="text-sm text-red-500 mt-1">{t('validation.required')}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportMode" className="flex items-center gap-1">
            {t('shipping.mode')}
            <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={values.transportMode} 
            onValueChange={(value) => {
              updateField('transportMode', value);
              validateField('transportMode', value);
            }}
          >
            <SelectTrigger 
              id="transportMode"
              className={cn(
                errors.transportMode && "border-red-500 focus-visible:ring-red-500"
              )}
            >
              <SelectValue placeholder={t('shipping.mode.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ocean">{t('transport.ocean')}</SelectItem>
              <SelectItem value="air">{t('transport.air')}</SelectItem>
              <SelectItem value="road">{t('transport.road')}</SelectItem>
              <SelectItem value="rail">{t('transport.rail')}</SelectItem>
              <SelectItem value="multimodal">{t('transport.multimodal')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.transportMode && (
            <p className="text-sm text-red-500 mt-1">{t('validation.required')}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="shipmentType">{t('shipping.type')}</Label>
          <Select 
            value={values.shipmentType} 
            onValueChange={(value) => updateField('shipmentType', value)}
          >
            <SelectTrigger id="shipmentType">
              <SelectValue placeholder={t('shipping.type.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fcl">{t('shipment.fcl')}</SelectItem>
              <SelectItem value="lcl">{t('shipment.lcl')}</SelectItem>
              <SelectItem value="bulk">{t('shipment.bulk')}</SelectItem>
              <SelectItem value="breakbulk">{t('shipment.breakbulk')}</SelectItem>
              <SelectItem value="roro">{t('shipment.roro')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">{t('shipping.weight')}</Label>
          <Input 
            id="weight" 
            type="number" 
            value={values.weight}
            placeholder={t('shipping.weight')}
            onChange={(e) => updateField('weight', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>{t('shipping.dimensions')}</Label>
          <div className="grid grid-cols-3 gap-4">
            <Input 
              placeholder={t('shipping.length')} 
              value={values.length}
              onChange={(e) => updateField('length', e.target.value)}
            />
            <Input 
              placeholder={t('shipping.width')} 
              value={values.width}
              onChange={(e) => updateField('width', e.target.value)}
            />
            <Input 
              placeholder={t('shipping.height')} 
              value={values.height}
              onChange={(e) => updateField('height', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="packageType">{t('shipping.package')}</Label>
          <Select 
            value={values.packageType} 
            onValueChange={(value) => updateField('packageType', value)}
          >
            <SelectTrigger id="packageType">
              <SelectValue placeholder={t('shipping.package.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boxes">{t('package.boxes')}</SelectItem>
              <SelectItem value="pallets">{t('package.pallets')}</SelectItem>
              <SelectItem value="drums">{t('package.drums')}</SelectItem>
              <SelectItem value="bags">{t('package.bags')}</SelectItem>
              <SelectItem value="crates">{t('package.crates')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dangerousGoods">{t('shipping.dangerous')}</Label>
          <Select 
            value={values.dangerousGoods} 
            onValueChange={(value) => updateField('dangerousGoods', value)}
          >
            <SelectTrigger id="dangerousGoods">
              <SelectValue placeholder={t('shipping.dangerous')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Si</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
