
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { HSCodeField } from './product-form/HSCodeField';
import { CountryFields } from './product-form/CountryFields';
import { useProductForm } from './product-form/useProductForm';

const ProductDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  const { values, errors, updateField, validateField } = useProductForm(onChange);

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
            value={values.productDescription}
            onChange={(e) => {
              updateField('productDescription', e.target.value);
              validateField('productDescription', e.target.value);
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

        <HSCodeField 
          value={values.hsCode}
          productCategory={values.productCategory}
          onChange={(value) => updateField('hsCode', value)}
        />

        <CountryFields 
          originCountry={values.originCountry}
          destinationCountry={values.destinationCountry}
          errors={errors}
          onCountryChange={updateField}
        />

        <div className="space-y-2">
          <Label htmlFor="productValue" className="flex items-center gap-1">
            Product Value (USD)
            <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="productValue" 
            type="number" 
            placeholder="Enter product value"
            value={values.productValue}
            onChange={(e) => {
              updateField('productValue', e.target.value);
              validateField('productValue', e.target.value);
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
            value={values.productCategory} 
            onValueChange={(value) => updateField('productCategory', value)}
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
