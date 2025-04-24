
import { useState } from 'react';

export interface ProductFormValues {
  productDescription: string;
  hsCode: string;
  originCountry: string;
  destinationCountry: string;
  productValue: string;
  productCategory: string;
}

export interface ProductFormErrors {
  [key: string]: string;
}

export const useProductForm = (onChange: (data: Partial<ProductFormValues>) => void) => {
  const [values, setValues] = useState<ProductFormValues>({
    productDescription: '',
    hsCode: '',
    originCountry: '',
    destinationCountry: '',
    productValue: '',
    productCategory: ''
  });
  
  const [errors, setErrors] = useState<ProductFormErrors>({});

  const updateField = (field: keyof ProductFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    if (value) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    onChange({ [field]: value });
  };

  const validateField = (field: string, value: string): boolean => {
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

  return {
    values,
    errors,
    updateField,
    validateField
  };
};
