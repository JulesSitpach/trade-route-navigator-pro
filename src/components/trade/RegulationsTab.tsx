import { Card } from "@/components/ui/card";
import { DocumentChecklist } from "./regulations/DocumentChecklist";
import { RegulatoryTimeline } from "./regulations/RegulatoryTimeline";
import { CountryRequirements } from "./regulations/CountryRequirements";
import { PermitGuidance } from "./regulations/PermitGuidance";
import { RegulatoryUpdates } from "./regulations/RegulatoryUpdates";
import { CostItem } from "./shared/CostItem";

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
    <div className="space-y-8">
      <DocumentChecklist requiredDocuments={requiredDocuments} />
      <RegulatoryTimeline timeline={regulatoryTimeline} />
      <CountryRequirements requirements={countryRequirements} />

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Product-Specific Regulations</h3>
        <div className="space-y-4 text-gray-700">
          <p><span className="font-medium">Industry Standards:</span> ISO 9001:2015 compliance required for electronic components</p>
          <p><span className="font-medium">Testing Requirements:</span> EMC testing and certification needed before customs clearance</p>
          <p><span className="font-medium">Prohibited Components:</span> Products containing mercury or certain flame retardants are banned</p>
        </div>
      </Card>

      <PermitGuidance permits={permitGuidance} />
      <RegulatoryUpdates updates={regulatoryUpdates} />

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
