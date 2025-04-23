
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Clock, HelpCircle } from "lucide-react";

const RegulatoryComplianceDashboard = () => {
  const [completionRate, setCompletionRate] = useState(75);
  
  const complianceItems = [
    { 
      name: "Certificate of Origin", 
      status: "complete", 
      dueDate: "Completed", 
      isRequired: true,
      notes: "Issued by Chamber of Commerce. Valid for 12 months."
    },
    { 
      name: "Commercial Invoice", 
      status: "complete", 
      dueDate: "Completed", 
      isRequired: true,
      notes: "Includes HS codes and complete product descriptions."
    },
    { 
      name: "Packing List", 
      status: "complete", 
      dueDate: "Completed", 
      isRequired: true,
      notes: "Verified against actual shipment contents."
    },
    { 
      name: "Bill of Lading", 
      status: "in-progress", 
      dueDate: "Due in 3 days", 
      isRequired: true,
      notes: "Awaiting final carrier confirmation."
    },
    { 
      name: "Import License", 
      status: "in-progress", 
      dueDate: "Due in 7 days", 
      isRequired: true,
      notes: "Application submitted. Typically takes 5-7 business days."
    },
    { 
      name: "Safety Certification", 
      status: "not-started", 
      dueDate: "Due in 14 days", 
      isRequired: true,
      notes: "Required for electrical components. Testing in process."
    },
    { 
      name: "Phytosanitary Certificate", 
      status: "not-applicable", 
      dueDate: "N/A", 
      isRequired: false,
      notes: "Not required for this product category."
    },
  ];
  
  // Helper function to render status icon
  const renderStatusIcon = (status: string) => {
    switch(status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'not-started':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'not-applicable':
        return <HelpCircle className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Regulatory Compliance Dashboard</h3>
      <p className="text-sm text-muted-foreground">
        Track your compliance status and manage document requirements
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Summary stats */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <h4 className="text-sm font-medium">Overall Completion</h4>
                  <span className="text-sm font-medium">{completionRate}%</span>
                </div>
                <Progress value={completionRate} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-6">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Complete</span>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Not Started</span>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Not Required</span>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold">1</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="text-sm font-medium mb-2">Next Deadlines</h4>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between text-sm">
                    <span>Bill of Lading</span>
                    <span className="font-medium">3 days</span>
                  </li>
                  <li className="flex items-center justify-between text-sm">
                    <span>Import License</span>
                    <span className="font-medium">7 days</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Documents list */}
            <div className="md:col-span-2 max-h-[500px] overflow-y-auto pr-2">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-left text-muted-foreground">
                    <th className="pb-2">Document</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Due Date</th>
                    <th className="pb-2">Required</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {complianceItems.map((item) => (
                    <tr key={item.name} className="group">
                      <td className="py-3">
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.notes}</p>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          {renderStatusIcon(item.status)}
                          <span className="ml-1.5 text-xs capitalize">{item.status.replace('-', ' ')}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-xs">{item.dueDate}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-xs">{item.isRequired ? "Yes" : "No"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm">
        <p className="font-medium">Compliance Recommendations:</p>
        <ul className="list-disc pl-5 pt-2 space-y-1">
          <li>Start safety certification process immediately to avoid delays</li>
          <li>Consider using a customs broker to expedite import license</li>
          <li>Maintain digital copies of all documents in a centralized repository</li>
        </ul>
      </div>
    </div>
  );
};

export default RegulatoryComplianceDashboard;
