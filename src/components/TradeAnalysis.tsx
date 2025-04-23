
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TradeAnalysis = ({ data }: { data: any }) => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-blue-900 mb-6">Trade Analysis Results</h2>
      
      <Tabs defaultValue="costs">
        <TabsList className="w-full">
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="routes">Alternative Routes</TabsTrigger>
          <TabsTrigger value="tariffs">Tariff Analysis</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
        </TabsList>

        <TabsContent value="costs" className="mt-6">
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
        </TabsContent>

        <TabsContent value="routes">
          <div className="text-center py-8 text-gray-500">
            Route analysis will be available in the next version
          </div>
        </TabsContent>

        <TabsContent value="tariffs">
          <div className="text-center py-8 text-gray-500">
            Tariff analysis will be available in the next version
          </div>
        </TabsContent>

        <TabsContent value="regulations">
          <div className="text-center py-8 text-gray-500">
            Regulations details will be available in the next version
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CostItem = ({ 
  label, 
  value, 
  className = "" 
}: { 
  label: string; 
  value: string; 
  className?: string 
}) => (
  <div className={`flex justify-between items-center ${className}`}>
    <span className="text-gray-700">{label}</span>
    <span className="text-blue-900 font-semibold">{value}</span>
  </div>
);

const RequirementItem = ({ 
  label, 
  status 
}: { 
  label: string; 
  status: 'required' | 'warning' | 'not-required' 
}) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <Badge variant={status === 'warning' ? 'destructive' : status === 'required' ? 'default' : 'secondary'}>
      {status === 'not-required' ? 'Not Required' : 'Required'}
    </Badge>
  </div>
);

export default TradeAnalysis;
