
import React from 'react';

interface RiskFilterButtonsProps {
  activeRiskType: string | null;
  setActiveRiskType: (riskType: string | null) => void;
  language: string;
}

const RiskFilterButtons: React.FC<RiskFilterButtonsProps> = ({ 
  activeRiskType, 
  setActiveRiskType, 
  language 
}) => {
  return (
    <div className="mt-6 border-t pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <button 
        onClick={() => setActiveRiskType(activeRiskType === 'high' ? null : 'high')}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${activeRiskType === 'high' ? 'bg-red-100' : 'hover:bg-gray-100'}`}
      >
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <span className="text-sm">{language === 'en' ? 'High Risk' : 'Alto Riesgo'}</span>
      </button>
      <button 
        onClick={() => setActiveRiskType(activeRiskType === 'medium' ? null : 'medium')}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${activeRiskType === 'medium' ? 'bg-amber-100' : 'hover:bg-gray-100'}`}
      >
        <div className="w-3 h-3 rounded-full bg-amber-500"></div>
        <span className="text-sm">{language === 'en' ? 'Medium Risk' : 'Riesgo Medio'}</span>
      </button>
      <button 
        onClick={() => setActiveRiskType(activeRiskType === 'low' ? null : 'low')}
        className={`flex items-center space-x-2 px-3 py-1.5 rounded-md transition-colors ${activeRiskType === 'low' ? 'bg-green-100' : 'hover:bg-gray-100'}`}
      >
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-sm">{language === 'en' ? 'Low Risk' : 'Bajo Riesgo'}</span>
      </button>
    </div>
  );
};

export default RiskFilterButtons;
