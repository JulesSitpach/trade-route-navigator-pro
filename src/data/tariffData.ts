
interface TariffRate {
  type: string;
  rate: number;
  description: string;
}

interface HSCode {
  code: string;
  description: string;
  rate: number;
}

interface CountryRate {
  country: string;
  rate: number;
}

interface OriginRequirement {
  requirement: string;
  threshold: string;
  status: string;
}

interface EngineeringOption {
  option: string;
  description: string;
  savings: string;
  complexity: string;
}

interface SpecialProgram {
  program: string;
  eligibility: string;
  savings: string;
  requirements: string;
}

interface HistoricalData {
  year: string;
  rate: number;
  projected?: boolean;
}

interface ExclusionInfo {
  available: boolean;
  process: string;
  criteria: string;
  timeline: string;
  successRate: string;
}

export const getTariffData = (language: string) => ({
  tariffRates: [
    { 
      type: language === 'en' ? "MFN Rate" : "Tarifa NMF", 
      rate: 7.5, 
      description: language === 'en' ? "Standard Most Favored Nation rate" : "Tarifa estándar de Nación Más Favorecida" 
    },
    { 
      type: language === 'en' ? "Section 301" : "Sección 301", 
      rate: 25.0, 
      description: language === 'en' ? "Additional tariffs on Chinese goods" : "Aranceles adicionales sobre productos chinos" 
    },
    { 
      type: language === 'en' ? "Merchandise Processing" : "Procesamiento de Mercancías", 
      rate: 0.3464, 
      description: language === 'en' ? "Customs processing fee" : "Tarifa de procesamiento aduanero" 
    },
    { 
      type: language === 'en' ? "Harbor Maintenance" : "Mantenimiento Portuario", 
      rate: 0.125, 
      description: language === 'en' ? "Port usage fee" : "Tarifa de uso portuario"
    }
  ] as TariffRate[],

  alternativeHSCodes: [
    { 
      code: "8471.30.0100", 
      description: language === 'en' ? "Laptop computers" : "Computadoras portátiles", 
      rate: 32.97 
    },
    { 
      code: "8471.41.0150", 
      description: language === 'en' ? "Processing units" : "Unidades de procesamiento", 
      rate: 25.0 
    },
    { 
      code: "8473.30.5100", 
      description: language === 'en' ? "Parts and accessories" : "Partes y accesorios", 
      rate: 15.0 
    }
  ] as HSCode[],

  countryComparisonData: [
    { 
      country: language === 'en' ? "United States" : "Estados Unidos", 
      rate: 32.97 
    },
    { 
      country: language === 'en' ? "European Union" : "Unión Europea", 
      rate: 12.5 
    },
    { 
      country: language === 'en' ? "Canada" : "Canadá", 
      rate: 8.0 
    },
    { 
      country: language === 'en' ? "Mexico" : "México", 
      rate: 15.0 
    },
    { 
      country: language === 'en' ? "Japan" : "Japón", 
      rate: 10.0 
    },
    { 
      country: language === 'en' ? "South Korea" : "Corea del Sur", 
      rate: 13.0 
    }
  ] as CountryRate[],

  originRequirements: [
    { 
      requirement: language === 'en' ? "Regional Value Content" : "Contenido de Valor Regional", 
      threshold: language === 'en' ? "60% or higher" : "60% o superior", 
      status: language === 'en' ? "Met" : "Cumplido" 
    },
    { 
      requirement: language === 'en' ? "Tariff Shift" : "Cambio Arancelario", 
      threshold: language === 'en' ? "Change in HS chapter" : "Cambio en capítulo HS", 
      status: language === 'en' ? "Met" : "Cumplido" 
    },
    { 
      requirement: language === 'en' ? "Specific Processing" : "Procesamiento Específico", 
      threshold: language === 'en' ? "Assembly in FTA country" : "Ensamblaje en país con TLC", 
      status: language === 'en' ? "Not Met" : "No Cumplido" 
    }
  ] as OriginRequirement[],

  engineeringOptions: [
    {
      option: language === 'en' ? "Component Separation" : "Separación de Componentes",
      description: language === 'en' ? "Ship display and computing unit separately" : "Enviar pantalla y unidad de cómputo por separado",
      savings: "7.5%",
      complexity: language === 'en' ? "Medium" : "Media"
    },
    {
      option: language === 'en' ? "Assembly Relocation" : "Reubicación de Ensamblaje",
      description: language === 'en' ? "Final assembly in Mexico" : "Ensamblaje final en México",
      savings: "25.0%",
      complexity: language === 'en' ? "High" : "Alta"
    },
    {
      option: language === 'en' ? "Material Substitution" : "Sustitución de Materiales",
      description: language === 'en' ? "Replace certain materials with duty-free alternatives" : "Reemplazar ciertos materiales con alternativas libres de aranceles",
      savings: "3.2%",
      complexity: language === 'en' ? "Low" : "Baja"
    }
  ] as EngineeringOption[],

  specialPrograms: [
    {
      program: language === 'en' ? "First Sale Rule" : "Regla de Primera Venta",
      eligibility: language === 'en' ? "Eligible" : "Elegible",
      savings: "8.2%",
      requirements: language === 'en' ? "Proper transaction documentation, arms-length pricing" : "Documentación adecuada de transacción, precios de libre competencia"
    },
    {
      program: language === 'en' ? "Foreign Trade Zone" : "Zona de Comercio Exterior",
      eligibility: language === 'en' ? "Eligible" : "Elegible",
      savings: language === 'en' ? "Duty deferral" : "Aplazamiento de aranceles",
      requirements: language === 'en' ? "Use of authorized FTZ facility" : "Uso de instalaciones ZCE autorizadas"
    },
    {
      program: language === 'en' ? "Duty Drawback" : "Devolución de Aranceles",
      eligibility: language === 'en' ? "Eligible" : "Elegible",
      savings: language === 'en' ? "Up to 99% of duties paid" : "Hasta el 99% de aranceles pagados",
      requirements: language === 'en' ? "Re-export within 5 years with proper documentation" : "Reexportar en 5 años con documentación adecuada"
    }
  ] as SpecialProgram[],

  historicalData: [
    { year: "2019", rate: 25.0 },
    { year: "2020", rate: 27.5 },
    { year: "2021", rate: 30.0 },
    { year: "2022", rate: 32.97 },
    { year: "2023", rate: 32.97 },
    { year: "2024", rate: 32.97 },
    { year: "2025", rate: 35.0, projected: true }
  ] as HistoricalData[],

  exclusionInfo: {
    available: true,
    process: language === 'en' ? "Section 301 Exclusion Request" : "Solicitud de Exclusión Sección 301",
    criteria: language === 'en' ? "Not available domestically, significant economic harm, strategic importance" : "No disponible nacionalmente, daño económico significativo, importancia estratégica",
    timeline: language === 'en' ? "90-120 days for review" : "90-120 días para revisión",
    successRate: language === 'en' ? "~33% approval rate historically" : "~33% tasa de aprobación histórica"
  } as ExclusionInfo
});

