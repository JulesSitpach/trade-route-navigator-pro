
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { SupplyChainStep } from './types';

interface SupplyChainDetailPanelProps {
  step: SupplyChainStep;
  language: string;
}

const SupplyChainDetailPanel: React.FC<SupplyChainDetailPanelProps> = ({ step, language }) => {
  return (
    <div className="mt-8 bg-white p-4 rounded-md border border-blue-200 shadow-sm">
      <h4 className="text-sm font-medium mb-2 text-blue-700">
        {step.label} {language === 'en' ? 'Details' : 'Detalles'}
      </h4>
      <p className="text-xs text-gray-600 mb-3">
        {step.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="block text-gray-500 mb-1">{language === 'en' ? 'Time Frame:' : 'Plazo:'}</span>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            {step.timeframe}
          </Badge>
        </div>
        <div>
          <span className="block text-gray-500 mb-1">{language === 'en' ? 'Est. Cost Impact:' : 'Impacto en Costos Est.:'}</span>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
            {step.cost}
          </Badge>
        </div>
        <div>
          <span className="block text-gray-500 mb-1">{language === 'en' ? 'Potential Risks:' : 'Riesgos Potenciales:'}</span>
          <div className="flex flex-wrap gap-1">
            {step.risks.map((risk, i) => (
              <Badge key={i} variant="outline" className="bg-red-50 text-red-600 border-red-200">
                {risk}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainDetailPanel;
