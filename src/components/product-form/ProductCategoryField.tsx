
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProductCategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductCategoryField = ({ 
  value, 
  onChange 
}: ProductCategoryFieldProps) => {
  const { language } = useLanguage();
  
  const getTranslatedCategory = (category: string): string => {
    const translations: Record<string, string> = {
      'agricultural': 'Agrícola',
      'industrial': 'Industrial',
      'textiles': 'Textiles',
      'electronics': 'Electrónicos',
      'automobiles': 'Automóviles'
    };
    
    return language === 'en' ? category : (translations[category] || category);
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="productCategory">
        {language === 'en' ? 'Product Category' : 'Categoría del Producto'}
      </Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="productCategory">
          <SelectValue placeholder={language === 'en' 
            ? "Select Product Category" 
            : "Seleccione Categoría del Producto"} 
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="agricultural">
            {getTranslatedCategory('agricultural')}
          </SelectItem>
          <SelectItem value="industrial">
            {getTranslatedCategory('industrial')}
          </SelectItem>
          <SelectItem value="textiles">
            {getTranslatedCategory('textiles')}
          </SelectItem>
          <SelectItem value="electronics">
            {getTranslatedCategory('electronics')}
          </SelectItem>
          <SelectItem value="automobiles">
            {getTranslatedCategory('automobiles')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
