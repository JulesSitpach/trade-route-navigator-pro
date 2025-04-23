
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlternativeRoutes from './AlternativeRoutes';
import TradeOpportunities from './TradeOpportunities';
import TariffAnalysis from './TariffAnalysis';
import CostAnalysisTab from './trade/CostAnalysisTab';
import RegulationsTab from './trade/RegulationsTab';
import VisualizationsTab from './trade/VisualizationsTab';

const TradeAnalysis = ({ data }: { data: any }) => {
  const routes = [
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
        level: 'Medium' as 'Low' | 'Medium' | 'High',
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
        level: 'Low' as 'Low' | 'Medium' | 'High',
        documentation: '3-4 documents with expedited processing',
        simplificationPotential: 'Express customs clearance programs available'
      }
    }
  ];

  const opportunities = [
    {
      title: 'Alternative Origin: Vietnam Instead of China',
      savings: '$3,125.00',
      tags: ['Tariff Reduction', 'Lower Risk'],
      description: 'Sourcing this product from Vietnam instead of China would reduce the tariff rate from 125% to 10%, resulting in significant savings on duty costs.',
      currentRoute: 'China → US (125% tariff)',
      alternativeRoute: 'Vietnam → US (10% tariff)',
      type: 'savings' as const
    },
    {
      title: 'Triangular Trade: China → Mexico → US',
      savings: '$2,875.00',
      tags: ['USMCA Advantage', 'Requires Processing'],
      description: 'Import components from China to Mexico (15% tariff), perform sufficient processing to meet USMCA requirements, then export to US with 0% tariff.',
      currentRoute: 'China → US (125% tariff)',
      alternativeRoute: 'China → Mexico (15% tariff) → US (0% tariff under USMCA)',
      type: 'savings' as const
    }
  ];

  const requiredDocuments = [
    { name: 'Certificate of Origin', status: 'required' as const },
    { name: 'Commercial Invoice', status: 'required' as const },
    { name: 'Packing List', status: 'required' as const },
    { name: 'Bill of Lading/Airway Bill', status: 'required' as const },
    { name: 'Import/Export Licenses', status: 'warning' as const },
    { name: 'Safety/Compliance Certifications', status: 'required' as const },
    { name: 'Phytosanitary Certificate', status: 'not-required' as const }
  ];

  const regulatoryTimeline = [
    { stage: 'Pre-shipment', documents: ['Certificate of Origin', 'Commercial Invoice', 'Export Licenses'], deadline: '14 days before departure' },
    { stage: 'During Transit', documents: ['Bill of Lading', 'Packing List'], deadline: 'Must accompany shipment' },
    { stage: 'Upon Arrival', documents: ['Import Licenses', 'Compliance Certifications'], deadline: 'Required for customs clearance' },
    { stage: 'Post-clearance', documents: ['Post-import Verification', 'Recordkeeping'], deadline: 'Within 30 days after clearance' }
  ];

  const countryRequirements = [
    {
      country: 'United States',
      requirements: [
        'FDA registration for food products',
        'Electronic cargo information submission 24hrs before loading',
        'ISF filing required',
        'English labeling mandatory'
      ]
    },
    {
      country: 'European Union',
      requirements: [
        'CE marking for applicable products',
        'REACH compliance for chemicals',
        'GDPR compliance for consumer data',
        'Country of origin marking in local language'
      ]
    }
  ];

  const permitGuidance = [
    {
      permit: 'Import License',
      processingTime: '10-15 business days',
      fee: '$150-$300',
      documentation: ['Business registration', 'Product specifications', 'End-user statement']
    },
    {
      permit: 'Customs Bond',
      processingTime: '3-5 business days',
      fee: '0.5% of shipment value (minimum $100)',
      documentation: ['Company financial statements', 'Surety approval']
    }
  ];

  const regulatoryUpdates = [
    {
      date: 'January 2025',
      title: 'New Electronic Documentation System',
      description: 'All import documentation must be submitted through the new government electronic portal.'
    },
    {
      date: 'March 2025',
      title: 'Revised Tariff Schedule',
      description: 'Tariff rates for electronic components will increase by 5% under new trade agreement provisions.'
    }
  ];

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Trade Analysis Results</h2>
      
      <Tabs defaultValue="costs" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="routes">Alternative Routes</TabsTrigger>
          <TabsTrigger value="tariffs">Tariff Analysis</TabsTrigger>
          <TabsTrigger value="regulations">Regulations</TabsTrigger>
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
        </TabsList>

        <TabsContent value="costs">
          <CostAnalysisTab />
        </TabsContent>

        <TabsContent value="routes">
          <AlternativeRoutes routes={routes} />
        </TabsContent>

        <TabsContent value="tariffs">
          <TariffAnalysis />
        </TabsContent>

        <TabsContent value="regulations">
          <RegulationsTab />
        </TabsContent>

        <TabsContent value="visualizations">
          <VisualizationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradeAnalysis;
