
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
  const { language } = useLanguage();
  
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="originCountry" className="flex items-center gap-1">
          {language === 'en' ? 'Origin Country' : 'País de Origen'}
          <span className="text-red-500">*</span>
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
            <SelectValue placeholder={language === 'en' ? "Select Origin Country" : "Seleccione País de Origen"} />
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
          <p className="text-sm text-red-500 mt-1">{errors.originCountry}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="destinationCountry" className="flex items-center gap-1">
          {language === 'en' ? 'Destination Country' : 'País de Destino'}
          <span className="text-red-500">*</span>
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
            <SelectValue placeholder={language === 'en' ? "Select Destination Country" : "Seleccione País de Destino"} />
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
          <p className="text-sm text-red-500 mt-1">{errors.destinationCountry}</p>
        )}
      </div>
    </>
  );
};
