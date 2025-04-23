
import React from 'react';

const TariffLegend = () => {
  return (
    <div className="flex items-center justify-center gap-8 mt-2">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
        <span className="text-sm">Low Tariff (0-5%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-amber-500"></div>
        <span className="text-sm">Medium Tariff (6-15%)</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-red-500"></div>
        <span className="text-sm">High Tariff (&gt;15%)</span>
      </div>
    </div>
  );
};

export default TariffLegend;
