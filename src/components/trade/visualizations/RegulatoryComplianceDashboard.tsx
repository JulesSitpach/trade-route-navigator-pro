
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ClipboardCheckIcon, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const RegulatoryComplianceDashboard = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample compliance data
  const complianceData = [
    {
      id: 'import-license',
      name: 'Import License',
      category: 'documentation',
      status: 'compliant',
      progress: 100,
      dueDate: '2025-05-15',
      description: 'Required for importing goods into the destination country'
    },
    {
      id: 'customs-declaration',
      name: 'Customs Declaration',
      category: 'documentation',
      status: 'inProgress',
      progress: 70,
      dueDate: '2025-05-10',
      description: 'Declaration of imported goods for customs clearance'
    },
    {
      id: 'product-certification',
      name: 'Product Certification',
      category: 'product',
      status: 'nonCompliant',
      progress: 30,
      dueDate: '2025-05-05',
      description: 'Certification of product compliance with local standards'
    },
    {
      id: 'safety-standards',
      name: 'Safety Standards',
      category: 'product',
      status: 'compliant',
      progress: 100,
      dueDate: '2025-04-30',
      description: 'Compliance with safety regulations in destination market'
    },
    {
      id: 'labeling-requirements',
      name: 'Labeling Requirements',
      category: 'packaging',
      status: 'inProgress',
      progress: 60,
      dueDate: '2025-05-12',
      description: 'Product labeling compliant with local regulations'
    },
    {
      id: 'tariff-classification',
      name: 'Tariff Classification',
      category: 'tariffs',
      status: 'compliant',
      progress: 100,
      dueDate: '2025-04-28',
      description: 'Proper classification of goods for duty assessment'
    }
  ];

  // Filter compliance items based on active category
  const filteredItems = activeCategory === 'all' 
    ? complianceData 
    : complianceData.filter(item => item.category === activeCategory);

  // Calculate overall compliance percentages
  const compliantCount = complianceData.filter(item => item.status === 'compliant').length;
  const totalCount = complianceData.length;
  const compliancePercentage = Math.round((compliantCount / totalCount) * 100);

  // Category filters
  const categories = [
    { id: 'all', label: 'All Requirements' },
    { id: 'documentation', label: 'Documentation' },
    { id: 'product', label: 'Product Standards' },
    { id: 'packaging', label: 'Packaging & Labeling' },
    { id: 'tariffs', label: 'Tariff Compliance' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardCheckIcon className="h-5 w-5 text-muted-foreground" />
        <h3 className="text-lg font-medium">
          {t('compliance.title')}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground">
        {t('compliance.description')}
      </p>
      
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm font-medium text-blue-800 mb-2">Overall Compliance</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-700">{compliancePercentage}%</span>
                <span className="text-sm text-blue-600">Complete</span>
              </div>
              <Progress value={compliancePercentage} className="mt-2" />
            </div>

            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
              <h4 className="text-sm font-medium text-amber-800 mb-2">Critical Requirements</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-amber-700">2</span>
                <span className="text-sm text-amber-600">Due this week</span>
              </div>
              <div className="flex items-center text-amber-600 gap-1 mt-2 text-xs">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Requires immediate attention</span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="text-sm font-medium text-green-800 mb-2">Completed Requirements</h4>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-green-700">{compliantCount}</span>
                <span className="text-sm text-green-600">of {totalCount}</span>
              </div>
              <div className="flex items-center text-green-600 gap-1 mt-2 text-xs">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>All documentation verified</span>
              </div>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <Badge 
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`cursor-pointer ${activeCategory === category.id ? 'bg-blue-600' : 'hover:bg-blue-50'}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </Badge>
            ))}
          </div>

          {/* Compliance items */}
          <div className="border rounded-md divide-y">
            {filteredItems.map(item => (
              <div key={item.id} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.status === 'compliant' && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                    {item.status === 'inProgress' && <AlertCircle className="h-4 w-4 text-amber-500" />}
                    {item.status === 'nonCompliant' && <XCircle className="h-4 w-4 text-red-500" />}
                    <span className="font-medium text-sm">{item.name}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={
                      item.status === 'compliant' ? 'bg-green-50 text-green-700 border-green-200' :
                      item.status === 'inProgress' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }
                  >
                    {item.status === 'compliant' ? 'Compliant' : 
                     item.status === 'inProgress' ? 'In Progress' : 'Non-Compliant'}
                  </Badge>
                </div>
                
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="w-3/4 pr-4">
                    <Progress value={item.progress} className="h-1.5" />
                  </div>
                  <div className="text-xs text-gray-500">
                    Due: {new Date(item.dueDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulatoryComplianceDashboard;
