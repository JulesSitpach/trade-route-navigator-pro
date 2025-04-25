
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countryTariffData } from '@/data/countryTariffData';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CountryFieldsProps {
  originCountry: string;
  destinationCountry: string;
  errors: Record<string, string>;
  onCountryChange: (field: 'originCountry' | 'destinationCountry', value: string) => void;
}

export const CountryFields = ({ 
  originCountry, 
  destinationCountry, 
  errors, 
  onCountryChange 
}: CountryFieldsProps) => {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="originCountry" className="flex items-center gap-1">
          {t('product.origin')}
          <span className="text-red-500">{t('common:required')}</span>
        </Label>
        <Select 
          value={originCountry} 
          onValueChange={(value) => onCountryChange('originCountry', value)}
        >
          <SelectTrigger 
            id="originCountry"
            className={cn(
              errors.originCountry && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <SelectValue placeholder={t('product.origin')} />
          </SelectTrigger>
          <SelectContent>
            {countryTariffData.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.originCountry && (
          <p className="text-sm text-red-500 mt-1">{t('validation.required')}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="destinationCountry" className="flex items-center gap-1">
          {t('product.destination')}
          <span className="text-red-500">{t('common:required')}</span>
        </Label>
        <Select 
          value={destinationCountry} 
          onValueChange={(value) => onCountryChange('destinationCountry', value)}
        >
          <SelectTrigger 
            id="destinationCountry"
            className={cn(
              errors.destinationCountry && "border-red-500 focus-visible:ring-red-500"
            )}
          >
            <SelectValue placeholder={t('product.destination')} />
          </SelectTrigger>
          <SelectContent>
            {countryTariffData.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                {country.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.destinationCountry && (
          <p className="text-sm text-red-500 mt-1">{t('validation.required')}</p>
        )}
      </div>
    </>
  );
};
