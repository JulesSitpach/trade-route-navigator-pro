import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { countryTariffData } from '@/data/countryTariffData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const ProductDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  const [hsCode, setHsCode] = useState('');
  const [originCountry, setOriginCountry] = useState('');
  const [destinationCountry, setDestinationCountry] = useState('');
  const [productCategory, setProductCategory] = useState('');

  const suggestHsCode = () => {
    // Sample HS codes based on product categories
    const hsCodes = {
      'agricultural': '0713.10',
      'industrial': '8481.80',
      'textiles': '6204.43',
      'electronics': '8517.12',
      'automobiles': '8703.23',
    };
    
    // Get the current product category
    const selectedCategory = productCategory || 'industrial';
    
    // Set the suggested HS code
    const suggestedCode = hsCodes[selectedCategory as keyof typeof hsCodes] || '8479.89';
    setHsCode(suggestedCode);
    onChange({ hsCode: suggestedCode });
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

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
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Product Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="productDescription" className="flex items-center gap-1">
            Product Description
            <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="productDescription" 
            placeholder="Enter product description"
            onChange={(e) => {
              validateField('productDescription', e.target.value);
              onChange({ productDescription: e.target.value });
            }}
            className={cn(
              "bg-white",
              errors.productDescription && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.productDescription && (
            <p className="text-sm text-red-500 mt-1">{errors.productDescription}</p>
          )}
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
          <Label htmlFor="originCountry" className="flex items-center gap-1">
            Origin Country
            <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={originCountry} 
            onValueChange={(value) => {
              validateField('originCountry', value);
              setOriginCountry(value);
              onChange({ originCountry: value });
            }}
          >
            <SelectTrigger 
              id="originCountry"
              className={cn(
                errors.originCountry && "border-red-500 focus-visible:ring-red-500"
              )}
            >
              <SelectValue placeholder="Select Origin Country" />
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
            Destination Country
            <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={destinationCountry} 
            onValueChange={(value) => {
              validateField('destinationCountry', value);
              setDestinationCountry(value);
              onChange({ destinationCountry: value });
            }}
          >
            <SelectTrigger 
              id="destinationCountry"
              className={cn(
                errors.destinationCountry && "border-red-500 focus-visible:ring-red-500"
              )}
            >
              <SelectValue placeholder="Select Destination Country" />
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

        <div className="space-y-2">
          <Label htmlFor="productValue" className="flex items-center gap-1">
            Product Value (USD)
            <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="productValue" 
            type="number" 
            placeholder="Enter product value"
            onChange={(e) => {
              validateField('productValue', e.target.value);
              onChange({ productValue: e.target.value });
            }}
            className={cn(
              "bg-white",
              errors.productValue && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.productValue && (
            <p className="text-sm text-red-500 mt-1">{errors.productValue}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="productCategory">Product Category</Label>
          <Select 
            value={productCategory} 
            onValueChange={(value) => {
              setProductCategory(value);
              onChange({ productCategory: value });
            }}
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
      </div>
    </div>
  );
};

export default ProductDetailsForm;
