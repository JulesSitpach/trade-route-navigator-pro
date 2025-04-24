
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlternativeRoutes from './AlternativeRoutes';
import TradeOpportunities from './TradeOpportunities';
import TariffAnalysis from './TariffAnalysis';
import CostAnalysisTab from './trade/CostAnalysisTab';
import RegulationsTab from './trade/RegulationsTab';
import VisualizationsTab from './trade/VisualizationsTab';

// Sample data for alternative routes
const sampleRoutes = [
  {
    path: "Shanghai → Los Angeles → Chicago",
    transitTime: "28-32 days",
    cost: "$4,800",
    riskLevel: "Medium",
    description: "Ocean freight with rail connection, suitable for non-urgent large shipments.",
    savings: "15% less expensive than air freight",
    recommended: true,
    carbonFootprint: "Lower emissions",
    reliabilityScore: 7,
    seasonality: "Higher rates during Q4",
    politicalStability: "Stable",
    smbAdvantages: {
      consolidatedShipping: true,
      sharedContainer: true,
      flexiblePickup: false,
      lowerMinimumQuantity: true
    },
    emergingMarkets: {
      hubs: ["Incheon", "Busan", "Manila"],
      growthPotential: "High potential in Southeast Asian markets",
      economicZones: ["Port of Long Beach FTZ", "Chicago CZ"],
      competitorAnalysis: "Medium presence of competitors in this route"
    },
    financialConsiderations: {
      cashFlowImpact: "30-day payment terms available",
      paymentTerms: "Net 30, LC available",
      tradeFinance: "Export financing through partner banks",
      currencyExchange: "USD throughout"
    },
    riskMitigation: {
      insuranceOptions: ["All-risk coverage", "Named perils policy"],
      backupRoutes: ["Via Panama Canal", "Vancouver alternative"],
      splitShipment: true,
      coverageComparison: "20% premium for comprehensive coverage"
    },
    partnerships: {
      distributors: ["Pacific Partners", "Midwest Distribution Co."],
      warehousing: ["LA Logistics Hub", "Chicago Central Storage"],
      fulfillment: ["West Coast Fulfillment", "Midwest Express"],
      lastMile: ["Regional Carriers", "Expedited Services"]
    },
    scalingConsiderations: {
      growthAccommodation: "Can scale up to 300% volume with advanced notice",
      volumeThresholds: "10+ containers quarterly for additional 5% discount",
      peakSeasonFlexibility: "Capacity guarantees with 45-day booking",
      infrastructureDevelopment: "New rail terminal opening Q3 2025"
    },
    competitiveAdvantages: {
      positioningStrategy: "Established route with preferential rates",
      speedToMarket: "Faster than competitors by 2-3 days",
      uniqueAccess: "Priority unloading at LA port",
      customerExperience: "End-to-end tracking capabilities"
    },
    complianceComplexity: {
      level: "Medium",
      documentation: "Standard documentation plus FDA approval",
      simplificationPotential: "Customs broker package available"
    }
  },
  {
    path: "Guangzhou → Singapore → Rotterdam → Berlin",
    transitTime: "35-40 days",
    cost: "$5,200",
    riskLevel: "Low",
    description: "Multi-stop ocean freight via major transshipment hubs, ideal for entering European markets.",
    carbonFootprint: "Medium emissions",
    reliabilityScore: 8,
    seasonality: "Stable year-round",
    politicalStability: "Very stable",
    smbAdvantages: {
      consolidatedShipping: true,
      sharedContainer: true,
      flexiblePickup: true,
      lowerMinimumQuantity: false
    },
    complianceComplexity: {
      level: "High",
      documentation: "Complex documentation with multiple customs clearances",
      simplificationPotential: "EU fast-track program available for regular shippers"
    }
  }
];

const TradeAnalysis = ({ data }: { data: any }) => {
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
          <AlternativeRoutes routes={sampleRoutes} />
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
