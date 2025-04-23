
import { Card, CardContent } from "@/components/ui/card";
import { Factory, Ship, Warehouse, Truck, PackageCheck, Store, FileText } from "lucide-react";

const SupplyChainFlowDiagram = () => {
  const flowSteps = [
    { 
      id: "manufacture", 
      name: "Manufacturing", 
      icon: Factory, 
      color: "bg-blue-100 text-blue-600", 
      documents: ["Commercial Invoice", "Packing List"],
      risks: ["Production delays", "Quality control issues"] 
    },
    { 
      id: "shipping", 
      name: "International Shipping", 
      icon: Ship, 
      color: "bg-purple-100 text-purple-600", 
      documents: ["Bill of Lading", "Certificate of Origin", "Insurance Certificate"],
      risks: ["Port congestion", "Weather delays", "Carrier reliability"] 
    },
    { 
      id: "customs", 
      name: "Customs Clearance", 
      icon: FileText, 
      color: "bg-amber-100 text-amber-600", 
      documents: ["Import License", "Customs Declaration", "Duty Payment Receipt"],
      risks: ["Regulatory changes", "Documentation errors", "Inspection delays"] 
    },
    { 
      id: "warehouse", 
      name: "Warehousing", 
      icon: Warehouse, 
      color: "bg-green-100 text-green-600", 
      documents: ["Warehouse Receipt", "Stock Transfer Form"],
      risks: ["Inventory discrepancies", "Storage conditions"] 
    },
    { 
      id: "lastMile", 
      name: "Last Mile Delivery", 
      icon: Truck, 
      color: "bg-red-100 text-red-600", 
      documents: ["Delivery Order", "Proof of Delivery"],
      risks: ["Local transportation delays", "Final mile coordination"] 
    },
    { 
      id: "delivery", 
      name: "Customer Delivery", 
      icon: Store, 
      color: "bg-teal-100 text-teal-600", 
      documents: ["Delivery Confirmation", "Quality Inspection Report"],
      risks: ["Customer rejection", "Return logistics"] 
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Supply Chain Flow Diagram</h3>
      <p className="text-sm text-muted-foreground">
        Visualize your entire supply chain to identify bottlenecks and critical handoff points
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between relative">
            {/* Connecting line through all steps */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            
            {/* Flow steps */}
            {flowSteps.map((step, index) => (
              <div 
                key={step.id}
                className="flex flex-col items-center relative z-10 md:w-1/6"
              >
                <div className={`rounded-full p-4 ${step.color}`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-medium mt-2 text-center">{step.name}</h4>
                
                {/* Circle indicator with step number */}
                <div className="hidden md:flex absolute top-0 -mt-3 items-center justify-center w-6 h-6 rounded-full bg-gray-800 text-white text-xs">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
          
          {/* Detailed step information */}
          <div className="mt-12 space-y-6">
            {flowSteps.map((step) => (
              <div key={`details-${step.id}`} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className={`rounded-full p-2 mr-2 ${step.color}`}>
                    <step.icon className="h-4 w-4" />
                  </div>
                  <h4 className="font-medium">{step.name}</h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-medium uppercase text-gray-500 mb-1">Required Documents</h5>
                    <ul className="text-xs space-y-1">
                      {step.documents.map((doc) => (
                        <li key={doc} className="flex items-center">
                          <FileText className="h-3 w-3 mr-1 text-gray-400" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium uppercase text-gray-500 mb-1">Potential Risks</h5>
                    <ul className="text-xs space-y-1">
                      {step.risks.map((risk) => (
                        <li key={risk} className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-400 mr-1" />
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="text-sm">
        <p className="font-medium">Process Optimization Insights:</p>
        <ul className="list-disc pl-5 pt-2 space-y-1">
          <li>Customs clearance represents the highest risk for delays</li>
          <li>Pre-filing documentation can reduce wait times by up to 40%</li>
          <li>Consider integrated logistics providers for smoother handoffs between stages</li>
        </ul>
      </div>
    </div>
  );
};

export default SupplyChainFlowDiagram;
