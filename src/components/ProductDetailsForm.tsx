
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

const ProductDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-blue-900 mb-6">Product Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productDescription">Product Description</Label>
          <Input 
            id="productDescription" 
            placeholder="Enter product description"
            onChange={(e) => onChange({ productDescription: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hsCode">HS Code (Optional)</Label>
          <div className="flex gap-2">
            <Input 
              id="hsCode" 
              placeholder="Enter HS Code"
              className="flex-1"
            />
            <Button variant="secondary">Suggest</Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="originCountry">Origin Country</Label>
          <Select onValueChange={(value) => onChange({ originCountry: value })}>
            <SelectTrigger id="originCountry">
              <SelectValue placeholder="Select Origin Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="mexico">Mexico</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="china">China</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destinationCountry">Destination Country</Label>
          <Select onValueChange={(value) => onChange({ destinationCountry: value })}>
            <SelectTrigger id="destinationCountry">
              <SelectValue placeholder="Select Destination Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usa">United States</SelectItem>
              <SelectItem value="mexico">Mexico</SelectItem>
              <SelectItem value="canada">Canada</SelectItem>
              <SelectItem value="china">China</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="productValue">Product Value (USD)</Label>
          <Input 
            id="productValue" 
            type="number" 
            placeholder="Enter product value"
            onChange={(e) => onChange({ productValue: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCategory">Product Category</Label>
          <Select onValueChange={(value) => onChange({ productCategory: value })}>
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
      </div>
    </div>
  );
};

export default ProductDetailsForm;
