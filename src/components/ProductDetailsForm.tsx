
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countryTariffData } from '@/data/countryTariffData';
import { Button } from '@/components/ui/button';

const ProductDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  const [hsCode, setHsCode] = useState('');

  const suggestHsCode = () => {
    // Sample HS codes based on product categories
    const hsCodes = {
      'agricultural': '0713.10',
      'industrial': '8481.80',
      'textiles': '6204.43',
      'electronics': '8517.12',
      'automobiles': '8703.23',
    };
    
    // Get the current product category from the form data
    const category = document.getElementById('productCategory') as HTMLSelectElement;
    const selectedCategory = category?.value || 'industrial';
    
    // Set the suggested HS code
    const suggestedCode = hsCodes[selectedCategory as keyof typeof hsCodes] || '8479.89';
    setHsCode(suggestedCode);
    onChange({ hsCode: suggestedCode });
  };

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
              value={hsCode}
              onChange={(e) => {
                setHsCode(e.target.value);
                onChange({ hsCode: e.target.value });
              }}
            />
            <Button 
              variant="secondary" 
              className="bg-[#3498db] hover:bg-[#2980b9] text-white"
              onClick={suggestHsCode}
            >
              Suggest
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="originCountry">Origin Country</Label>
          <Select defaultValue="" onValueChange={(value) => onChange({ originCountry: value })}>
            <SelectTrigger id="originCountry" className="bg-white">
              <SelectValue placeholder="Select Origin Country" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {countryTariffData.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="destinationCountry">Destination Country</Label>
          <Select defaultValue="" onValueChange={(value) => onChange({ destinationCountry: value })}>
            <SelectTrigger id="destinationCountry" className="bg-white">
              <SelectValue placeholder="Select Destination Country" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {countryTariffData.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.name}
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
            className="bg-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCategory">Product Category</Label>
          <Select defaultValue="" onValueChange={(value) => onChange({ productCategory: value })}>
            <SelectTrigger id="productCategory" className="bg-white">
              <SelectValue placeholder="Select Product Category" />
            </SelectTrigger>
            <SelectContent className="bg-white">
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
