import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { countryTariffData } from '@/data/countryTariffData';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoCircle } from 'lucide-react';

const ProductDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Product Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productDescription">Product Description</Label>
          <Input 
            id="productDescription" 
            placeholder="Enter product description"
            onChange={(e) => onChange({ productDescription: e.target.value })}
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hsCode">HS Code (Optional)</Label>
          <div className="flex gap-2">
            <Input 
              id="hsCode" 
              placeholder="Enter HS Code"
              className="flex-1 bg-white"
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
              {countryTariffData.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        {country.name}
                        <InfoCircle className="ml-2 h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-2">
                          <p>Average Tariff: {country.averageTariff}%</p>
                          {country.specialConsiderations.map((consideration, index) => (
                            <p key={index}>{consideration}</p>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SelectItem>
              ))}
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
              {countryTariffData.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        {country.name}
                        <InfoCircle className="ml-2 h-4 w-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-2">
                          <p>Average Tariff: {country.averageTariff}%</p>
                          {country.specialConsiderations.map((consideration, index) => (
                            <p key={index}>{consideration}</p>
                          ))}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </SelectItem>
              ))}
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
