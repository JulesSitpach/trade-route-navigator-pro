
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CountryRequirement } from "./types";
import { useLanguage } from '@/contexts/LanguageContext';

interface CountryRequirementsProps {
  requirements: CountryRequirement[];
}

export const CountryRequirements = ({ requirements }: CountryRequirementsProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{t('regulations.countryRequirements')}</h3>
      <Accordion type="single" collapsible className="w-full">
        {requirements.map((country, index) => (
          <AccordionItem key={index} value={`country-${index}`}>
            <AccordionTrigger className="text-left">{country.country}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1">
                {country.requirements.map((req, reqIndex) => (
                  <li key={reqIndex} className="text-gray-700">{req}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};
