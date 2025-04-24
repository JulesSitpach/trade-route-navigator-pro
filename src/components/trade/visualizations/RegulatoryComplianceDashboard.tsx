
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Clock, HelpCircle } from "lucide-react";
import { requiredDocuments, regulatoryTimeline } from '../data/sampleData';

const RegulatoryComplianceDashboard = () => {
  const [completionRate, setCompletionRate] = useState(75);
  
  const [complianceItems, setComplianceItems] = useState(() => 
    requiredDocuments.map(doc => ({
      name: doc.name,
      status: doc.status === 'required' ? 'complete' : 
              doc.status === 'warning' ? 'in-progress' : 'not-applicable',
      dueDate: doc.status === 'required' ? "Completed" : 
               doc.status === 'warning' ? "Due in 7 days" : "N/A",
      isRequired: doc.status !== 'not-required',
      notes: getDocNotes(doc.name)
    }))
  );
  
  // Helper function to get notes for documents
  function getDocNotes(docName: string): string {
    switch(docName) {
      case "Certificate of Origin": 
        return "Issued by Chamber of Commerce. Valid for 12 months.";
      case "Commercial Invoice": 
        return "Includes HS codes and complete product descriptions.";
      case "Packing List": 
        return "Verified against actual shipment contents.";
      case "Bill of Lading/Airway Bill": 
        return "Awaiting final carrier confirmation.";
      case "Import/Export Licenses": 
        return "Application submitted. Typically takes 5-7 business days.";
      case "Safety/Compliance Certifications": 
        return "Required for electrical components. Testing in process.";
      case "Phytosanitary Certificate": 
        return "Not required for this product category.";
      default: 
        return "Documentation required for customs clearance.";
    }
  }

  useEffect(() => {
    // Calculate completion rate based on completed items
    const totalRequired = complianceItems.filter(item => item.isRequired).length;
    const completed = complianceItems.filter(item => item.status === 'complete' && item.isRequired).length;
    
    if (totalRequired > 0) {
      const rate = Math.round((completed / totalRequired) * 100);
      setCompletionRate(rate);
    }
  }, [complianceItems]);
  
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

  // Count documents by status
  const completeCount = complianceItems.filter(item => item.status === 'complete').length;
  const inProgressCount = complianceItems.filter(item => item.status === 'in-progress').length;
  const notStartedCount = complianceItems.filter(item => item.status === 'not-started').length;
  const notApplicableCount = complianceItems.filter(item => item.status === 'not-applicable').length;

  // Get upcoming deadlines
  const upcomingDeadlines = complianceItems
    .filter(item => item.status === 'in-progress' || item.status === 'not-started')
    .slice(0, 2);

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
                  <p className="text-2xl font-bold">{completeCount}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Progress</span>
                    <Clock className="h-4 w-4 text-amber-500" />
                  </div>
                  <p className="text-2xl font-bold">{inProgressCount}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Not Started</span>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  </div>
                  <p className="text-2xl font-bold">{notStartedCount}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Not Required</span>
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold">{notApplicableCount}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="text-sm font-medium mb-2">Next Deadlines</h4>
                <ul className="space-y-2">
                  {upcomingDeadlines.map((item, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span>{item.name}</span>
                      <span className="font-medium">{item.dueDate}</span>
                    </li>
                  ))}
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
