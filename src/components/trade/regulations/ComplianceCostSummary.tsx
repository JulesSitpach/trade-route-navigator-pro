
import { Card } from "@/components/ui/card";
import { CostItem } from "../shared/CostItem";

export const ComplianceCostSummary = () => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold mb-4">Compliance Cost Summary</h3>
    <div className="space-y-3">
      <CostItem label="Document Fees" value="$225.00" />
      <CostItem label="Testing/Certification Costs" value="$1,500.00" />
      <CostItem label="Licensing Fees" value="$350.00" />
      <CostItem label="Customs Broker Fees" value="$275.00" />
      <div className="border-t-2 border-gray-200 pt-3 mt-4">
        <CostItem 
          label="Total Compliance Costs" 
          value="$2,350.00" 
          className="font-semibold"
        />
      </div>
      <p className="text-gray-600 italic mt-2">Estimated compliance preparation time: 3-4 weeks</p>
    </div>
  </Card>
);
