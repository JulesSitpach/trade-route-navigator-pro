
import React from 'react';
import { SupplyChainStep } from './types';

interface SupplyChainLegendProps {
  steps: SupplyChainStep[];
  language: string;
  nodeColors?: string[];
}

const SupplyChainLegend: React.FC<SupplyChainLegendProps> = ({ steps, language, nodeColors }) => {
  return (
    <div className="mt-8 p-4 bg-white/80 rounded-md border border-blue-100 shadow-sm">
      <h4 className="text-sm font-medium mb-3 text-blue-600">
        {language === 'en' ? 'Supply Chain Stages' : 'Etapas de la Cadena de Suministro'}
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((step, index) => {
          const color = nodeColors ? nodeColors[index % nodeColors.length] : '#3498DB';
          
          return (
            <div key={step.id} className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: color }}
              >
                {index + 1}
              </div>
              <span className="text-sm">{step.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 text-xs text-center text-gray-500">
        {language === 'en' 
          ? 'Click on any node to view detailed information' 
          : 'Haga clic en cualquier nodo para ver información detallada'
        }
      </div>
    </div>
  );
};

export default SupplyChainLegend;
