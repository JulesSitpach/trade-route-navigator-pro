
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
import { useLanguage } from '@/contexts/LanguageContext';
import { BasicTariffInfo } from './tariff/BasicTariffInfo';
import { CountryComparison } from './tariff/CountryComparison';
import { TariffTrends } from './tariff/TariffTrends';
import { HSCodeAnalysis } from './tariff/HSCodeAnalysis';
import { RulesOfOrigin } from './tariff/RulesOfOrigin';
import { TariffEngineering } from './tariff/TariffEngineering';
import { SpecialPrograms } from './tariff/SpecialPrograms';
import { ExclusionInformation } from './tariff/ExclusionInformation';
import { getTariffData } from '@/data/tariffData';

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
  const tariffData = getTariffData(language);

  // Calculate total rate
  const totalRate = tariffData.tariffRates.reduce((sum, item) => sum + item.rate, 0);

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
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 bg-[#f5f7fa] p-2 rounded-lg w-full overflow-x-auto">
          <TabsTrigger value="basic" className="flex items-center gap-2 px-4 py-3">
            <DollarSign className="h-4 w-4" />
            <span>{t('tariff.basic')}</span>
          </TabsTrigger>
          <TabsTrigger value="hscode" className="flex items-center gap-2 px-4 py-3">
            <FileSearch className="h-4 w-4" />
            <span>{t('tariff.hscode')}</span>
          </TabsTrigger>
          <TabsTrigger value="countries" className="flex items-center gap-2 px-4 py-3">
            <Flag className="h-4 w-4" />
            <span>{t('tariff.countryComparison')}</span>
          </TabsTrigger>
          <TabsTrigger value="origin" className="flex items-center gap-2 px-4 py-3">
            <FileText className="h-4 w-4" />
            <span>{t('tariff.rulesOfOrigin')}</span>
          </TabsTrigger>
          <TabsTrigger value="engineering" className="flex items-center gap-2 px-4 py-3">
            <Settings className="h-4 w-4" />
            <span>{t('tariff.engineering')}</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2 px-4 py-3">
            <ChartBar className="h-4 w-4" />
            <span>{t('tariff.specialPrograms')}</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2 px-4 py-3">
            <TrendingUp className="h-4 w-4" />
            <span>{t('tariff.historicalTrends')}</span>
          </TabsTrigger>
          <TabsTrigger value="exclusions" className="flex items-center gap-2 px-4 py-3">
            <FileCheck className="h-4 w-4" />
            <span>{t('tariff.exclusionBreakdown')}</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicTariffInfo tariffRates={tariffData.tariffRates} totalRate={totalRate} />
        </TabsContent>

        <TabsContent value="hscode">
          <HSCodeAnalysis 
            hsCode={hsCode} 
            alternativeHSCodes={tariffData.alternativeHSCodes} 
            totalRate={totalRate} 
          />
        </TabsContent>

        <TabsContent value="countries">
          <CountryComparison countryComparisonData={tariffData.countryComparisonData} />
        </TabsContent>

        <TabsContent value="origin">
          <RulesOfOrigin originRequirements={tariffData.originRequirements} />
        </TabsContent>

        <TabsContent value="engineering">
          <TariffEngineering engineeringOptions={tariffData.engineeringOptions} />
        </TabsContent>

        <TabsContent value="programs">
          <SpecialPrograms specialPrograms={tariffData.specialPrograms} />
        </TabsContent>

        <TabsContent value="trends">
          <TariffTrends historicalData={tariffData.historicalData} />
        </TabsContent>

        <TabsContent value="exclusions">
          <ExclusionInformation exclusionInfo={tariffData.exclusionInfo} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TariffAnalysis;
