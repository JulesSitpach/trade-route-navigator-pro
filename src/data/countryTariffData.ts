
export interface CountryTariffData {
  name: string;
  code: string;
  averageTariff: number;
  specialConsiderations: string[];
  agreements: string[];
}

export const countryTariffData: CountryTariffData[] = [
  {
    name: "Argentina",
    code: "ar",
    averageTariff: 13.6,
    specialConsiderations: ["High automobile tariffs (35%)"],
    agreements: ["Mercosur member with preferential rates for regional trade", "EU-Mercosur agreement pending ratification"]
  },
  {
    name: "Brazil",
    code: "br",
    averageTariff: 13.3,
    specialConsiderations: ["High textile tariffs (23.3%)", "High automobile tariffs (35%)"],
    agreements: ["Mercosur member with preferential rates for regional trade"]
  },
  // ... adding more countries alphabetically
  {
    name: "Vietnam",
    code: "vn",
    averageTariff: 9.6,
    specialConsiderations: ["Very high automobile tariffs (21.4%)", "Growing manufacturing hub"],
    agreements: ["ASEAN member with regional preferences", "EU-Vietnam FTA benefits"]
  }
];

export const getCountryByCode = (code: string): CountryTariffData | undefined => {
  return countryTariffData.find(country => country.code === code);
};

export const calculateTariff = (
  originCountry: string,
  destinationCountry: string,
  productCategory: string
): number => {
  const destination = countryTariffData.find(c => c.code === destinationCountry);
  return destination?.averageTariff || 0;
};

