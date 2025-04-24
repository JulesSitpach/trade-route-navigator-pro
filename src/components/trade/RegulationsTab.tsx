
import { DocumentChecklist } from "./regulations/DocumentChecklist";
import { RegulatoryTimeline } from "./regulations/RegulatoryTimeline";
import { CountryRequirements } from "./regulations/CountryRequirements";
import { PermitGuidance } from "./regulations/PermitGuidance";
import { RegulatoryUpdates } from "./regulations/RegulatoryUpdates";
import { ProductRegulations } from "./regulations/ProductRegulations";
import { ComplianceCostSummary } from "./regulations/ComplianceCostSummary";
import { HelpfulResources } from "./regulations/HelpfulResources";

const RegulationsTab = () => {
  return (
    <div className="space-y-8">
      <DocumentChecklist requiredDocuments={[]} />
      <RegulatoryTimeline timeline={[]} />
      <CountryRequirements requirements={[]} />
      <ProductRegulations />
      <PermitGuidance permits={[]} />
      <RegulatoryUpdates updates={[]} />
      <ComplianceCostSummary />
      <HelpfulResources />
    </div>
  );
};

export default RegulationsTab;
