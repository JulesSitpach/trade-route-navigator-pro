
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tradeResources, shippingDocuments } from './data/resourceData';

const ResourceLibrary: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="space-y-6 p-4">
      {/* Country-specific resources */}
      {tradeResources.map((countryData, index) => (
        <Card key={index} className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              {countryData.country}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {countryData.categories.map((category, catIndex) => (
              <div key={catIndex} className="space-y-3">
                <h3 className="font-medium text-lg">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.resources.map((resource, resIndex) => (
                    <div
                      key={resIndex}
                      className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {resource.description}
                          </p>
                          {resource.format && (
                            <span className="inline-block text-xs bg-secondary px-2 py-1 rounded">
                              {resource.format}
                            </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => window.open(resource.url, '_blank')}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {/* Shipping Documents Section */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            {shippingDocuments.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{shippingDocuments.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shippingDocuments.resources.map((resource, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {resource.description}
                    </p>
                    {resource.format && (
                      <span className="inline-block text-xs bg-secondary px-2 py-1 rounded">
                        {resource.format}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={() => window.open(resource.url, '_blank')}
                  >
                    <FileText className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceLibrary;
