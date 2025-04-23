
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface RequirementItemProps {
  label: string;
  status: 'required' | 'warning' | 'not-required';
}

interface CostItemProps {
  label: string;
  value: string;
  className?: string;
}

const CostItem = ({ label, value, className = "" }: CostItemProps) => (
  <div className={`flex justify-between items-center ${className}`}>
    <span className="text-gray-700">{label}</span>
    <span className="text-blue-900 font-semibold">{value}</span>
  </div>
);

const RequirementItem = ({ label, status }: RequirementItemProps) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <Badge variant={status === 'warning' ? 'destructive' : status === 'required' ? 'default' : 'secondary'}>
      {status === 'not-required' ? 'Not Required' : 'Required'}
    </Badge>
  </div>
);

const CostAnalysisTab = () => {
  return (
    <>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h4 className="text-blue-700 font-semibold mb-2">Recommended Strategy</h4>
        <p className="text-gray-700">
          Based on your product and destinations, we recommend ocean freight via Panama 
          with consolidated shipping to reduce costs by approximately 18%.
        </p>
      </div>

      <div className="space-y-4">
        <CostItem label="Product Value" value="$10,000.00" />
        <CostItem label="Import Duty (8.5%)" value="$850.00" />
        <CostItem label="Freight Cost" value="$1,200.00" />
        <CostItem label="Insurance (1.2%)" value="$120.00" />
        <CostItem label="Documentation Fees" value="$75.00" />
        <CostItem label="Customs Clearance" value="$150.00" />
        <CostItem label="Inland Transportation" value="$300.00" />
        <CostItem label="Warehousing" value="$200.00" />
        <CostItem label="Other Taxes and Fees" value="$180.00" />

        <div className="border-t-2 border-gray-200 pt-4 mt-6">
          <CostItem 
            label="Total Landed Cost" 
            value="$13,075.00" 
            className="text-lg font-bold"
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Import Requirements</h3>
        <div className="space-y-4">
          <RequirementItem label="Certificate of Origin" status="required" />
          <RequirementItem label="Import License" status="warning" />
          <RequirementItem label="Safety Certification" status="required" />
          <RequirementItem label="Phytosanitary Certificate" status="not-required" />
        </div>
      </div>
    </>
  );
};

export default CostAnalysisTab;
