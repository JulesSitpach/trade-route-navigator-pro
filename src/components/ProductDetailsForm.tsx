
import React from 'react';
import { ProductDescriptionField } from './product-form/ProductDescriptionField';
import { ProductValueField } from './product-form/ProductValueField';
import { ProductCategoryField } from './product-form/ProductCategoryField';
import { HSCodeField } from './product-form/HSCodeField';
import { CountryFields } from './product-form/CountryFields';
import { useProductForm } from './product-form/useProductForm';

const ProductDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  const { values, errors, updateField, validateField } = useProductForm(onChange);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Product Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductDescriptionField
          value={values.productDescription}
          error={errors.productDescription}
          onChange={(value) => updateField('productDescription', value)}
          onValidate={(value) => validateField('productDescription', value)}
        />

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

        <ProductValueField
          value={values.productValue}
          error={errors.productValue}
          onChange={(value) => updateField('productValue', value)}
          onValidate={(value) => validateField('productValue', value)}
        />

        <ProductCategoryField
          value={values.productCategory}
          onChange={(value) => updateField('productCategory', value)}
        />
      </div>
    </div>
  );
};

export default ProductDetailsForm;
