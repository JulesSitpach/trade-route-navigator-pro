
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CostItem } from "./shared/CostItem";

interface RequirementItemProps {
  label: string;
  status: 'required' | 'warning' | 'not-required';
}

const RequirementItem = ({ label, status }: RequirementItemProps) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <Badge variant={status === 'warning' ? 'destructive' : status === 'required' ? 'default' : 'secondary'}>
      {status === 'not-required' ? 'Not Required' : 'Required'}
    </Badge>
  </div>
);

const CostAnalysisTab = () => {
  // These will be populated from actual data in the future
  const costItems: {label: string; value: string}[] = [];
  const importRequirements: {label: string; status: 'required' | 'warning' | 'not-required'}[] = [];
  const recommendedStrategy = '';

  return (
    <>
      {recommendedStrategy ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="text-blue-700 font-semibold mb-2">Recommended Strategy</h4>
          <p className="text-gray-700">{recommendedStrategy}</p>
        </div>
      ) : (
        <div className="bg-gray-100 border-l-4 border-gray-400 p-4 mb-6">
          <p className="text-gray-700">
            No trade strategy recommendation available yet. Please complete your product and shipping details.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {costItems.length > 0 ? (
          costItems.map((item, index) => (
            <CostItem 
              key={index}
              label={item.label}
              value={item.value}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-6">
            No cost breakdown data available yet
          </div>
        )}

        {costItems.length > 0 && (
          <div className="border-t-2 border-gray-200 pt-4 mt-6">
            <CostItem 
              label="Total Landed Cost" 
              value="Pending" 
              className="text-lg font-bold"
            />
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Import Requirements</h3>
        {importRequirements.length > 0 ? (
          <div className="space-y-4">
            {importRequirements.map((req, index) => (
              <RequirementItem 
                key={index}
                label={req.label} 
                status={req.status} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-6">
            No import requirements data available yet
          </div>
        )}
      </div>
    </>
  );
};

export default CostAnalysisTab;
