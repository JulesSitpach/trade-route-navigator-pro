
import { useMemo } from 'react';

export interface TariffData {
  country: string;
  tariffRate: number;
  productCategory: string;
  volume: number;
}

export const useTariffData = () => {
  const tariffData = useMemo<TariffData[]>(() => [
    { country: "USA", tariffRate: 25, productCategory: "Electronics", volume: 12000 },
    { country: "EU", tariffRate: 5, productCategory: "Electronics", volume: 9500 },
    { country: "Canada", tariffRate: 0, productCategory: "Electronics", volume: 8000 },
    { country: "Mexico", tariffRate: 0, productCategory: "Electronics", volume: 6000 },
    { country: "Japan", tariffRate: 39, productCategory: "Electronics", volume: 5000 },
    { country: "Vietnam", tariffRate: 10, productCategory: "Electronics", volume: 4200 },
    { country: "China", tariffRate: 15, productCategory: "Electronics", volume: 15000 },
    { country: "India", tariffRate: 20, productCategory: "Electronics", volume: 7500 },
    { country: "Brazil", tariffRate: 35, productCategory: "Electronics", volume: 3200 },
    { country: "Australia", tariffRate: 5, productCategory: "Electronics", volume: 4800 }
  ], []);

  const getTariffColor = (rate: number) => {
    if (rate <= 5) return "#22C55E"; // Green for low tariffs
    if (rate <= 15) return "#F59E0B"; // Amber for medium tariffs
    return "#EF4444"; // Red for high tariffs
  };

  const getTariffInsights = () => {
    const countryGroups = {
      low: tariffData.filter(item => item.tariffRate <= 5),
      medium: tariffData.filter(item => item.tariffRate > 5 && item.tariffRate <= 15),
      high: tariffData.filter(item => item.tariffRate > 15)
    };

    const totalVolume = tariffData.reduce((sum, item) => sum + item.volume, 0);

    const volumeByCategory = {
      low: countryGroups.low.reduce((sum, item) => sum + item.volume, 0),
      medium: countryGroups.medium.reduce((sum, item) => sum + item.volume, 0),
      high: countryGroups.high.reduce((sum, item) => sum + item.volume, 0)
    };

    return {
      countryGroups,
      volumeByCategory,
      totalVolume
    };
  };

  return {
    tariffData,
    getTariffColor,
    getTariffInsights
  };
};

