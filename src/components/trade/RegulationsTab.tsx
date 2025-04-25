
import { DocumentChecklist } from "./regulations/DocumentChecklist";
import { RegulatoryTimeline } from "./regulations/RegulatoryTimeline";
import { CountryRequirements } from "./regulations/CountryRequirements";
import { PermitGuidance } from "./regulations/PermitGuidance";
import { RegulatoryUpdates } from "./regulations/RegulatoryUpdates";
import { ProductRegulations } from "./regulations/ProductRegulations";
import { ComplianceCostSummary } from "./regulations/ComplianceCostSummary";
import { HelpfulResources } from "./regulations/HelpfulResources";
import { RegulationsTabProps } from "./regulations/types";

const RegulationsTab = ({ 
  productCategory, 
  originCountry, 
  destinationCountry, 
  isDangerous, 
  transportMode 
}: RegulationsTabProps) => {
  // Sample data - this will be replaced with real data in the future
  const requiredDocuments = [
    { name: "Commercial Invoice", status: 'required' as const },
    { name: "Packing List", status: 'required' as const },
    { name: "Bill of Lading", status: 'required' as const },
    { name: "Certificate of Origin", status: 'required' as const },
    { name: "Import License", status: 'warning' as const }
  ];

  const timeline = [
    {
      stage: "Pre-Shipment",
      documents: ["Export License", "Certificate of Origin"],
      deadline: "45 days prior to shipment"
    },
    {
      stage: "Customs Clearance",
      documents: ["Commercial Invoice", "Packing List", "Bill of Lading"],
      deadline: "Upon arrival"
    },
    {
      stage: "Post-Clearance",
      documents: ["Import Declaration", "Payment Receipt"],
      deadline: "30 days after clearance"
    }
  ];

  const countryRequirements = [
    {
      country: "United States",
      requirements: [
        "FDA Prior Notice",
        "Lacey Act Declaration",
        "FCC Declaration of Conformity"
      ]
    },
    {
      country: "European Union",
      requirements: [
        "CE Marking",
        "REACH Compliance",
        "RoHS Compliance",
        "WEEE Registration"
      ]
    }
  ];

  const permits = [
    {
      permit: "Import License",
      processingTime: "15-30 days",
      fee: "$150",
      documentation: ["Application Form", "Commercial Invoice", "Business License"]
    },
    {
      permit: "Special Commodity Permit",
      processingTime: "10-14 days",
      fee: "$85",
      documentation: ["Technical Specifications", "Safety Data Sheet"]
    }
  ];

  const updates = [
    {
      date: "July 1, 2025",
      title: "New Labeling Requirements",
      description: "All electronic products must include energy efficiency labels and QR codes linking to disposal instructions."
    },
    {
      date: "September 15, 2025",
      title: "Tariff Increase",
      description: "10% additional duty on certain electronic components from non-FTA countries."
    }
  ];

  return (
    <div className="space-y-8">
      <DocumentChecklist requiredDocuments={requiredDocuments} />
      <RegulatoryTimeline timeline={timeline} />
      <CountryRequirements requirements={countryRequirements} />
      <ProductRegulations />
      <PermitGuidance permits={permits} />
      <RegulatoryUpdates updates={updates} />
      <ComplianceCostSummary />
      <HelpfulResources />
    </div>
  );
};

export default RegulationsTab;
