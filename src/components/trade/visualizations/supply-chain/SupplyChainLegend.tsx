
import React from 'react';
import { SupplyChainStep } from './types';

interface SupplyChainLegendProps {
  steps: SupplyChainStep[];
  language: string;
}

const SupplyChainLegend: React.FC<SupplyChainLegendProps> = ({ steps, language }) => {
  return (
    <div className="mt-8 bg-white p-4 rounded-md border border-gray-200">
      <h4 className="text-sm font-medium mb-2">
        {language === 'en' ? 'Supply Chain Stages' : 'Etapas de la Cadena de Suministro'}
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
        {steps.map((step, index) => (
          <div key={`legend-${step.id}`} className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-blue-50 border border-blue-300 flex items-center justify-center text-[10px] text-blue-700">{index + 1}</span>
            <span>{step.label}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">
        {language === 'en' ? 'Click on any node to view detailed information' : 'Haga clic en cualquier nodo para ver información detallada'}
      </p>
    </div>
  );
};

export default SupplyChainLegend;
