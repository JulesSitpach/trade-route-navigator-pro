
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ShippingTypeSelectorProps {
  transportMode: string;
  shipmentType: string;
  packageType: string;
  dangerousGoods: string;
  onTypeChange: (field: string, value: string) => void;
  errors: Record<string, string>;
  validateField: (field: string, value: string) => boolean;
}

const ShippingTypeSelector = ({
  transportMode,
  shipmentType,
  packageType,
  dangerousGoods,
  onTypeChange,
  errors,
  validateField
}: ShippingTypeSelectorProps) => {
  const { t } = useLanguage();

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="transportMode" className="flex items-center gap-1">
          {t('shipping.mode')}
          <span className="text-red-500">*</span>
        </Label>
        <Select 
          value={transportMode} 
          onValueChange={(value) => {
            onTypeChange('transportMode', value);
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
          value={shipmentType} 
          onValueChange={(value) => onTypeChange('shipmentType', value)}
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
        <Label htmlFor="packageType">{t('shipping.package')}</Label>
        <Select 
          value={packageType} 
          onValueChange={(value) => onTypeChange('packageType', value)}
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
          value={dangerousGoods} 
          onValueChange={(value) => onTypeChange('dangerousGoods', value)}
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
    </>
  );
};

export default ShippingTypeSelector;
