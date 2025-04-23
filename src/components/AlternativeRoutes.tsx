
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { MapPin, Clock, DollarSign, Shield, TrendingUp, Layers, Building, Factory, Package, Truck } from "lucide-react";

interface RouteOption {
  path: string;
  transitTime: string;
  cost: string;
  riskLevel: string;
  description: string;
  savings?: string;
  recommended?: boolean;
  carbonFootprint?: string;
  reliabilityScore?: number;
  seasonality?: string;
  politicalStability?: string;
  smbAdvantages?: {
    consolidatedShipping?: boolean;
    sharedContainer?: boolean;
    flexiblePickup?: boolean;
    lowerMinimumQuantity?: boolean;
  };
  emergingMarkets?: {
    hubs?: string[];
    growthPotential?: string;
    economicZones?: string[];
    competitorAnalysis?: string;
  };
  financialConsiderations?: {
    cashFlowImpact?: string;
    paymentTerms?: string;
    tradeFinance?: string;
    currencyExchange?: string;
  };
  riskMitigation?: {
    insuranceOptions?: string[];
    backupRoutes?: string[];
    splitShipment?: boolean;
    coverageComparison?: string;
  };
  partnerships?: {
    distributors?: string[];
    warehousing?: string[];
    fulfillment?: string[];
    lastMile?: string[];
  };
  scalingConsiderations?: {
    growthAccommodation?: string;
    volumeThresholds?: string;
    peakSeasonFlexibility?: string;
    infrastructureDevelopment?: string;
  };
  competitiveAdvantages?: {
    positioningStrategy?: string;
    speedToMarket?: string;
    uniqueAccess?: string;
    customerExperience?: string;
  };
  complianceComplexity?: {
    level?: "Low" | "Medium" | "High";
    documentation?: string;
    simplificationPotential?: string;
  };
}

interface AlternativeRoutesProps {
  routes: RouteOption[];
}

const AlternativeRoutes = ({ routes }: AlternativeRoutesProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Alternative Routes and Transportation Methods</h2>
        <p className="text-gray-600 mb-4">
          Strategic shipping options tailored for small and medium-sized businesses to optimize costs, 
          timeline, and market opportunities.
        </p>
      </div>
      
      {routes.map((route, index) => (
        <Card key={index} className="p-6">
          <div className="flex flex-col space-y-6">
            {/* Header with basic route information */}
            <div className="flex flex-wrap justify-between items-start gap-4">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{route.path}</h3>
                  {route.recommended && (
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Recommended</Badge>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{route.description}</p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Button variant="default">Select Route</Button>
                <Button variant="outline">Compare</Button>
              </div>
            </div>
            
            {/* Core metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard icon={<Clock className="h-5 w-5 text-blue-500" />} 
                         title="Transit Time" 
                         value={route.transitTime} />
              <MetricCard icon={<DollarSign className="h-5 w-5 text-green-500" />} 
                         title="Total Cost" 
                         value={route.cost} />
              <MetricCard icon={<Shield className="h-5 w-5 text-amber-500" />} 
                         title="Risk Level" 
                         value={route.riskLevel} />
              {route.carbonFootprint && (
                <MetricCard icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} 
                           title="Carbon Footprint" 
                           value={route.carbonFootprint} />
              )}
            </div>
            
            {/* Expanded information in tabs */}
            <Tabs defaultValue="advantages" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="advantages">SMB Advantages</TabsTrigger>
                <TabsTrigger value="markets">Market Opportunities</TabsTrigger>
                <TabsTrigger value="risks">Risk & Finance</TabsTrigger>
                <TabsTrigger value="growth">Growth & Scaling</TabsTrigger>
              </TabsList>
              
              {/* SMB Advantages Tab */}
              <TabsContent value="advantages" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      SMB-Specific Advantages
                    </h4>
                    <div className="space-y-2">
                      {route.smbAdvantages?.consolidatedShipping && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50">Consolidated Shipping</Badge>
                          <span className="text-sm text-gray-600">Lower costs through combined shipments</span>
                        </div>
                      )}
                      {route.smbAdvantages?.sharedContainer && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50">Shared Container</Badge>
                          <span className="text-sm text-gray-600">Split container costs with other businesses</span>
                        </div>
                      )}
                      {route.smbAdvantages?.flexiblePickup && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50">Flexible Pickup</Badge>
                          <span className="text-sm text-gray-600">Accommodates irregular shipping schedules</span>
                        </div>
                      )}
                      {route.smbAdvantages?.lowerMinimumQuantity && (
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-blue-50">Lower Minimum Quantity</Badge>
                          <span className="text-sm text-gray-600">Suited for smaller order volumes</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Partnership Opportunities
                    </h4>
                    <div className="space-y-2 text-sm text-gray-700">
                      {route.partnerships?.distributors && route.partnerships.distributors.length > 0 && (
                        <div>
                          <span className="font-medium">Local Distributors:</span> {route.partnerships.distributors.join(", ")}
                        </div>
                      )}
                      {route.partnerships?.warehousing && route.partnerships.warehousing.length > 0 && (
                        <div>
                          <span className="font-medium">Warehousing Partners:</span> {route.partnerships.warehousing.join(", ")}
                        </div>
                      )}
                      {route.partnerships?.fulfillment && route.partnerships.fulfillment.length > 0 && (
                        <div>
                          <span className="font-medium">Fulfillment Services:</span> {route.partnerships.fulfillment.join(", ")}
                        </div>
                      )}
                      {route.partnerships?.lastMile && route.partnerships.lastMile.length > 0 && (
                        <div>
                          <span className="font-medium">Last-Mile Options:</span> {route.partnerships.lastMile.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Reliability Metrics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {route.reliabilityScore !== undefined && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Reliability Score</span>
                          <span className="font-medium">{route.reliabilityScore}/10</span>
                        </div>
                        <Progress value={route.reliabilityScore * 10} className="h-2" />
                      </div>
                    )}
                    {route.seasonality && (
                      <div className="text-sm">
                        <span className="font-medium">Seasonality:</span> {route.seasonality}
                      </div>
                    )}
                    {route.politicalStability && (
                      <div className="text-sm">
                        <span className="font-medium">Political Stability:</span> {route.politicalStability}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Market Opportunities Tab */}
              <TabsContent value="markets" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Emerging Market Opportunities
                  </h4>
                  
                  {route.emergingMarkets?.hubs && route.emergingMarkets.hubs.length > 0 && (
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Emerging Trade Hubs</div>
                      <div className="flex flex-wrap gap-2">
                        {route.emergingMarkets.hubs.map((hub, i) => (
                          <Badge key={i} variant="outline" className="bg-amber-50">{hub}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {route.emergingMarkets?.growthPotential && (
                    <div className="text-sm">
                      <span className="font-medium">Market Growth Potential:</span> {route.emergingMarkets.growthPotential}
                    </div>
                  )}
                  
                  {route.emergingMarkets?.economicZones && route.emergingMarkets.economicZones.length > 0 && (
                    <div className="space-y-1">
                      <div className="font-medium text-sm">Special Economic Zones</div>
                      <div className="flex flex-wrap gap-2">
                        {route.emergingMarkets.economicZones.map((zone, i) => (
                          <Badge key={i} variant="outline" className="bg-blue-50">{zone}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {route.emergingMarkets?.competitorAnalysis && (
                    <div className="text-sm">
                      <span className="font-medium">Competitor Landscape:</span> {route.emergingMarkets.competitorAnalysis}
                    </div>
                  )}
                </div>
                
                <div className="pt-2 space-y-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Competitive Advantages
                  </h4>
                  
                  {route.competitiveAdvantages && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {route.competitiveAdvantages.positioningStrategy && (
                        <div>
                          <span className="font-medium">Market Positioning:</span> {route.competitiveAdvantages.positioningStrategy}
                        </div>
                      )}
                      {route.competitiveAdvantages.speedToMarket && (
                        <div>
                          <span className="font-medium">Speed-to-Market:</span> {route.competitiveAdvantages.speedToMarket}
                        </div>
                      )}
                      {route.competitiveAdvantages.uniqueAccess && (
                        <div>
                          <span className="font-medium">Unique Market Access:</span> {route.competitiveAdvantages.uniqueAccess}
                        </div>
                      )}
                      {route.competitiveAdvantages.customerExperience && (
                        <div>
                          <span className="font-medium">Customer Experience:</span> {route.competitiveAdvantages.customerExperience}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Risks & Finance Tab */}
              <TabsContent value="risks" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Risk Mitigation Strategies
                    </h4>
                    
                    {route.riskMitigation?.insuranceOptions && route.riskMitigation.insuranceOptions.length > 0 && (
                      <div className="space-y-1">
                        <div className="font-medium text-sm">Insurance Options</div>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {route.riskMitigation.insuranceOptions.map((option, i) => (
                            <li key={i}>{option}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {route.riskMitigation?.backupRoutes && route.riskMitigation.backupRoutes.length > 0 && (
                      <div className="space-y-1">
                        <div className="font-medium text-sm">Backup Routes</div>
                        <ul className="list-disc pl-5 text-sm text-gray-700">
                          {route.riskMitigation.backupRoutes.map((backup, i) => (
                            <li key={i}>{backup}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {route.riskMitigation?.splitShipment && (
                      <div className="text-sm">
                        <Badge variant="outline" className="bg-green-50">Split Shipment Available</Badge>
                        <span className="ml-2 text-gray-600">Diversify risk across multiple shipments</span>
                      </div>
                    )}
                    
                    {route.riskMitigation?.coverageComparison && (
                      <div className="text-sm">
                        <span className="font-medium">Coverage Analysis:</span> {route.riskMitigation.coverageComparison}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Financial Considerations
                    </h4>
                    
                    {route.financialConsiderations && (
                      <div className="space-y-3 text-sm">
                        {route.financialConsiderations.cashFlowImpact && (
                          <div>
                            <span className="font-medium">Cash Flow Impact:</span> {route.financialConsiderations.cashFlowImpact}
                          </div>
                        )}
                        {route.financialConsiderations.paymentTerms && (
                          <div>
                            <span className="font-medium">Available Payment Terms:</span> {route.financialConsiderations.paymentTerms}
                          </div>
                        )}
                        {route.financialConsiderations.tradeFinance && (
                          <div>
                            <span className="font-medium">Trade Finance Options:</span> {route.financialConsiderations.tradeFinance}
                          </div>
                        )}
                        {route.financialConsiderations.currencyExchange && (
                          <div>
                            <span className="font-medium">Currency Considerations:</span> {route.financialConsiderations.currencyExchange}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="pt-2">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Compliance Complexity
                  </h4>
                  
                  {route.complianceComplexity?.level && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm">Complexity Level:</span>
                        <Badge className={
                          route.complianceComplexity.level === "Low" ? "bg-green-100 text-green-800" :
                          route.complianceComplexity.level === "Medium" ? "bg-amber-100 text-amber-800" :
                          "bg-red-100 text-red-800"
                        }>
                          {route.complianceComplexity.level}
                        </Badge>
                      </div>
                      
                      {route.complianceComplexity.documentation && (
                        <div className="text-sm">
                          <span className="font-medium">Documentation Required:</span> {route.complianceComplexity.documentation}
                        </div>
                      )}
                      
                      {route.complianceComplexity.simplificationPotential && (
                        <div className="text-sm">
                          <span className="font-medium">Simplification Options:</span> {route.complianceComplexity.simplificationPotential}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TabsContent>
              
              {/* Growth & Scaling Tab */}
              <TabsContent value="growth" className="space-y-4 pt-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Factory className="h-4 w-4" />
                  Scaling Considerations
                </h4>
                
                {route.scalingConsiderations && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    {route.scalingConsiderations.growthAccommodation && (
                      <div>
                        <span className="font-medium">Growth Accommodation:</span> {route.scalingConsiderations.growthAccommodation}
                      </div>
                    )}
                    {route.scalingConsiderations.volumeThresholds && (
                      <div>
                        <span className="font-medium">Volume Thresholds for Better Rates:</span> {route.scalingConsiderations.volumeThresholds}
                      </div>
                    )}
                    {route.scalingConsiderations.peakSeasonFlexibility && (
                      <div>
                        <span className="font-medium">Peak Season Flexibility:</span> {route.scalingConsiderations.peakSeasonFlexibility}
                      </div>
                    )}
                    {route.scalingConsiderations.infrastructureDevelopment && (
                      <div>
                        <span className="font-medium">Infrastructure Development:</span> {route.scalingConsiderations.infrastructureDevelopment}
                      </div>
                    )}
                  </div>
                )}
                
                {route.savings && (
                  <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-700">Potential Long-Term Savings</span>
                    </div>
                    <p className="text-green-600 mt-1">{route.savings} compared to standard routes</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      ))}
    </div>
  );
};

const MetricCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
      {icon}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default AlternativeRoutes;

