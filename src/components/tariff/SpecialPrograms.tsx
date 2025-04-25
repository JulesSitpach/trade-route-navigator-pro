
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface SpecialProgramsProps {
  specialPrograms: Array<{
    program: string;
    eligibility: string;
    savings: string;
    requirements: string;
  }>;
}

export const SpecialPrograms = ({ specialPrograms }: SpecialProgramsProps) => {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'en' ? "Special Program Eligibility" : "Elegibilidad para Programas Especiales"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{language === 'en' ? "Program" : "Programa"}</TableHead>
              <TableHead>{language === 'en' ? "Eligibility" : "Elegibilidad"}</TableHead>
              <TableHead>{language === 'en' ? "Potential Savings" : "Ahorro Potencial"}</TableHead>
              <TableHead>{language === 'en' ? "Requirements" : "Requisitos"}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specialPrograms.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.program}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={item.eligibility.includes('Eligible') || item.eligibility.includes('Elegible')
                      ? "bg-green-50 text-green-700" 
                      : "bg-red-50 text-red-700"}
                  >
                    {item.eligibility}
                  </Badge>
                </TableCell>
                <TableCell>{item.savings}</TableCell>
                <TableCell className="text-sm">{item.requirements}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
