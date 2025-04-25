
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
  const { t } = useLanguage();
  
  return (
    <div className="space-y-2">
      <Label htmlFor="productCategory">
        {t('product.category')}
      </Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="productCategory">
          <SelectValue placeholder={t('product.category.placeholder')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="agricultural">
            {t('agricultural')}
          </SelectItem>
          <SelectItem value="industrial">
            {t('industrial')}
          </SelectItem>
          <SelectItem value="textiles">
            {t('textiles')}
          </SelectItem>
          <SelectItem value="electronics">
            {t('electronics')}
          </SelectItem>
          <SelectItem value="automobiles">
            {t('automobiles')}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
