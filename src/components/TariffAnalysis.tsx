
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { 
  ChartBar, 
  FileSearch, 
  Flag, 
  FileText, 
  Settings, 
  TrendingDown, 
  TrendingUp, 
  DollarSign,
  FileCheck
} from "lucide-react";
import { countryTariffData, getCountryByCode } from "@/data/countryTariffData";

interface TariffAnalysisProps {
  originCountry?: string;
  destinationCountry?: string;
  productCategory?: string;
  hsCode?: string;
}

const TariffAnalysis = ({
  originCountry = "cn",
  destinationCountry = "us",
  productCategory = "electronics",
  hsCode = "8471.30.0100"
}: TariffAnalysisProps) => {
  // Dummy data for visualization purposes
  const origin = getCountryByCode(originCountry);
  const destination = getCountryByCode(destinationCountry);
  
  const tariffRates = [
    { type: "MFN Rate", rate: 7.5, description: "Standard Most Favored Nation rate" },
    { type: "Section 301", rate: 25.0, description: "Additional tariffs on Chinese goods" },
    { type: "Merchandise Processing", rate: 0.3464, description: "Customs processing fee" },
    { type: "Harbor Maintenance", rate: 0.125, description: "Port usage fee" }
  ];
  
  // Total effective rate
  const totalRate = tariffRates.reduce((sum, item) => sum + item.rate, 0);

  // Country comparison data
  const countryComparisonData = [
    { country: "United States", rate: 32.97 },
    { country: "European Union", rate: 12.5 },
    { country: "Canada", rate: 8.0 },
    { country: "Mexico", rate: 15.0 },
    { country: "Japan", rate: 10.0 },
    { country: "South Korea", rate: 13.0 }
  ];

  // Alternative HS codes
  const alternativeHSCodes = [
    { code: "8471.30.0100", description: "Laptop computers", rate: 32.97 },
    { code: "8471.41.0150", description: "Processing units", rate: 25.0 },
    { code: "8473.30.5100", description: "Parts and accessories", rate: 15.0 }
  ];

  // Historical trends data
  const historicalData = [
    { year: "2019", rate: 25.0 },
    { year: "2020", rate: 27.5 },
    { year: "2021", rate: 30.0 },
    { year: "2022", rate: 32.97 },
    { year: "2023", rate: 32.97 },
    { year: "2024", rate: 32.97 },
    { year: "2025", rate: 35.0, projected: true }
  ];

  // Rules of origin requirements
  const originRequirements = [
    { requirement: "Regional Value Content", threshold: "60% or higher", status: "Met" },
    { requirement: "Tariff Shift", threshold: "Change in HS chapter", status: "Met" },
    { requirement: "Specific Processing", threshold: "Assembly in FTA country", status: "Not Met" }
  ];

  // Tariff engineering options
  const engineeringOptions = [
    {
      option: "Component Separation",
      description: "Ship display and computing unit separately",
      savings: "7.5%",
      complexity: "Medium"
    },
    {
      option: "Assembly Relocation",
      description: "Final assembly in Mexico",
      savings: "25.0%",
      complexity: "High"
    },
    {
      option: "Material Substitution",
      description: "Replace certain materials with duty-free alternatives",
      savings: "3.2%",
      complexity: "Low"
    }
  ];

  // Special programs
  const specialPrograms = [
    {
      program: "First Sale Rule",
      eligibility: "Eligible",
      savings: "8.2%",
      requirements: "Proper transaction documentation, arms-length pricing"
    },
    {
      program: "Foreign Trade Zone",
      eligibility: "Eligible",
      savings: "Duty deferral",
      requirements: "Use of authorized FTZ facility"
    },
    {
      program: "Duty Drawback",
      eligibility: "Eligible",
      savings: "Up to 99% of duties paid",
      requirements: "Re-export within 5 years with proper documentation"
    }
  ];

  // Exclusion information
  const exclusionInfo = {
    available: true,
    process: "Section 301 Exclusion Request",
    criteria: "Not available domestically, significant economic harm, strategic importance",
    timeline: "90-120 days for review",
    successRate: "~33% approval rate historically"
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h4 className="text-blue-700 font-semibold mb-2">Tariff Strategy Insight</h4>
        <p className="text-gray-700">
          Based on your product classification and origin, we recommend exploring the First Sale Rule 
          and Mexico assembly options to potentially reduce duties by up to 25%.
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>Basic Tariff</span>
          </TabsTrigger>
          <TabsTrigger value="hscode" className="flex items-center gap-2">
            <FileSearch className="h-4 w-4" />
            <span>HS Code</span>
          </TabsTrigger>
          <TabsTrigger value="countries" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>Country Comparison</span>
          </TabsTrigger>
          <TabsTrigger value="origin" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Rules of Origin</span>
          </TabsTrigger>
          <TabsTrigger value="engineering" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Tariff Engineering</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            <span>Special Programs</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Historical Trends</span>
          </TabsTrigger>
          <TabsTrigger value="exclusions" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Exclusions</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Tariff Rate Information */}
        <TabsContent value="basic">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Applicable Tariff Components</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Component</TableHead>
                      <TableHead>Rate</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tariffRates.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell>{item.rate.toFixed(2)}%</TableCell>
                        <TableCell>{item.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-lg">Total Effective Rate:</span>
                    <span className="font-bold text-xl text-blue-700">{totalRate.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferential Rate Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">USMCA Preferential Rate</h4>
                        <p className="text-sm text-gray-500">US-Mexico-Canada Agreement</p>
                      </div>
                      <Badge variant="outline" className="bg-orange-50">Not Applicable</Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Product doesn't meet North American origin requirements
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">US-China Phase One Agreement</h4>
                        <p className="text-sm text-gray-500">Limited tariff reductions</p>
                      </div>
                      <Badge variant="outline" className="bg-orange-50">Not Applicable</Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Electronics not covered under current exceptions
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">Third Country Routing</h4>
                        <p className="text-sm text-gray-500">Via Vietnam or Mexico</p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-800">Potential Savings</Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      Substantial transformation may qualify for lower rates
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* HS Code Analysis */}
        <TabsContent value="hscode">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current HS Classification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md mb-4">
                  <h3 className="text-lg font-bold">{hsCode}</h3>
                  <p className="text-sm text-gray-600 mt-1">Portable automatic data processing machines, weighing not more than 10 kg, consisting of at least a central processing unit, a keyboard and a display</p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Section:</span>
                      <span className="text-sm font-medium">XVI - Machinery and Mechanical Appliances</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Chapter:</span>
                      <span className="text-sm font-medium">84 - Nuclear Reactors, Boilers, Machinery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Heading:</span>
                      <span className="text-sm font-medium">8471 - Automatic Data Processing Machines</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Tariff Rate:</span>
                      <span className="text-sm font-bold">{totalRate.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alternative Classifications</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>HS Code</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alternativeHSCodes.map((item, index) => (
                      <TableRow key={index} className={index === 0 ? "bg-blue-50" : ""}>
                        <TableCell className="font-medium">{item.code}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.rate.toFixed(2)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h4 className="font-medium text-yellow-800">Classification Notes</h4>
                  <p className="text-sm mt-1">
                    Consider classification under parts (8473.30.5100) if imported disassembled or 
                    if the product could be marketed as components rather than a complete system.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Country Comparison Chart */}
        <TabsContent value="countries">
          <Card>
            <CardHeader>
              <CardTitle>Country Rate Comparison</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  rate: {
                    label: "Rate %",
                    color: "#8B5CF6"
                  }
                }}
              >
                <BarChart data={countryComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => [`${value}%`, "Tariff Rate"]}
                      />
                    }
                  />
                  <Legend />
                  <Bar dataKey="rate" name="Tariff Rate %" fill="var(--color-rate)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <div className="px-6 pb-6">
              <p className="text-sm text-gray-600">
                Shipping to Canada would yield the lowest tariff burden at 8.0%, a potential savings of 
                24.97% compared to the current US rate.
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Rules of Origin Assessment */}
        <TabsContent value="origin">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Origin Requirements Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {originRequirements.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.requirement}</TableCell>
                        <TableCell>{item.threshold}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === "Met" ? "default" : "destructive"}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <h4 className="font-medium">Current Origin Status</h4>
                  <p className="text-sm mt-1">
                    Product currently qualifies as Chinese origin. It does not meet the substantial 
                    transformation requirements for any preferential trade agreements.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Required Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Certificate of Origin</h4>
                      <Badge>Required</Badge>
                    </div>
                    <p className="text-sm mt-1">
                      Must be issued by manufacturer or exporter and include production details
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Manufacturing Records</h4>
                      <Badge>Required</Badge>
                    </div>
                    <p className="text-sm mt-1">
                      Bill of materials, assembly instructions, component sourcing details
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">Value Breakdown</h4>
                      <Badge>Required</Badge>
                    </div>
                    <p className="text-sm mt-1">
                      Document showing cost of materials by country of origin
                    </p>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800">Strategy Tip</h4>
                    <p className="text-sm mt-1">
                      Consider increasing regional value content through sourcing more components from 
                      Mexico to potentially qualify for USMCA preferential rates.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tariff Engineering Options */}
        <TabsContent value="engineering">
          <Card>
            <CardHeader>
              <CardTitle>Tariff Engineering Opportunities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {engineeringOptions.map((option, index) => (
                  <div key={index} className="p-4 border rounded-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{option.option}</h3>
                        <p className="text-gray-600 mt-1">{option.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-green-600 font-bold">{option.savings} potential savings</div>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 ${
                            option.complexity === 'Low' ? 'bg-green-50 text-green-800' : 
                            option.complexity === 'Medium' ? 'bg-yellow-50 text-yellow-800' :
                            'bg-red-50 text-red-800'
                          }`}
                        >
                          {option.complexity} complexity
                        </Badge>
                      </div>
                    </div>
                    
                    {index === 1 && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <h4 className="font-medium text-blue-800">Implementation Details</h4>
                        <p className="text-sm mt-1">
                          Relocating final assembly to Mexico would require establishing a manufacturing 
                          relationship with a Mexican facility, shipping components separately, and 
                          ensuring proper documentation to qualify for USMCA preferential treatment.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium">Cost-Benefit Analysis</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span>Implementation Costs:</span>
                      <span className="font-medium">$15,000 - $75,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Duty Savings:</span>
                      <span className="font-medium text-green-600">$37,500 - $125,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payback Period:</span>
                      <span className="font-medium">4-8 months</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Special Trade Programs */}
        <TabsContent value="programs">
          <div className="grid gap-6 md:grid-cols-2">
            {specialPrograms.map((program, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{program.program}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eligibility:</span>
                      <Badge
                        variant={program.eligibility === "Eligible" ? "default" : "secondary"}
                      >
                        {program.eligibility}
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Potential Savings:</span>
                      <div className="font-bold text-green-600 text-lg mt-1">{program.savings}</div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Requirements:</span>
                      <p className="mt-1">{program.requirements}</p>
                    </div>
                    
                    {index === 0 && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mt-4">
                        <h4 className="font-medium text-blue-800">Implementation Note</h4>
                        <p className="text-sm mt-1">
                          First Sale Rule requires two separate, bona fide sales with proper 
                          documentation of the manufacturer's sale price to the middleman.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Additional Program Considerations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">Bonded Warehouse</h4>
                    <div className="text-sm mt-1">
                      <p>Store goods without paying duties until they enter commerce</p>
                      <p className="text-green-600 mt-1">Duty deferral benefit</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">Temporary Importation Bond (TIB)</h4>
                    <div className="text-sm mt-1">
                      <p>Import for repair, testing or samples without paying duty</p>
                      <p className="text-green-600 mt-1">Full duty exemption possible</p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">Trusted Trader Programs</h4>
                    <div className="text-sm mt-1">
                      <p>CTPAT, AEO status for expedited processing</p>
                      <p className="text-green-600 mt-1">Reduced inspection rates</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Historical Trends */}
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Historical Tariff Rates & Projections</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  rate: {
                    label: "Rate %",
                    color: "#8B5CF6"
                  }
                }}
              >
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis domain={[0, 40]} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name, props) => {
                          const item = props.payload;
                          return [`${value}%${item.projected ? ' (Projected)' : ''}`, "Tariff Rate"];
                        }}
                      />
                    }
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name="Tariff Rate %" 
                    stroke="var(--color-rate)"
                    strokeWidth={2}
                    dot={{ r: 6 }}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
            <div className="p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Key Drivers of Change</h4>
                  <ul className="mt-2 text-sm space-y-1 list-disc pl-5">
                    <li>2018: Initial Section 301 tariffs implemented (25%)</li>
                    <li>2019: Additional tranche of products affected</li>
                    <li>2022: USMCA implementation complete</li>
                    <li>2025: Potential new tariff increases projected</li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">Future Outlook</h4>
                  <ul className="mt-2 text-sm space-y-1 list-disc pl-5">
                    <li>Continued high tariffs on Chinese electronics likely</li>
                    <li>Increased focus on critical supply chains and reshoring</li>
                    <li>Potential new trade agreements with Southeast Asian nations</li>
                    <li>Expanding technology export controls possible</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Exclusion Information */}
        <TabsContent value="exclusions">
          <Card>
            <CardHeader>
              <CardTitle>Tariff Exclusion Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">Exclusion Status</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between">
                        <span>Process Available:</span>
                        <Badge variant={exclusionInfo.available ? "default" : "secondary"}>
                          {exclusionInfo.available ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Process Type:</span>
                        <span className="font-medium">{exclusionInfo.process}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Review Timeline:</span>
                        <span className="font-medium">{exclusionInfo.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Historical Success Rate:</span>
                        <span className="font-medium">{exclusionInfo.successRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md mt-6">
                    <h3 className="text-lg font-medium">Application Criteria</h3>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                      {exclusionInfo.criteria.split(", ").map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
                    <h4 className="font-medium text-blue-800">Strategic Recommendation</h4>
                    <p className="mt-2">
                      Based on your product specifications and market conditions, an exclusion request 
                      has moderate potential for success. Focus on demonstrating limited US manufacturing 
                      alternatives and specific economic impact to strengthen your case.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">Application Process</h3>
                    <ol className="mt-3 space-y-3 list-decimal pl-5">
                      <li>
                        <div className="font-medium">Prepare Documentation</div>
                        <p className="text-sm text-gray-600">
                          Gather product specifications, import data, and business impact analysis
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">Submit via USTR Portal</div>
                        <p className="text-sm text-gray-600">
                          Complete online application with all supporting documentation
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">Public Comment Period</div>
                        <p className="text-sm text-gray-600">
                          30-day period for interested parties to support or oppose
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">USTR Review</div>
                        <p className="text-sm text-gray-600">
                          Evaluation based on availability, economic impact, and strategic importance
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">Determination</div>
                        <p className="text-sm text-gray-600">
                          Decision published in Federal Register with effective dates if granted
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">Documentation Required</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">1</span>
                        </div>
                        <div>
                          <div className="font-medium">Product Description & HTS Code</div>
                          <p className="text-sm text-gray-600">Detailed technical specifications</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">2</span>
                        </div>
                        <div>
                          <div className="font-medium">Economic Impact Analysis</div>
                          <p className="text-sm text-gray-600">Demonstrating financial harm from tariffs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">3</span>
                        </div>
                        <div>
                          <div className="font-medium">Sourcing Analysis</div>
                          <p className="text-sm text-gray-600">Proof of inability to source from non-China origins</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">4</span>
                        </div>
                        <div>
                          <div className="font-medium">Import Data</div>
                          <p className="text-sm text-gray-600">Historical import volumes and values</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TariffAnalysis;
