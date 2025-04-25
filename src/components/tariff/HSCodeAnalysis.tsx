
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLanguage } from '@/contexts/LanguageContext';

interface HSCodeAnalysisProps {
  hsCode: string;
  alternativeHSCodes: Array<{
    code: string;
    description: string;
    rate: number;
  }>;
  totalRate: number;
}

export const HSCodeAnalysis = ({ hsCode, alternativeHSCodes, totalRate }: HSCodeAnalysisProps) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "HS Code Analysis" : "Análisis de Código HS"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="p-4 bg-blue-50 border-l-4 border-blue-500">
            <h4 className="font-semibold text-blue-700">
              {language === 'en' ? "Current HS Code" : "Código HS Actual"}: {hsCode}
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              {language === 'en' 
                ? "Current applicable rate" 
                : "Tasa aplicable actual"}: {totalRate}%
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              {language === 'en' 
                ? "Alternative Classifications" 
                : "Clasificaciones Alternativas"}
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'en' ? "HS Code" : "Código HS"}</TableHead>
                  <TableHead>{language === 'en' ? "Description" : "Descripción"}</TableHead>
                  <TableHead>{language === 'en' ? "Rate" : "Tasa"}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alternativeHSCodes.map((item) => (
                  <TableRow key={item.code}>
                    <TableCell className="font-mono">{item.code}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{item.rate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
