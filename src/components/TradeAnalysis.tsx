import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import AlternativeRoutes from './AlternativeRoutes';
import TradeOpportunities from './TradeOpportunities';

const TradeAnalysis = ({ data }: { data: any }) => {
  const routes = [
    {
      path: 'Shanghai → Panama Canal → Los Angeles → Chicago',
      transitTime: '24 days',
      cost: '$2,450',
      riskLevel: 'Medium',
      description: 'Standard ocean freight route with well-established logistics providers. Reliable and cost-effective for non-urgent shipments.',
      recommended: true
    },
    {
      path: 'Shanghai → Los Angeles → Chicago',
      transitTime: '3 days',
      cost: '$5,650',
      riskLevel: 'Low',
      description: 'Premium air freight service for time-sensitive shipments. Significantly higher cost but offers much faster delivery and reduced risk.',
      savings: '$3,200 (130%)'
    }
  ];

  const opportunities = [
    {
      title: 'Alternative Origin: Vietnam Instead of China',
      savings: '$3,125.00',
      tags: ['Tariff Reduction', 'Lower Risk'],
      description: 'Sourcing this product from Vietnam instead of China would reduce the tariff rate from 125% to 10%, resulting in significant savings on duty costs.',
      currentRoute: 'China → US (125% tariff)',
      alternativeRoute: 'Vietnam → US (10% tariff)',
      type: 'savings'
    },
    {
      title: 'Triangular Trade: China → Mexico → US',
      savings: '$2,875.00',
      tags: ['USMCA Advantage', 'Requires Processing'],
      description: 'Import components from China to Mexico (15% tariff), perform sufficient processing to meet USMCA requirements, then export to US with 0% tariff.',
      currentRoute: 'China → US (125% tariff)',
      alternativeRoute: 'China → Mexico (15% tariff) → US (0% tariff under USMCA)',
      type: 'savings'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Trade Analysis Results</h2>
      
      <Tabs defaultValue="costs" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="routes">Alternative Routes</TabsTrigger>
          <TabsTrigger value="tariffs">Tariff Analysis</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
        </TabsList>

        <TabsContent value="costs">
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
          <AlternativeRoutes routes={routes} />
        </TabsContent>

        <TabsContent value="tariffs">
          <TradeOpportunities opportunities={opportunities} />
        </TabsContent>

        <TabsContent value="regulations">
          <div className="text-center py-8 text-gray-500">
            Regulations details will be available in the next version
          </div>
        </TabsContent>

        <TabsContent value="visualizations">
          <div className="text-center py-8 text-gray-500">
            Visualization features will be available in the next version
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
