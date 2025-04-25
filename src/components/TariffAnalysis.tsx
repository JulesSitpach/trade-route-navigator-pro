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
  const { t } = useLanguage();
  const tariffData = getTariffData(t('language'));

  // Calculate total rate
  const totalRate = tariffData.tariffRates.reduce((sum, item) => sum + item.rate, 0);

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h4 className="text-blue-700 font-semibold mb-2">
          {t('tariff.insight.title')}
        </h4>
        <p className="text-gray-700">
          {t('tariff.insight.description')}
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>{t('tabs.tariff.basic')}</span>
          </TabsTrigger>
          <TabsTrigger value="hscode" className="flex items-center gap-2">
            <FileSearch className="h-4 w-4" />
            <span>{t('tabs.tariff.hscode')}</span>
          </TabsTrigger>
          <TabsTrigger value="countries" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>{t('tabs.tariff.countryComparison')}</span>
          </TabsTrigger>
          <TabsTrigger value="origin" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{t('tabs.tariff.rulesOfOrigin')}</span>
          </TabsTrigger>
          <TabsTrigger value="engineering" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{t('tabs.tariff.engineering')}</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            <span>{t('tabs.tariff.specialPrograms')}</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>{t('tabs.tariff.historicalTrends')}</span>
          </TabsTrigger>
          <TabsTrigger value="exclusions" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>{t('tabs.tariff.exclusionBreakdown')}</span>
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
