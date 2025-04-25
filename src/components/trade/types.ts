
export interface Route {
  path: string;
  name?: string;
  transitTime: number;
  customsClearance?: number;
  localDelivery?: number;
  cost: number;
  riskLevel: string;
  description: string;
  recommended?: boolean;
  carbonFootprint: string;
  reliabilityScore: number;
  seasonality: string;
  politicalStability: string;
  smbAdvantages: {
    consolidatedShipping: boolean;
    sharedContainer: boolean;
    flexiblePickup: boolean;
    lowerMinimumQuantity: boolean;
  };
  emergingMarkets: {
    hubs: string[];
    growthPotential: string;
    economicZones: string[];
    competitorAnalysis: string;
  };
  financialConsiderations: {
    cashFlowImpact: string;
    paymentTerms: string;
    tradeFinance: string;
    currencyExchange: string;
  };
  riskMitigation: {
    insuranceOptions: string[];
    backupRoutes: string[];
    splitShipment: boolean;
    coverageComparison: string;
  };
  partnerships: {
    distributors: string[];
    warehousing: string[];
    fulfillment: string[];
    lastMile: string[];
  };
  scalingConsiderations: {
    growthAccommodation: string;
    volumeThresholds: string;
    peakSeasonFlexibility: string;
    infrastructureDevelopment: string;
  };
  competitiveAdvantages: {
    positioningStrategy: string;
    speedToMarket: string;
    uniqueAccess: string;
    customerExperience: string;
  };
  complianceComplexity: {
    level: 'Low' | 'Medium' | 'High';
    documentation: string;
    simplificationPotential: string;
  };
  savings?: string;
}

export interface TradeOpportunity {
  title: string;
  savings: string;
  tags: string[];
  description: string;
  currentRoute: string;
  alternativeRoute: string;
  type: 'savings' | 'market';
}

export interface Document {
  name: string;
  status: 'required' | 'warning' | 'not-required';
}
