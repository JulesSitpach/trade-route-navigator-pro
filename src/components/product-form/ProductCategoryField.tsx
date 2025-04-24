
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductCategoryFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProductCategoryField = ({ 
  value, 
  onChange 
}: ProductCategoryFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="productCategory">Product Category</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger id="productCategory">
          <SelectValue placeholder="Select Product Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="agricultural">Agricultural</SelectItem>
          <SelectItem value="industrial">Industrial</SelectItem>
          <SelectItem value="textiles">Textiles</SelectItem>
          <SelectItem value="electronics">Electronics</SelectItem>
          <SelectItem value="automobiles">Automobiles</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
