
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
  {
    name: "Canada",
    code: "ca",
    averageTariff: 4.0,
    specialConsiderations: ["USMCA member (duty-free trade with US and Mexico)", "CETA agreement with EU (reduced tariffs)", "Higher agricultural tariffs (15.8%)"],
    agreements: ["USMCA", "CETA"]
  },
  {
    name: "Chile",
    code: "cl",
    averageTariff: 6.0,
    specialConsiderations: ["Uniform rate system", "Extensive FTA network including US, EU, China", "Simplified tariff structure", "Strategic Pacific trade position"],
    agreements: ["Multiple FTAs"]
  },
  {
    name: "China",
    code: "cn",
    averageTariff: 7.5,
    specialConsiderations: ["RCEP member with preferential rates for ASEAN", "Higher agricultural (15.2%) and automobile (13.8%) tariffs", "Strategic processing trade policies"],
    agreements: ["RCEP"]
  },
  {
    name: "Colombia",
    code: "co",
    averageTariff: 5.9,
    specialConsiderations: ["US-Colombia FTA benefits", "EU trade agreement", "Higher automobile tariffs (23.5%)"],
    agreements: ["US-Colombia FTA", "EU Trade Agreement"]
  },
  {
    name: "Costa Rica", 
    code: "cr",
    averageTariff: 5.8,
    specialConsiderations: ["CAFTA-DR member", "EU-Central America Association Agreement", "Advanced environmental regulations affecting trade"],
    agreements: ["CAFTA-DR", "EU-Central America"]
  },
  {
    name: "El Salvador",
    code: "sv",
    averageTariff: 5.8,
    specialConsiderations: ["CAFTA-DR member", "EU-Central America Association Agreement", "Regional integration through Northern Triangle"],
    agreements: ["CAFTA-DR", "EU-Central America"]
  },
  {
    name: "European Union",
    code: "eu",
    averageTariff: 5.1,
    specialConsiderations: ["Common External Tariff system", "Higher agricultural tariffs (11.1%)", "Regulatory emphasis on standards and certifications"],
    agreements: ["Common External Tariff"]
  },
  {
    name: "France",
    code: "fr",
    averageTariff: 5.1, // Inheriting EU average
    specialConsiderations: ["Adheres to EU Common External Tariff", "Strong agricultural protections", "Extensive documentation requirements"],
    agreements: ["EU Common External Tariff"]
  },
  {
    name: "Germany",
    code: "de",
    averageTariff: 5.1, // Inheriting EU average
    specialConsiderations: ["Adheres to EU Common External Tariff", "Strong technical standards requirements", "Efficient customs processing"],
    agreements: ["EU Common External Tariff"]
  },
  {
    name: "Guatemala",
    code: "gt",
    averageTariff: 5.7,
    specialConsiderations: ["CAFTA-DR member", "EU-Central America Association Agreement", "Part of Central American customs union"],
    agreements: ["CAFTA-DR", "EU-Central America"]
  },
  {
    name: "Honduras",
    code: "hn",
    averageTariff: 5.9,
    specialConsiderations: ["CAFTA-DR member", "EU-Central America Association Agreement", "Limited port infrastructure considerations"],
    agreements: ["CAFTA-DR", "EU-Central America"]
  },
  {
    name: "India",
    code: "in",
    averageTariff: 13.8,
    specialConsiderations: ["Very high automobile tariffs (48.5%)", "High agricultural tariffs (34%)", "Complex regulatory environment"],
    agreements: []
  },
  {
    name: "Italy",
    code: "it",
    averageTariff: 5.1, // Inheriting EU average
    specialConsiderations: ["Adheres to EU Common External Tariff", "Strong textile and design industry protections", "Regional economic variations between north and south"],
    agreements: ["EU Common External Tariff"]
  },
  {
    name: "Japan",
    code: "jp",
    averageTariff: 4.2,
    specialConsiderations: ["Very high agricultural tariffs (17.3%)", "Zero auto tariffs", "US-Japan Trade Agreement and EU-Japan EPA benefits"],
    agreements: ["US-Japan Trade Agreement", "EU-Japan EPA"]
  },
  {
    name: "Mexico",
    code: "mx",
    averageTariff: 6.1,
    specialConsiderations: ["USMCA member (duty-free trade with US and Canada)", "Higher automobile tariffs (11.5%)", "Manufacturing hub with maquiladora benefits"],
    agreements: ["USMCA"]
  },
  {
    name: "Panama",
    code: "pa",
    averageTariff: 6.5,
    specialConsiderations: ["US-Panama TPA benefits", "EU-Central America Association Agreement", "Strategic canal transit considerations"],
    agreements: ["US-Panama TPA", "EU-Central America"]
  },
  {
    name: "Peru",
    code: "pe",
    averageTariff: 2.8,
    specialConsiderations: ["Relatively low overall tariffs", "US-Peru FTA and EU-Peru FTA benefits", "Pacific Alliance member"],
    agreements: ["US-Peru FTA", "EU-Peru FTA", "Pacific Alliance"]
  },
  {
    name: "South Korea",
    code: "kr",
    averageTariff: 5.9,
    specialConsiderations: ["KORUS FTA with US", "EU-Korea FTA", "Higher agricultural tariffs (16.5%)"],
    agreements: ["KORUS FTA", "EU-Korea FTA"]
  },
  {
    name: "Spain",
    code: "es",
    averageTariff: 5.1, // Inheriting EU average
    specialConsiderations: ["Adheres to EU Common External Tariff", "Gateway to North African markets", "Strong agricultural sector protections"],
    agreements: ["EU Common External Tariff"]
  },
  {
    name: "Taiwan",
    code: "tw",
    averageTariff: 6.5,
    specialConsiderations: ["ECFA preferential treatment with China", "Higher automobile tariffs (17.5%)", "High-tech sector incentives"],
    agreements: ["ECFA"]
  },
  {
    name: "United Kingdom",
    code: "gb",
    averageTariff: 4.8,
    specialConsiderations: ["UK-EU TCA preferential access", "Currently negotiating new trade deals post-Brexit", "Similar structure to EU but evolving"],
    agreements: ["UK-EU TCA"]
  },
  {
    name: "United States",
    code: "us",
    averageTariff: 3.4,
    specialConsiderations: ["USMCA member (duty-free trade with Canada and Mexico)", "Relatively higher textile tariffs (8.5%)", "Strong regulatory requirements"],
    agreements: ["USMCA"]
  },
  {
    name: "Vietnam",
    code: "vn",
    averageTariff: 9.6,
    specialConsiderations: ["ASEAN member with regional preferences", "EU-Vietnam FTA benefits", "Very high automobile tariffs (21.4%)", "Growing manufacturing hub"],
    agreements: ["ASEAN", "EU-Vietnam FTA"]
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
