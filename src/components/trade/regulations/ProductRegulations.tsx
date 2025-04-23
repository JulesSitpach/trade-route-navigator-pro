
import { Card } from "@/components/ui/card";

export const ProductRegulations = () => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold mb-4">Product-Specific Regulations</h3>
    <div className="space-y-4 text-gray-700">
      <p><span className="font-medium">Industry Standards:</span> ISO 9001:2015 compliance required for electronic components</p>
      <p><span className="font-medium">Testing Requirements:</span> EMC testing and certification needed before customs clearance</p>
      <p><span className="font-medium">Prohibited Components:</span> Products containing mercury or certain flame retardants are banned</p>
    </div>
  </Card>
);
