import { DocumentChecklist } from "./regulations/DocumentChecklist";
import { RegulatoryTimeline } from "./regulations/RegulatoryTimeline";
import { CountryRequirements } from "./regulations/CountryRequirements";
import { PermitGuidance } from "./regulations/PermitGuidance";
import { RegulatoryUpdates } from "./regulations/RegulatoryUpdates";
import { ProductRegulations } from "./regulations/ProductRegulations";
import { ComplianceCostSummary } from "./regulations/ComplianceCostSummary";
import { HelpfulResources } from "./regulations/HelpfulResources";

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
      <ProductRegulations />
      <PermitGuidance permits={permitGuidance} />
      <RegulatoryUpdates updates={regulatoryUpdates} />
      <ComplianceCostSummary />
      <HelpfulResources />
    </div>
  );
};

export default RegulationsTab;
