
import React from 'react';
import { InfoIcon } from 'lucide-react';

interface RiskInfoNoteProps {
  language: string;
}

const RiskInfoNote: React.FC<RiskInfoNoteProps> = ({ language }) => {
  return (
    <div className="mt-4 p-3 bg-slate-50 rounded border text-xs text-gray-600 flex items-start gap-2">
      <InfoIcon className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
      <div>
        {language === 'en' 
          ? 'Bubble size represents reliability score. Larger bubbles indicate higher reliability.' 
          : 'El tamaño de la burbuja representa la puntuación de fiabilidad. Las burbujas más grandes indican mayor fiabilidad.'
        }
      </div>
    </div>
  );
};

export default RiskInfoNote;
