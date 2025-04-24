
import { Route } from '../types';

interface RouteGenerationParams {
  origin: string;
  destination: string;
  viaPoints?: string[];
  transportMode: 'sea' | 'air' | 'rail' | 'multimodal';
}

const calculateTransitTime = (params: RouteGenerationParams): string => {
  const baseTime = {
    sea: 20,
    air: 2,
    rail: 12,
    multimodal: 15
  }[params.transportMode];

  // Add 2 days for each via point
  const viaPointsTime = (params.viaPoints?.length || 0) * 2;
  return `${baseTime + viaPointsTime} days`;
};

const calculateCost = (params: RouteGenerationParams): string => {
  const baseCost = {
    sea: 2000,
    air: 5000,
    rail: 3000,
    multimodal: 2500
  }[params.transportMode];

  // Add $500 for each via point
  const viaPointsCost = (params.viaPoints?.length || 0) * 500;
  return `$${(baseCost + viaPointsCost).toLocaleString()}`;
};

const generateRiskLevel = (params: RouteGenerationParams): string => {
  const riskFactors = {
    sea: 'Medium',
    air: 'Low',
    rail: 'Medium',
    multimodal: 'Medium'
  };
  return riskFactors[params.transportMode];
};

const generateCarbonFootprint = (params: RouteGenerationParams): string => {
  const baseEmissions = {
    sea: 1.2,
    air: 4.5,
    rail: 0.8,
    multimodal: 2.0
  }[params.transportMode];

  // Add 0.2 tons for each via point
  const viaPointsEmissions = (params.viaPoints?.length || 0) * 0.2;
  return `${(baseEmissions + viaPointsEmissions).toFixed(1)} tons CO2e`;
};

export const generateRoute = (params: RouteGenerationParams): Route => {
  const path = [params.origin, ...(params.viaPoints || []), params.destination].join(' → ');
  const transitTime = calculateTransitTime(params);
  const cost = calculateCost(params);
  const riskLevel = generateRiskLevel(params);

  return {
    path,
    transitTime,
    cost,
    riskLevel,
    description: `${params.transportMode.toUpperCase()} freight route via ${params.viaPoints?.join(', ') || 'direct route'}. ${
      params.transportMode === 'air' ? 'Premium service for time-sensitive shipments.' : 'Standard shipping service.'
    }`,
    carbonFootprint: generateCarbonFootprint(params),
    reliabilityScore: params.transportMode === 'air' ? 9.5 : 8,
    seasonality: params.transportMode === 'air' ? 'Minimal seasonal impact' : 'Seasonal variations may affect transit times',
    politicalStability: 'Stable with occasional port congestion',
    smbAdvantages: {
      consolidatedShipping: params.transportMode !== 'air',
      sharedContainer: params.transportMode !== 'air',
      flexiblePickup: true,
      lowerMinimumQuantity: true
    },
    emergingMarkets: {
      hubs: params.viaPoints || [],
      growthPotential: 'Medium growth in target markets',
      economicZones: [`${params.destination} Free Trade Zone`],
      competitorAnalysis: 'Moderate competition, established route'
    },
    financialConsiderations: {
      cashFlowImpact: params.transportMode === 'air' ? 'Higher upfront costs but faster inventory turnover' : 'Standard payment terms available',
      paymentTerms: 'Net 30-60 available with established carriers',
      tradeFinance: 'Letter of credit and trade insurance readily available',
      currencyExchange: 'USD-based transactions minimize currency risk'
    },
    riskMitigation: {
      insuranceOptions: ['Basic coverage', 'Premium coverage'],
      backupRoutes: ['Alternative ports available', 'Emergency air freight option'],
      splitShipment: true,
      coverageComparison: 'Standard coverage includes weather but not strikes'
    },
    partnerships: {
      distributors: [`${params.destination} Distribution Network`],
      warehousing: [`${params.destination} Warehouse Partners`],
      fulfillment: [`${params.destination} Fulfillment Services`],
      lastMile: ['Regional Carriers', 'Express Delivery']
    },
    scalingConsiderations: {
      growthAccommodation: 'Can scale up to 3x current volume',
      volumeThresholds: 'Better rates at higher volumes',
      peakSeasonFlexibility: 'Advance booking required during Q4',
      infrastructureDevelopment: 'Ongoing improvements in key hubs'
    },
    competitiveAdvantages: {
      positioningStrategy: `${params.transportMode === 'air' ? 'Premium' : 'Standard'} service with reliable delivery`,
      speedToMarket: params.transportMode === 'air' ? 'Ultra-fast' : 'Standard',
      uniqueAccess: `Strong connections to ${params.destination} market`,
      customerExperience: 'Consistent delivery schedules'
    },
    complianceComplexity: {
      level: params.transportMode === 'air' ? 'Low' : 'Medium',
      documentation: `${params.transportMode === 'air' ? '3-4' : '5-7'} documents required`,
      simplificationPotential: 'AEO certification could streamline customs'
    }
  };
};
