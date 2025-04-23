
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import AlternativeRoutes from './AlternativeRoutes';
import TradeOpportunities from './TradeOpportunities';
import TariffAnalysis from './TariffAnalysis';

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
      type: 'savings' as const
    },
    {
      title: 'Triangular Trade: China → Mexico → US',
      savings: '$2,875.00',
      tags: ['USMCA Advantage', 'Requires Processing'],
      description: 'Import components from China to Mexico (15% tariff), perform sufficient processing to meet USMCA requirements, then export to US with 0% tariff.',
      currentRoute: 'China → US (125% tariff)',
      alternativeRoute: 'China → Mexico (15% tariff) → US (0% tariff under USMCA)',
      type: 'savings' as const
    }
  ];

  const requiredDocuments = [
    { name: 'Certificate of Origin', status: 'required' as const },
    { name: 'Commercial Invoice', status: 'required' as const },
    { name: 'Packing List', status: 'required' as const },
    { name: 'Bill of Lading/Airway Bill', status: 'required' as const },
    { name: 'Import/Export Licenses', status: 'warning' as const },
    { name: 'Safety/Compliance Certifications', status: 'required' as const },
    { name: 'Phytosanitary Certificate', status: 'not-required' as const }
  ];

  const regulatoryTimeline = [
    { stage: 'Pre-shipment', documents: ['Certificate of Origin', 'Commercial Invoice', 'Export Licenses'], deadline: '14 days before departure' },
    { stage: 'During Transit', documents: ['Bill of Lading', 'Packing List'], deadline: 'Must accompany shipment' },
    { stage: 'Upon Arrival', documents: ['Import Licenses', 'Compliance Certifications'], deadline: 'Required for customs clearance' },
    { stage: 'Post-clearance', documents: ['Post-import Verification', 'Recordkeeping'], deadline: 'Within 30 days after clearance' }
  ];

  const countryRequirements = [
    {
      country: 'United States',
      requirements: [
        'FDA registration for food products',
        'Electronic cargo information submission 24hrs before loading',
        'ISF filing required',
        'English labeling mandatory'
      ]
    },
    {
      country: 'European Union',
      requirements: [
        'CE marking for applicable products',
        'REACH compliance for chemicals',
        'GDPR compliance for consumer data',
        'Country of origin marking in local language'
      ]
    }
  ];

  const permitGuidance = [
    {
      permit: 'Import License',
      processingTime: '10-15 business days',
      fee: '$150-$300',
      documentation: ['Business registration', 'Product specifications', 'End-user statement']
    },
    {
      permit: 'Customs Bond',
      processingTime: '3-5 business days',
      fee: '0.5% of shipment value (minimum $100)',
      documentation: ['Company financial statements', 'Surety approval']
    }
  ];

  const regulatoryUpdates = [
    {
      date: 'January 2025',
      title: 'New Electronic Documentation System',
      description: 'All import documentation must be submitted through the new government electronic portal.'
    },
    {
      date: 'March 2025',
      title: 'Revised Tariff Schedule',
      description: 'Tariff rates for electronic components will increase by 5% under new trade agreement provisions.'
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
          <TariffAnalysis />
        </TabsContent>

        <TabsContent value="regulations">
          <div className="space-y-8">
            {/* Required Documents Checklist */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Required Documents Checklist</h3>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <RequirementItem key={index} label={doc.name} status={doc.status} />
                ))}
              </div>
            </Card>

            {/* Regulatory Timeline */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Regulatory Timeline</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Stage</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Deadline</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regulatoryTimeline.map((stage, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{stage.stage}</TableCell>
                      <TableCell>{stage.documents.join(', ')}</TableCell>
                      <TableCell>{stage.deadline}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Country-Specific Requirements */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Country-Specific Requirements</h3>
              <Accordion type="single" collapsible className="w-full">
                {countryRequirements.map((country, index) => (
                  <AccordionItem key={index} value={`country-${index}`}>
                    <AccordionTrigger className="text-left">{country.country}</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {country.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-gray-700">{req}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            {/* Product-Specific Regulations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Product-Specific Regulations</h3>
              <div className="space-y-4 text-gray-700">
                <p><span className="font-medium">Industry Standards:</span> ISO 9001:2015 compliance required for electronic components</p>
                <p><span className="font-medium">Testing Requirements:</span> EMC testing and certification needed before customs clearance</p>
                <p><span className="font-medium">Prohibited Components:</span> Products containing mercury or certain flame retardants are banned</p>
              </div>
            </Card>

            {/* Permit Application Guidance */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Permit Application Guidance</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permit Type</TableHead>
                    <TableHead>Processing Time</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Required Documentation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {permitGuidance.map((permit, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{permit.permit}</TableCell>
                      <TableCell>{permit.processingTime}</TableCell>
                      <TableCell>{permit.fee}</TableCell>
                      <TableCell>{permit.documentation.join(', ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4">
                <p className="text-blue-700 font-medium">Official Application Portal:</p>
                <a href="#" className="text-blue-600 hover:underline">https://trade.gov/import-permits</a>
              </div>
            </Card>

            {/* Customs Procedures */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Customs Procedures</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Clearance Process:</h4>
                  <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                    <li>File entry documents through Automated Broker Interface</li>
                    <li>Pay estimated duties, taxes, and fees</li>
                    <li>CBP examination (if selected)</li>
                    <li>Release of goods</li>
                    <li>Final duty determination and adjustment</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Common Delay Reasons:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Incomplete or inaccurate documentation</li>
                    <li>Missing safety certifications</li>
                    <li>Incorrect HTS classification</li>
                    <li>Random inspection selection</li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Regulatory Updates */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Regulatory Updates</h3>
              <div className="space-y-4">
                {regulatoryUpdates.map((update, index) => (
                  <div key={index} className="border-l-4 border-amber-500 pl-4 py-2">
                    <p className="text-amber-700 font-medium">{update.date}: {update.title}</p>
                    <p className="text-gray-700">{update.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Compliance Cost Summary */}
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

            {/* Helpful Resources */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Helpful Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Customs Brokers</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>Global Trade Solutions: (555) 123-4567</li>
                    <li>Express Customs Brokers: (555) 987-6543</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Trade Assistance</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>International Trade Administration</li>
                    <li>U.S. Commercial Service</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-800">Regulatory Authorities</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>Customs and Border Protection</li>
                    <li>Food and Drug Administration</li>
                    <li>Consumer Product Safety Commission</li>
                  </ul>
                </div>
              </div>
            </Card>
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
