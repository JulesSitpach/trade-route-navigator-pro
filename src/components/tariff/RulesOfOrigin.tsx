
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface RulesOfOriginProps {
  originRequirements: Array<{
    requirement: string;
    threshold: string;
    status: string;
  }>;
}

export const RulesOfOrigin = ({ originRequirements }: RulesOfOriginProps) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Rules of Origin Requirements" : "Requisitos de Reglas de Origen"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'en' ? "Requirement" : "Requisito"}</TableHead>
              <TableHead>{language === 'en' ? "Threshold" : "Umbral"}</TableHead>
              <TableHead>{language === 'en' ? "Status" : "Estado"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {originRequirements.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.requirement}</TableCell>
                <TableCell>{item.threshold}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={item.status.includes('Met') || item.status.includes('Cumplido') 
                      ? "bg-green-50 text-green-700" 
                      : "bg-red-50 text-red-700"}
                  >
                    {item.status}
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
