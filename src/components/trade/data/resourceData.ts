
interface ResourceLink {
  title: string;
  url: string;
  description: string;
  format?: string;
}

interface ResourceCategory {
  title: string;
  description: string;
  resources: ResourceLink[];
}

interface CountryResources {
  country: string;
  categories: ResourceCategory[];
}

export const tradeResources: CountryResources[] = [
  {
    country: "United States",
    categories: [
      {
        title: "Tariffs & Trade",
        description: "Official U.S. tariff and trade agreement resources",
        resources: [
          {
            title: "USITC Tariff Database",
            url: "https://hts.usitc.gov/",
            description: "Download HTS codes and tariff information",
            format: "CSV/Excel"
          },
          {
            title: "CBP Trade Regulations",
            url: "https://www.cbp.gov/trade",
            description: "Access customs rulings and forms including CBP Form 7501",
            format: "PDF"
          }
        ]
      }
    ]
  },
  {
    country: "Canada",
    categories: [
      {
        title: "Tariffs & Trade",
        description: "Canadian tariff and trade agreement resources",
        resources: [
          {
            title: "CBSA Tariff Finder",
            url: "https://www.cbsa-asfc.gc.ca/trade-commerce/tariff-tarif/",
            description: "Search and download Canadian tariff schedules",
            format: "Excel"
          },
          {
            title: "USMCA/CUSMA Text",
            url: "https://www.international.gc.ca/trade-commerce/trade-agreements-accords-commerciaux/agr-acc/cusma-aceum/text-texte/toc-tdm.aspx",
            description: "Full text of USMCA/CUSMA agreement",
            format: "HTML/PDF"
          }
        ]
      }
    ]
  },
  {
    country: "Mexico",
    categories: [
      {
        title: "Tariffs & Trade",
        description: "Mexican tariff and customs resources",
        resources: [
          {
            title: "SIAVI Tariff Portal",
            url: "http://www.siavi.economia.gob.mx/",
            description: "Mexican tariff information system (Spanish)",
            format: "Excel"
          },
          {
            title: "SAT Customs Forms",
            url: "https://www.sat.gob.mx/",
            description: "Access to Pedimento aduanal templates",
            format: "PDF"
          }
        ]
      }
    ]
  }
];

export const shippingDocuments: ResourceCategory = {
  title: "Shipping & Customs Documents",
  description: "Essential shipping and customs document templates",
  resources: [
    {
      title: "Bill of Lading Templates",
      url: "https://www.fedex.com/en-us/shipping/freight-services/bill-of-lading.html",
      description: "FedEx Bill of Lading templates",
      format: "PDF"
    },
    {
      title: "Commercial Invoice Templates",
      url: "https://www.ups.com/us/en/support/shipping-support/shipping-documentation.page",
      description: "UPS Commercial Invoice forms",
      format: "PDF"
    },
    {
      title: "USMCA Certificate of Origin",
      url: "https://www.cbp.gov/document/guidance/certification-origin-template",
      description: "Official USMCA Certificate of Origin template",
      format: "PDF"
    }
  ]
};
