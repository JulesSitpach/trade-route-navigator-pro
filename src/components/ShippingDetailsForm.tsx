
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const ShippingDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  const [values, setValues] = useState({
    quantity: '',
    transportMode: '',
    shipmentType: '',
    packageType: '',
    dangerousGoods: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    specialRequirements: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: string, value: string) => {
    // Update the local state
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear the error for this field if it has a value
    if (value) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Update the parent component
    onChange({ [field]: value });
  };

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
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Shipping Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="quantity" className="flex items-center gap-1">
            Quantity
            <span className="text-red-500">*</span>
          </Label>
          <Input 
            id="quantity" 
            type="number" 
            min="1"
            value={values.quantity}
            placeholder="Enter quantity"
            onChange={(e) => {
              updateField('quantity', e.target.value);
              validateField('quantity', e.target.value);
            }}
            className={cn(
              errors.quantity && "border-red-500 focus-visible:ring-red-500"
            )}
          />
          {errors.quantity && (
            <p className="text-sm text-red-500 mt-1">{errors.quantity}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportMode" className="flex items-center gap-1">
            Transport Mode
            <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={values.transportMode} 
            onValueChange={(value) => {
              updateField('transportMode', value);
              validateField('transportMode', value);
            }}
          >
            <SelectTrigger 
              id="transportMode"
              className={cn(
                errors.transportMode && "border-red-500 focus-visible:ring-red-500"
              )}
            >
              <SelectValue placeholder="Select Transport Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ocean">Ocean</SelectItem>
              <SelectItem value="air">Air</SelectItem>
              <SelectItem value="road">Road</SelectItem>
              <SelectItem value="rail">Rail</SelectItem>
              <SelectItem value="multimodal">Multimodal</SelectItem>
            </SelectContent>
          </Select>
          {errors.transportMode && (
            <p className="text-sm text-red-500 mt-1">{errors.transportMode}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="shipmentType">Shipment Type</Label>
          <Select 
            value={values.shipmentType} 
            onValueChange={(value) => updateField('shipmentType', value)}
          >
            <SelectTrigger id="shipmentType">
              <SelectValue placeholder="Select Shipment Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fcl">Full Container Load (FCL)</SelectItem>
              <SelectItem value="lcl">Less than Container Load (LCL)</SelectItem>
              <SelectItem value="bulk">Bulk Cargo</SelectItem>
              <SelectItem value="breakbulk">Break Bulk</SelectItem>
              <SelectItem value="roro">Roll-on/Roll-off</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input 
            id="weight" 
            type="number" 
            value={values.weight}
            placeholder="Enter weight in kg"
            onChange={(e) => updateField('weight', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Dimensions (cm)</Label>
          <div className="grid grid-cols-3 gap-4">
            <Input 
              placeholder="Length" 
              value={values.length}
              onChange={(e) => updateField('length', e.target.value)}
            />
            <Input 
              placeholder="Width" 
              value={values.width}
              onChange={(e) => updateField('width', e.target.value)}
            />
            <Input 
              placeholder="Height" 
              value={values.height}
              onChange={(e) => updateField('height', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="packageType">Packaging Type</Label>
          <Select 
            value={values.packageType} 
            onValueChange={(value) => updateField('packageType', value)}
          >
            <SelectTrigger id="packageType">
              <SelectValue placeholder="Select Package Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="boxes">Boxes</SelectItem>
              <SelectItem value="pallets">Pallets</SelectItem>
              <SelectItem value="drums">Drums</SelectItem>
              <SelectItem value="bags">Bags</SelectItem>
              <SelectItem value="crates">Crates</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dangerousGoods">Dangerous Goods</Label>
          <Select 
            value={values.dangerousGoods} 
            onValueChange={(value) => updateField('dangerousGoods', value)}
          >
            <SelectTrigger id="dangerousGoods">
              <SelectValue placeholder="Select Dangerous Goods Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no">No</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="specialRequirements">Special Requirements</Label>
          <Textarea 
            id="specialRequirements" 
            placeholder="Enter any special shipping requirements or notes"
            value={values.specialRequirements}
            className="min-h-[100px]"
            onChange={(e) => updateField('specialRequirements', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
