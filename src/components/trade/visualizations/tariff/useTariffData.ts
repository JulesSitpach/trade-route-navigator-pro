
import { useMemo } from 'react';

export interface TariffData {
  country: string;
  tariffRate: number;
  productCategory: string;
  volume: number;
}

export const useTariffData = () => {
  const tariffData = useMemo<TariffData[]>(() => [
    { country: "USA", tariffRate: 25, productCategory: "Electronics", volume: 120 },
    { country: "EU", tariffRate: 5, productCategory: "Electronics", volume: 90 },
    { country: "Canada", tariffRate: 0, productCategory: "Electronics", volume: 70 },
    { country: "Mexico", tariffRate: 0, productCategory: "Electronics", volume: 50 },
    { country: "Japan", tariffRate: 8, productCategory: "Electronics", volume: 60 },
    { country: "Vietnam", tariffRate: 10, productCategory: "Electronics", volume: 40 },
    { country: "China", tariffRate: 15, productCategory: "Electronics", volume: 150 },
    { country: "India", tariffRate: 20, productCategory: "Electronics", volume: 70 },
    { country: "Brazil", tariffRate: 35, productCategory: "Electronics", volume: 30 },
    { country: "Australia", tariffRate: 5, productCategory: "Electronics", volume: 25 }
  ], []);

  const getTariffColor = (rate: number) => {
    if (rate <= 5) return "#22C55E"; // Green for low tariffs
    if (rate <= 15) return "#F59E0B"; // Amber for medium tariffs
    return "#EF4444"; // Red for high tariffs
  };

  return {
    tariffData,
    getTariffColor
  };
};
