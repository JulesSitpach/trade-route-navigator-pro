import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const ShippingDetailsForm = ({ onChange }: { onChange: (data: any) => void }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-blue-900 mb-6">Shipping Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input 
            id="quantity" 
            type="number" 
            min="1"
            placeholder="Enter quantity"
            onChange={(e) => onChange({ quantity: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="transportMode">Transport Mode</Label>
          <Select onValueChange={(value) => onChange({ transportMode: value })}>
            <SelectTrigger id="transportMode">
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
        </div>

        <div className="space-y-2">
          <Label htmlFor="shipmentType">Shipment Type</Label>
          <Select onValueChange={(value) => onChange({ shipmentType: value })}>
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
            placeholder="Enter weight in kg"
            onChange={(e) => onChange({ weight: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Dimensions (cm)</Label>
          <div className="grid grid-cols-3 gap-4">
            <Input placeholder="Length" onChange={(e) => onChange({ length: e.target.value })} />
            <Input placeholder="Width" onChange={(e) => onChange({ width: e.target.value })} />
            <Input placeholder="Height" onChange={(e) => onChange({ height: e.target.value })} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="packageType">Packaging Type</Label>
          <Select onValueChange={(value) => onChange({ packageType: value })}>
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
          <Select onValueChange={(value) => onChange({ dangerousGoods: value })}>
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
            className="min-h-[100px]"
            onChange={(e) => onChange({ specialRequirements: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingDetailsForm;
