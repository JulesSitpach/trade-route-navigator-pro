
import { Route } from '../../types';

export const routes: Route[] = [
  {
    path: 'Shanghai → Panama Canal → Los Angeles → Chicago',
    transitTime: '24 days',
    cost: '$2,450',
    riskLevel: 'Medium',
    description: 'Standard ocean freight route with well-established logistics providers. Reliable and cost-effective for non-urgent shipments.',
    recommended: true,
    carbonFootprint: '1.2 tons CO2e',
    reliabilityScore: 8,
    seasonality: 'Potential delays during Chinese New Year (Jan-Feb)',
    politicalStability: 'Stable with occasional port congestion',
    smbAdvantages: {
      consolidatedShipping: true,
      sharedContainer: true,
      flexiblePickup: true,
      lowerMinimumQuantity: true
    },
    emergingMarkets: {
      hubs: ['Panama City', 'Los Angeles'],
      growthPotential: 'Medium growth in Midwest markets',
      economicZones: ['Panama Pacifico SEZ', 'LA Free Trade Zone'],
      competitorAnalysis: 'Moderate competition, established route'
    },
    financialConsiderations: {
      cashFlowImpact: 'Longer transit time allows extended payment terms',
      paymentTerms: 'Net 30-60 available with established carriers',
      tradeFinance: 'Letter of credit and trade insurance readily available',
      currencyExchange: 'USD-based transactions minimize currency risk'
    },
    riskMitigation: {
      insuranceOptions: ['Basic coverage ($1,500)', 'Premium coverage ($2,200)'],
      backupRoutes: ['Air freight option during emergencies', 'Alternative ports in Oakland or Seattle'],
      splitShipment: true,
      coverageComparison: 'Standard coverage includes weather but not strikes'
    },
    partnerships: {
      distributors: ['PanaPacific Logistics', 'US Midwest Distribution'],
      warehousing: ['Chicago Central Storage', 'LA Warehouse Partners'],
      fulfillment: ['Midwest Fulfillment Co', 'Chicago Distribution Services'],
      lastMile: ['Regional Carriers', 'USPS Business', 'FedEx Ground']
    },
    scalingConsiderations: {
      growthAccommodation: 'Can scale up to 3x current volume without significant cost increase',
      volumeThresholds: 'Better rates at 10+ containers/month',
      peakSeasonFlexibility: 'Advance booking required during Q4',
      infrastructureDevelopment: 'Panama Canal expansion improving capacity'
    },
    competitiveAdvantages: {
      positioningStrategy: 'Established route with reliable delivery windows for inventory planning',
      speedToMarket: 'Medium - suitable for predictable supply needs',
      uniqueAccess: 'Strong connections to Midwest distribution centers',
      customerExperience: 'Consistent delivery schedules enable reliable promises to customers'
    },
    complianceComplexity: {
      level: 'Medium',
      documentation: '5-7 documents required, standard filing process',
      simplificationPotential: 'AEO certification could streamline customs'
    }
  },
  {
    path: 'Shanghai → Los Angeles → Chicago',
    transitTime: '3 days',
    cost: '$5,650',
    riskLevel: 'Low',
    description: 'Premium air freight service for time-sensitive shipments. Significantly higher cost but offers much faster delivery and reduced risk.',
    savings: '$3,200 (130%)',
    carbonFootprint: '4.5 tons CO2e',
    reliabilityScore: 9.5,
    seasonality: 'Minimal seasonal impact, occasional holiday congestion',
    politicalStability: 'High stability with minimal disruption risk',
    smbAdvantages: {
      consolidatedShipping: false,
      sharedContainer: false,
      flexiblePickup: true,
      lowerMinimumQuantity: true
    },
    emergingMarkets: {
      hubs: ['Los Angeles Tech Hub'],
      growthPotential: 'Fast access to time-sensitive markets',
      economicZones: ['LA Airport Free Trade Zone'],
      competitorAnalysis: 'Premium segment with fewer SMB competitors'
    },
    financialConsiderations: {
      cashFlowImpact: 'Higher upfront costs but faster inventory turnover',
      paymentTerms: 'Pre-payment typically required, net terms for established accounts',
      tradeFinance: 'Express financing options available at premium rates',
      currencyExchange: 'USD-based with rapid settlement'
    },
    riskMitigation: {
      insuranceOptions: ['Standard air freight coverage ($2,100)', 'Premium time-guarantee ($3,000)'],
      backupRoutes: ['Alternative airlines with similar schedules', 'Charter options for emergencies'],
      splitShipment: true,
      coverageComparison: 'Comprehensive coverage includes delays and cancellations'
    },
    partnerships: {
      distributors: ['Express Distribution Network', 'US Premium Logistics'],
      warehousing: ['Airport-adjacent facilities', 'Chicago Express Hub'],
      fulfillment: ['Same-day processing centers', 'Rush Order Fulfillment Inc'],
      lastMile: ['Express Carriers', 'Same-day services in metro areas']
    },
    scalingConsiderations: {
      growthAccommodation: 'Easily scales for high-value, low-volume products',
      volumeThresholds: 'Better rates at 500kg+ weekly shipments',
      peakSeasonFlexibility: 'Premium rates during holiday season (Nov-Dec)',
      infrastructureDevelopment: 'Expanding cargo terminal at O\'Hare for faster processing'
    },
    competitiveAdvantages: {
      positioningStrategy: 'Premium positioning for time-critical products',
      speedToMarket: 'Ultra-fast - ideal for high-value or urgent items',
      uniqueAccess: 'Ability to reach time-sensitive markets ahead of slower competitors',
      customerExperience: 'Enhanced customer satisfaction with rapid delivery options'
    },
    complianceComplexity: {
      level: 'Low',
      documentation: '3-4 documents with expedited processing',
      simplificationPotential: 'Express customs clearance programs available'
    }
  }
];
