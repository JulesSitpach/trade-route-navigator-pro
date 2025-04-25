import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartBar,
  FileSearch,
  Flag,
  FileText,
  Settings,
  TrendingUp,
  DollarSign,
  FileCheck
} from "lucide-react";
import { countryTariffData, getCountryByCode } from "@/data/countryTariffData";
import { useLanguage } from '@/contexts/LanguageContext';
import { BasicTariffInfo } from './tariff/BasicTariffInfo';
import { CountryComparison } from './tariff/CountryComparison';
import { TariffTrends } from './tariff/TariffTrends';
import { HSCodeAnalysis } from './tariff/HSCodeAnalysis';
import { RulesOfOrigin } from './tariff/RulesOfOrigin';
import { TariffEngineering } from './tariff/TariffEngineering';
import { SpecialPrograms } from './tariff/SpecialPrograms';
import { ExclusionInformation } from './tariff/ExclusionInformation';

interface TariffAnalysisProps {
  originCountry?: string;
  destinationCountry?: string;
  productCategory?: string;
  hsCode?: string;
}

const TariffAnalysis = ({
  originCountry = "cn",
  destinationCountry = "us",
  productCategory = "electronics",
  hsCode = "8471.30.0100"
}: TariffAnalysisProps) => {
  const { t, language } = useLanguage();

  // Dummy data for visualization purposes
  const origin = getCountryByCode(originCountry);
  const destination = getCountryByCode(destinationCountry);
  
  const tariffRates = [
    { 
      type: language === 'en' ? "MFN Rate" : "Tarifa NMF", 
      rate: 7.5, 
      description: language === 'en' ? "Standard Most Favored Nation rate" : "Tarifa estándar de Nación Más Favorecida" 
    },
    { 
      type: language === 'en' ? "Section 301" : "Sección 301", 
      rate: 25.0, 
      description: language === 'en' ? "Additional tariffs on Chinese goods" : "Aranceles adicionales sobre productos chinos" 
    },
    { 
      type: language === 'en' ? "Merchandise Processing" : "Procesamiento de Mercancías", 
      rate: 0.3464, 
      description: language === 'en' ? "Customs processing fee" : "Tarifa de procesamiento aduanero" 
    },
    { 
      type: language === 'en' ? "Harbor Maintenance" : "Mantenimiento Portuario", 
      rate: 0.125, 
      description: language === 'en' ? "Port usage fee" : "Tarifa de uso portuario"
    }
  ];
  
  // Total effective rate
  const totalRate = tariffRates.reduce((sum, item) => sum + item.rate, 0);

  // Country comparison data - translate country names if in Spanish
  const countryComparisonData = [
    { 
      country: language === 'en' ? "United States" : "Estados Unidos", 
      rate: 32.97 
    },
    { 
      country: language === 'en' ? "European Union" : "Unión Europea", 
      rate: 12.5 
    },
    { 
      country: language === 'en' ? "Canada" : "Canadá", 
      rate: 8.0 
    },
    { 
      country: language === 'en' ? "Mexico" : "México", 
      rate: 15.0 
    },
    { 
      country: language === 'en' ? "Japan" : "Japón", 
      rate: 10.0 
    },
    { 
      country: language === 'en' ? "South Korea" : "Corea del Sur", 
      rate: 13.0 
    }
  ];

  // Alternative HS codes
  const alternativeHSCodes = [
    { 
      code: "8471.30.0100", 
      description: language === 'en' ? "Laptop computers" : "Computadoras portátiles", 
      rate: 32.97 
    },
    { 
      code: "8471.41.0150", 
      description: language === 'en' ? "Processing units" : "Unidades de procesamiento", 
      rate: 25.0 
    },
    { 
      code: "8473.30.5100", 
      description: language === 'en' ? "Parts and accessories" : "Partes y accesorios", 
      rate: 15.0 
    }
  ];

  // Historical trends data
  const historicalData = [
    { year: "2019", rate: 25.0 },
    { year: "2020", rate: 27.5 },
    { year: "2021", rate: 30.0 },
    { year: "2022", rate: 32.97 },
    { year: "2023", rate: 32.97 },
    { year: "2024", rate: 32.97 },
    { year: "2025", rate: 35.0, projected: true }
  ];

  // Rules of origin requirements
  const originRequirements = [
    { 
      requirement: language === 'en' ? "Regional Value Content" : "Contenido de Valor Regional", 
      threshold: language === 'en' ? "60% or higher" : "60% o superior", 
      status: language === 'en' ? "Met" : "Cumplido" 
    },
    { 
      requirement: language === 'en' ? "Tariff Shift" : "Cambio Arancelario", 
      threshold: language === 'en' ? "Change in HS chapter" : "Cambio en capítulo HS", 
      status: language === 'en' ? "Met" : "Cumplido" 
    },
    { 
      requirement: language === 'en' ? "Specific Processing" : "Procesamiento Específico", 
      threshold: language === 'en' ? "Assembly in FTA country" : "Ensamblaje en país con TLC", 
      status: language === 'en' ? "Not Met" : "No Cumplido" 
    }
  ];

  // Tariff engineering options
  const engineeringOptions = [
    {
      option: language === 'en' ? "Component Separation" : "Separación de Componentes",
      description: language === 'en' ? "Ship display and computing unit separately" : "Enviar pantalla y unidad de cómputo por separado",
      savings: "7.5%",
      complexity: language === 'en' ? "Medium" : "Media"
    },
    {
      option: language === 'en' ? "Assembly Relocation" : "Reubicación de Ensamblaje",
      description: language === 'en' ? "Final assembly in Mexico" : "Ensamblaje final en México",
      savings: "25.0%",
      complexity: language === 'en' ? "High" : "Alta"
    },
    {
      option: language === 'en' ? "Material Substitution" : "Sustitución de Materiales",
      description: language === 'en' ? "Replace certain materials with duty-free alternatives" : "Reemplazar ciertos materiales con alternativas libres de aranceles",
      savings: "3.2%",
      complexity: language === 'en' ? "Low" : "Baja"
    }
  ];

  // Special programs
  const specialPrograms = [
    {
      program: language === 'en' ? "First Sale Rule" : "Regla de Primera Venta",
      eligibility: language === 'en' ? "Eligible" : "Elegible",
      savings: "8.2%",
      requirements: language === 'en' ? "Proper transaction documentation, arms-length pricing" : "Documentación adecuada de transacción, precios de libre competencia"
    },
    {
      program: language === 'en' ? "Foreign Trade Zone" : "Zona de Comercio Exterior",
      eligibility: language === 'en' ? "Eligible" : "Elegible",
      savings: language === 'en' ? "Duty deferral" : "Aplazamiento de aranceles",
      requirements: language === 'en' ? "Use of authorized FTZ facility" : "Uso de instalaciones ZCE autorizadas"
    },
    {
      program: language === 'en' ? "Duty Drawback" : "Devolución de Aranceles",
      eligibility: language === 'en' ? "Eligible" : "Elegible",
      savings: language === 'en' ? "Up to 99% of duties paid" : "Hasta el 99% de aranceles pagados",
      requirements: language === 'en' ? "Re-export within 5 years with proper documentation" : "Reexportar en 5 años con documentación adecuada"
    }
  ];

  // Exclusion information
  const exclusionInfo = {
    available: true,
    process: language === 'en' ? "Section 301 Exclusion Request" : "Solicitud de Exclusión Sección 301",
    criteria: language === 'en' ? "Not available domestically, significant economic harm, strategic importance" : "No disponible nacionalmente, daño económico significativo, importancia estratégica",
    timeline: language === 'en' ? "90-120 days for review" : "90-120 días para revisión",
    successRate: language === 'en' ? "~33% approval rate historically" : "~33% tasa de aprobación histórica"
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h4 className="text-blue-700 font-semibold mb-2">
          {language === 'en' ? "Tariff Strategy Insight" : "Información Estratégica de Aranceles"}
        </h4>
        <p className="text-gray-700">
          {language === 'en' 
            ? "Based on your product classification and origin, we recommend exploring the First Sale Rule and Mexico assembly options to potentially reduce duties by up to 25%."
            : "Según la clasificación y origen de su producto, recomendamos explorar la Regla de Primera Venta y opciones de ensamblaje en México para potencialmente reducir aranceles hasta un 25%."}
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>{t('tariff.basic')}</span>
          </TabsTrigger>
          <TabsTrigger value="hscode" className="flex items-center gap-2">
            <FileSearch className="h-4 w-4" />
            <span>{t('tariff.hscode')}</span>
          </TabsTrigger>
          <TabsTrigger value="countries" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>{t('tariff.countryComparison')}</span>
          </TabsTrigger>
          <TabsTrigger value="origin" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{t('tariff.rulesOfOrigin')}</span>
          </TabsTrigger>
          <TabsTrigger value="engineering" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{t('tariff.engineering')}</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            <span>{t('tariff.specialPrograms')}</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>{t('tariff.historicalTrends')}</span>
          </TabsTrigger>
          <TabsTrigger value="exclusions" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>{t('tariff.exclusionBreakdown')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicTariffInfo tariffRates={tariffRates} totalRate={totalRate} />
        </TabsContent>

        <TabsContent value="hscode">
          <HSCodeAnalysis hsCode={hsCode} alternativeHSCodes={alternativeHSCodes} totalRate={totalRate} />
        </TabsContent>

        <TabsContent value="countries">
          <CountryComparison countryComparisonData={countryComparisonData} />
        </TabsContent>

        <TabsContent value="origin">
          <RulesOfOrigin originRequirements={originRequirements} />
        </TabsContent>

        <TabsContent value="engineering">
          <TariffEngineering engineeringOptions={engineeringOptions} />
        </TabsContent>

        <TabsContent value="programs">
          <SpecialPrograms specialPrograms={specialPrograms} />
        </TabsContent>

        <TabsContent value="trends">
          <TariffTrends historicalData={historicalData} />
        </TabsContent>

        <TabsContent value="exclusions">
          <ExclusionInformation exclusionInfo={exclusionInfo} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TariffAnalysis;
