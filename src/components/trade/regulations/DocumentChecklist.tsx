
import { Card } from "@/components/ui/card";
import { RequirementItem } from "./RequirementItem";

interface DocumentChecklistProps {
  requiredDocuments: Array<{
    name: string;
    status: 'required' | 'warning' | 'not-required';
  }>;
}

export const DocumentChecklist = ({ requiredDocuments }: DocumentChecklistProps) => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold mb-4">Required Documents Checklist</h3>
    <div className="space-y-3">
      {requiredDocuments.map((doc, index) => (
        <RequirementItem key={index} label={doc.name} status={doc.status} />
      ))}
    </div>
  </Card>
);
