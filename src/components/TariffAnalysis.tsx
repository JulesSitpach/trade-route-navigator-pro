
import React, { useState } from 'react';
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
import { Button } from "@/components/ui/button";

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
  const [activeTab, setActiveTab] = useState("basic");
  const tariffData = getTariffData(language);

  // Calculate total rate
  const totalRate = tariffData.tariffRates.reduce((sum, item) => sum + item.rate, 0);

  // Tab options with their icons and labels
  const tabs = [
    { id: "basic", icon: <DollarSign className="h-4 w-4" />, label: t('tariff.basic') },
    { id: "hscode", icon: <FileSearch className="h-4 w-4" />, label: t('tariff.hscode') },
    { id: "countries", icon: <Flag className="h-4 w-4" />, label: t('tariff.countryComparison') },
    { id: "origin", icon: <FileText className="h-4 w-4" />, label: t('tariff.rulesOfOrigin') },
    { id: "engineering", icon: <Settings className="h-4 w-4" />, label: t('tariff.engineering') },
    { id: "programs", icon: <ChartBar className="h-4 w-4" />, label: t('tariff.specialPrograms') },
    { id: "trends", icon: <TrendingUp className="h-4 w-4" />, label: t('tariff.historicalTrends') },
    { id: "exclusions", icon: <FileCheck className="h-4 w-4" />, label: t('tariff.exclusionBreakdown') }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case "basic":
        return <BasicTariffInfo tariffRates={tariffData.tariffRates} totalRate={totalRate} />;
      case "hscode":
        return <HSCodeAnalysis hsCode={hsCode} alternativeHSCodes={tariffData.alternativeHSCodes} totalRate={totalRate} />;
      case "countries":
        return <CountryComparison countryComparisonData={tariffData.countryComparisonData} />;
      case "origin":
        return <RulesOfOrigin originRequirements={tariffData.originRequirements} />;
      case "engineering":
        return <TariffEngineering engineeringOptions={tariffData.engineeringOptions} />;
      case "programs":
        return <SpecialPrograms specialPrograms={tariffData.specialPrograms} />;
      case "trends":
        return <TariffTrends historicalData={tariffData.historicalData} />;
      case "exclusions":
        return <ExclusionInformation exclusionInfo={tariffData.exclusionInfo} />;
      default:
        return null;
    }
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

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "filter"}
              className={`flex items-center justify-center px-4 py-2.5 rounded-md text-sm font-medium transition-all
                ${activeTab === tab.id && 'shadow-sm'}`}
            >
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
            </Button>
          ))}
        </div>

        <div className="mt-4">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default TariffAnalysis;
