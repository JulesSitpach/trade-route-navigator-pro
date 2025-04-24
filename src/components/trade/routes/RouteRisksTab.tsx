
import { Badge } from "@/components/ui/badge";
import { DollarSign, Layers, Shield } from "lucide-react";
import { Route } from '../../trade/types';

interface RouteRisksTabProps {
  route: Route;
}

const RouteRisksTab = ({ route }: RouteRisksTabProps) => {
  return (
    <div className="space-y-4 pt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk Mitigation Strategies
          </h4>
          
          {route.riskMitigation?.insuranceOptions && route.riskMitigation.insuranceOptions.length > 0 && (
            <div className="space-y-1">
              <div className="font-medium text-sm">Insurance Options</div>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {route.riskMitigation.insuranceOptions.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
            </div>
          )}
          
          {route.riskMitigation?.backupRoutes && route.riskMitigation.backupRoutes.length > 0 && (
            <div className="space-y-1">
              <div className="font-medium text-sm">Backup Routes</div>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {route.riskMitigation.backupRoutes.map((backup, i) => (
                  <li key={i}>{backup}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financial Considerations
          </h4>
          
          {route.financialConsiderations && (
            <div className="space-y-3 text-sm">
              {route.financialConsiderations.cashFlowImpact && (
                <div>
                  <span className="font-medium">Cash Flow Impact:</span> {route.financialConsiderations.cashFlowImpact}
                </div>
              )}
              {route.financialConsiderations.paymentTerms && (
                <div>
                  <span className="font-medium">Available Payment Terms:</span> {route.financialConsiderations.paymentTerms}
                </div>
              )}
              {route.financialConsiderations.tradeFinance && (
                <div>
                  <span className="font-medium">Trade Finance Options:</span> {route.financialConsiderations.tradeFinance}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="pt-2">
        <h4 className="font-medium mb-2 flex items-center gap-2">
          <Layers className="h-4 w-4" />
          Compliance Complexity
        </h4>
        
        {route.complianceComplexity?.level && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm">Complexity Level:</span>
              <Badge className={
                route.complianceComplexity.level === "Low" ? "bg-green-100 text-green-800" :
                route.complianceComplexity.level === "Medium" ? "bg-amber-100 text-amber-800" :
                "bg-red-100 text-red-800"
              }>
                {route.complianceComplexity.level}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RouteRisksTab;
