
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';

interface BasicTariffInfoProps {
  tariffRates: Array<{
    type: string;
    rate: number;
    description: string;
  }>;
  totalRate: number;
}

export const BasicTariffInfo = ({ tariffRates, totalRate }: BasicTariffInfoProps) => {
  const { language } = useLanguage();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? "Applicable Tariff Components" : "Componentes Arancelarios Aplicables"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{language === 'en' ? "Component" : "Componente"}</TableHead>
                <TableHead>{language === 'en' ? "Rate" : "Tasa"}</TableHead>
                <TableHead>{language === 'en' ? "Description" : "Descripción"}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tariffRates.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell>{item.rate.toFixed(2)}%</TableCell>
                  <TableCell>{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">
                {language === 'en' ? "Total Effective Rate:" : "Tasa Efectiva Total:"}
              </span>
              <span className="font-bold text-xl text-blue-700">{totalRate.toFixed(2)}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{language === 'en' ? "Preferential Rate Options" : "Opciones de Tasas Preferenciales"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{language === 'en' ? "USMCA Preferential Rate" : "Tasa Preferencial T-MEC"}</h4>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? "US-Mexico-Canada Agreement" : "Tratado México-Estados Unidos-Canadá"}
                  </p>
                </div>
                <Badge variant="outline" className="bg-orange-50">
                  {language === 'en' ? "Not Applicable" : "No Aplicable"}
                </Badge>
              </div>
              <p className="mt-2 text-sm">
                {language === 'en' 
                  ? "Product doesn't meet North American origin requirements"
                  : "El producto no cumple con los requisitos de origen norteamericano"}
              </p>
            </div>

            <div className="p-3 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">
                    {language === 'en' ? "US-China Phase One Agreement" : "Acuerdo Fase Uno EE.UU.-China"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? "Limited tariff reductions" : "Reducciones arancelarias limitadas"}
                  </p>
                </div>
                <Badge variant="outline" className="bg-orange-50">
                  {language === 'en' ? "Not Applicable" : "No Aplicable"}
                </Badge>
              </div>
              <p className="mt-2 text-sm">
                {language === 'en'
                  ? "Electronics not covered under current exceptions"
                  : "Electrónicos no cubiertos bajo excepciones actuales"}
              </p>
            </div>

            <div className="p-3 border rounded-md">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">
                    {language === 'en' ? "Third Country Routing" : "Ruta por Tercer País"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {language === 'en' ? "Via Vietnam or Mexico" : "Vía Vietnam o México"}
                  </p>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-800">
                  {language === 'en' ? "Potential Savings" : "Ahorros Potenciales"}
                </Badge>
              </div>
              <p className="mt-2 text-sm">
                {language === 'en'
                  ? "Substantial transformation may qualify for lower rates"
                  : "La transformación sustancial puede calificar para tasas más bajas"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
