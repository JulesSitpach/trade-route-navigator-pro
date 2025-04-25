
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface TariffEngineeringProps {
  engineeringOptions: Array<{
    option: string;
    description: string;
    savings: string;
    complexity: string;
  }>;
}

export const TariffEngineering = ({ engineeringOptions }: TariffEngineeringProps) => {
  const { language } = useLanguage();

  const getComplexityColor = (complexity: string) => {
    const isSpanish = language === 'es';
    switch(complexity.toLowerCase()) {
      case 'low':
      case 'baja':
        return 'bg-green-50 text-green-700';
      case 'medium':
      case 'media':
        return 'bg-yellow-50 text-yellow-700';
      case 'high':
      case 'alta':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Tariff Engineering Options" : "Opciones de Ingeniería Arancelaria"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'en' ? "Strategy" : "Estrategia"}</TableHead>
              <TableHead>{language === 'en' ? "Description" : "Descripción"}</TableHead>
              <TableHead>{language === 'en' ? "Potential Savings" : "Ahorro Potencial"}</TableHead>
              <TableHead>{language === 'en' ? "Complexity" : "Complejidad"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {engineeringOptions.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.option}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.savings}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getComplexityColor(item.complexity)}>
                    {item.complexity}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
