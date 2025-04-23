import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CostItem } from "./shared/CostItem";

interface RequirementTimelineItem {
  stage: string;
  documents: string[];
  deadline: string;
}

interface CountryRequirement {
  country: string;
  requirements: string[];
}

interface PermitInfo {
  permit: string;
  processingTime: string;
  fee: string;
  documentation: string[];
}

interface RegulatoryUpdate {
  date: string;
  title: string;
  description: string;
}

const RegulationsTab = () => {
  const requiredDocuments = [
    { name: 'Certificate of Origin', status: 'required' as const },
    { name: 'Commercial Invoice', status: 'required' as const },
    { name: 'Packing List', status: 'required' as const },
    { name: 'Bill of Lading/Airway Bill', status: 'required' as const },
    { name: 'Import/Export Licenses', status: 'warning' as const },
    { name: 'Safety/Compliance Certifications', status: 'required' as const },
    { name: 'Phytosanitary Certificate', status: 'not-required' as const }
  ];

  const regulatoryTimeline: RequirementTimelineItem[] = [
    { stage: 'Pre-shipment', documents: ['Certificate of Origin', 'Commercial Invoice', 'Export Licenses'], deadline: '14 days before departure' },
    { stage: 'During Transit', documents: ['Bill of Lading', 'Packing List'], deadline: 'Must accompany shipment' },
    { stage: 'Upon Arrival', documents: ['Import Licenses', 'Compliance Certifications'], deadline: 'Required for customs clearance' },
    { stage: 'Post-clearance', documents: ['Post-import Verification', 'Recordkeeping'], deadline: 'Within 30 days after clearance' }
  ];

  const countryRequirements: CountryRequirement[] = [
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

  const permitGuidance: PermitInfo[] = [
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

  const regulatoryUpdates: RegulatoryUpdate[] = [
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

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Required Documents Checklist</h3>
        <div className="space-y-3">
          {requiredDocuments.map((doc, index) => (
            <RequirementItem key={index} label={doc.name} status={doc.status} />
          ))}
        </div>
      </Card>

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

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Product-Specific Regulations</h3>
        <div className="space-y-4 text-gray-700">
          <p><span className="font-medium">Industry Standards:</span> ISO 9001:2015 compliance required for electronic components</p>
          <p><span className="font-medium">Testing Requirements:</span> EMC testing and certification needed before customs clearance</p>
          <p><span className="font-medium">Prohibited Components:</span> Products containing mercury or certain flame retardants are banned</p>
        </div>
      </Card>

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
  );
};

export default RegulationsTab;
