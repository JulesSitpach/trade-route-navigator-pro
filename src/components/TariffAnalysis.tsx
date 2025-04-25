
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
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
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t, language } = useLanguage();

  // Dummy data for visualization purposes
  const origin = getCountryByCode(originCountry);
  const destination = getCountryByCode(destinationCountry);
  
  const tariffRates = [
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
  ];
  
  // Total effective rate
  const totalRate = tariffRates.reduce((sum, item) => sum + item.rate, 0);

  // Country comparison data - translate country names if in Spanish
  const countryComparisonData = [
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
  ];

  // Alternative HS codes
  const alternativeHSCodes = [
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
  ];

  // Tariff engineering options
  const engineeringOptions = [
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
  ];

  // Special programs
  const specialPrograms = [
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
  ];

  // Exclusion information
  const exclusionInfo = {
    available: true,
    process: language === 'en' ? "Section 301 Exclusion Request" : "Solicitud de Exclusión Sección 301",
    criteria: language === 'en' ? "Not available domestically, significant economic harm, strategic importance" : "No disponible nacionalmente, daño económico significativo, importancia estratégica",
    timeline: language === 'en' ? "90-120 days for review" : "90-120 días para revisión",
    successRate: language === 'en' ? "~33% approval rate historically" : "~33% tasa de aprobación histórica"
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h4 className="text-blue-700 font-semibold mb-2">
          {language === 'en' ? "Tariff Strategy Insight" : "Información Estratégica de Aranceles"}
        </h4>
        <p className="text-gray-700">
          {language === 'en' 
            ? "Based on your product classification and origin, we recommend exploring the First Sale Rule and Mexico assembly options to potentially reduce duties by up to 25%."
            : "Según la clasificación y origen de su producto, recomendamos explorar la Regla de Primera Venta y opciones de ensamblaje en México para potencialmente reducir aranceles hasta un 25%."}
        </p>
      </div>

      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="w-full">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>{t('tariff.basic')}</span>
          </TabsTrigger>
          <TabsTrigger value="hscode" className="flex items-center gap-2">
            <FileSearch className="h-4 w-4" />
            <span>{t('tariff.hscode')}</span>
          </TabsTrigger>
          <TabsTrigger value="countries" className="flex items-center gap-2">
            <Flag className="h-4 w-4" />
            <span>{t('tariff.countryComparison')}</span>
          </TabsTrigger>
          <TabsTrigger value="origin" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>{t('tariff.rulesOfOrigin')}</span>
          </TabsTrigger>
          <TabsTrigger value="engineering" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>{t('tariff.engineering')}</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            <span>{t('tariff.specialPrograms')}</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>{t('tariff.historicalTrends')}</span>
          </TabsTrigger>
          <TabsTrigger value="exclusions" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>{t('tariff.exclusionBreakdown')}</span>
          </TabsTrigger>
        </TabsList>

        {/* Basic Tariff Rate Information */}
        <TabsContent value="basic">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Applicable Tariff Components" : "Componentes Arancelarios Aplicables"}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'en' ? "Component" : "Componente"}</TableHead>
                      <TableHead>{language === 'en' ? "Rate" : "Tasa"}</TableHead>
                      <TableHead>{language === 'en' ? "Description" : "Descripción"}</TableHead>
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
                    <span className="font-semibold text-lg">
                      {language === 'en' ? "Total Effective Rate:" : "Tasa Efectiva Total:"}
                    </span>
                    <span className="font-bold text-xl text-blue-700">{totalRate.toFixed(2)}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Preferential Rate Options" : "Opciones de Tasas Preferenciales"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{language === 'en' ? "USMCA Preferential Rate" : "Tasa Preferencial T-MEC"}</h4>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? "US-Mexico-Canada Agreement" : "Tratado México-Estados Unidos-Canadá"}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-orange-50">
                        {language === 'en' ? "Not Applicable" : "No Aplicable"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      {language === 'en' 
                        ? "Product doesn't meet North American origin requirements"
                        : "El producto no cumple con los requisitos de origen norteamericano"}
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? "US-China Phase One Agreement" : "Acuerdo Fase Uno EE.UU.-China"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? "Limited tariff reductions" : "Reducciones arancelarias limitadas"}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-orange-50">
                        {language === 'en' ? "Not Applicable" : "No Aplicable"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      {language === 'en'
                        ? "Electronics not covered under current exceptions"
                        : "Electrónicos no cubiertos bajo excepciones actuales"}
                    </p>
                  </div>

                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">
                          {language === 'en' ? "Third Country Routing" : "Ruta por Tercer País"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {language === 'en' ? "Via Vietnam or Mexico" : "Vía Vietnam o México"}
                        </p>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-800">
                        {language === 'en' ? "Potential Savings" : "Ahorros Potenciales"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm">
                      {language === 'en'
                        ? "Substantial transformation may qualify for lower rates"
                        : "La transformación sustancial puede calificar para tasas más bajas"}
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
                <CardTitle>{language === 'en' ? "Current HS Classification" : "Clasificación HS Actual"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-md mb-4">
                  <h3 className="text-lg font-bold">{hsCode}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {language === 'en'
                      ? "Portable automatic data processing machines, weighing not more than 10 kg, consisting of at least a central processing unit, a keyboard and a display"
                      : "Máquinas automáticas para procesamiento de datos, portátiles, de peso inferior a 10 kg, que consten al menos de una unidad central de proceso, un teclado y una pantalla"}
                  </p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{language === 'en' ? "Section:" : "Sección:"}</span>
                      <span className="text-sm font-medium">
                        {language === 'en'
                          ? "XVI - Machinery and Mechanical Appliances"
                          : "XVI - Maquinaria y Aparatos Mecánicos"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{language === 'en' ? "Chapter:" : "Capítulo:"}</span>
                      <span className="text-sm font-medium">
                        {language === 'en'
                          ? "84 - Nuclear Reactors, Boilers, Machinery"
                          : "84 - Reactores Nucleares, Calderas, Maquinaria"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{language === 'en' ? "Heading:" : "Partida:"}</span>
                      <span className="text-sm font-medium">
                        {language === 'en'
                          ? "8471 - Automatic Data Processing Machines"
                          : "8471 - Máquinas Automáticas para Procesamiento de Datos"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{language === 'en' ? "Tariff Rate:" : "Tasa Arancelaria:"}</span>
                      <span className="text-sm font-bold">{totalRate.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Alternative Classifications" : "Clasificaciones Alternativas"}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'en' ? "HS Code" : "Código HS"}</TableHead>
                      <TableHead>{language === 'en' ? "Description" : "Descripción"}</TableHead>
                      <TableHead>{language === 'en' ? "Rate" : "Tasa"}</TableHead>
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
                  <h4 className="font-medium text-yellow-800">
                    {language === 'en' ? "Classification Notes" : "Notas de Clasificación"}
                  </h4>
                  <p className="text-sm mt-1">
                    {language === 'en'
                      ? "Consider classification under parts (8473.30.5100) if imported disassembled or if the product could be marketed as components rather than a complete system."
                      : "Considere clasificación bajo partes (8473.30.5100) si se importa desmontado o si el producto podría comercializarse como componentes en lugar de un sistema completo."}
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
              <CardTitle>{language === 'en' ? "Country Rate Comparison" : "Comparación de Tasas por País"}</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  rate: {
                    label: language === 'en' ? "Rate %" : "Tasa %",
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
                        formatter={(value) => [`${value}%`, language === 'en' ? "Tariff Rate" : "Tasa Arancelaria"]}
                      />
                    }
                  />
                  <Legend />
                  <Bar dataKey="rate" name={language === 'en' ? "Tariff Rate %" : "Tasa Arancelaria %"} fill="var(--color-rate)" />
                </BarChart>
              </ChartContainer>
            </CardContent>
            <div className="px-6 pb-6">
              <p className="text-sm text-gray-600">
                {language === 'en'
                  ? "Shipping to Canada would yield the lowest tariff burden at 8.0%, a potential savings of 24.97% compared to the current US rate."
                  : "Enviar a Canadá resultaría en la menor carga arancelaria al 8.0%, un ahorro potencial del 24.97% comparado con la tasa actual de EE.UU."}
              </p>
            </div>
          </Card>
        </TabsContent>

        {/* Rules of Origin Assessment */}
        <TabsContent value="origin">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Origin Requirements Assessment" : "Evaluación de Requisitos de Origen"}</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{language === 'en' ? "Requirement" : "Requisito"}</TableHead>
                      <TableHead>{language === 'en' ? "Threshold" : "Umbral"}</TableHead>
                      <TableHead>{language === 'en' ? "Status" : "Estado"}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {originRequirements.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.requirement}</TableCell>
                        <TableCell>{item.threshold}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={item.status === (language === 'en' ? "Met" : "Cumplido") ? "default" : "destructive"}
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <h4 className="font-medium">{language === 'en' ? "Current Origin Status" : "Estado de Origen Actual"}</h4>
                  <p className="text-sm mt-1">
                    {language === 'en'
                      ? "Product currently qualifies as Chinese origin. It does not meet the substantial transformation requirements for any preferential trade agreements."
                      : "El producto actualmente califica como de origen chino. No cumple con los requisitos de transformación sustancial para ningún acuerdo comercial preferencial."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{language === 'en' ? "Required Documentation" : "Documentación Requerida"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{language === 'en' ? "Certificate of Origin" : "Certificado de Origen"}</h4>
                      <Badge>{language === 'en' ? "Required" : "Requerido"}</Badge>
                    </div>
                    <p className="text-sm mt-1">
                      {language === 'en'
                        ? "Must be issued by manufacturer or exporter and include production details"
                        : "Debe ser emitido por el fabricante o exportador e incluir detalles de producción"}
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{language === 'en' ? "Manufacturing Records" : "Registros de Fabricación"}</h4>
                      <Badge>{language === 'en' ? "Required" : "Requerido"}</Badge>
                    </div>
                    <p className="text-sm mt-1">
                      {language === 'en'
                        ? "Bill of materials, assembly instructions, component sourcing details"
                        : "Lista de materiales, instrucciones de ensamblaje, detalles de origen de componentes"}
                    </p>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{language === 'en' ? "Value Breakdown" : "Desglose de Valor"}</h4>
                      <Badge>{language === 'en' ? "Required" : "Requerido"}</Badge>
                    </div>
                    <p className="text-sm mt-1">
                      {language === 'en'
                        ? "Document showing cost of materials by country of origin"
                        : "Documento que muestre el costo de materiales por país de origen"}
                    </p>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800">{language === 'en' ? "Strategy Tip" : "Consejo Estratégico"}</h4>
                    <p className="text-sm mt-1">
                      {language === 'en'
                        ? "Consider increasing regional value content through sourcing more components from Mexico to potentially qualify for USMCA preferential rates."
                        : "Considere aumentar el contenido de valor regional mediante la adquisición de más componentes de México para potencialmente calificar para tasas preferenciales T-MEC."}
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
              <CardTitle>{language === 'en' ? "Tariff Engineering Opportunities" : "Oportunidades de Ingeniería Arancelaria"}</CardTitle>
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
                        <div className="text-green-600 font-bold">
                          {option.savings} {language === 'en' ? "potential savings" : "ahorros potenciales"}
                        </div>
                        <Badge 
                          variant="outline" 
                          className={`mt-1 ${
                            option.complexity === (language === 'en' ? 'Low' : 'Baja') ? 'bg-green-50 text-green-800' : 
                            option.complexity === (language === 'en' ? 'Medium' : 'Media') ? 'bg-yellow-50 text-yellow-800' :
                            'bg-red-50 text-red-800'
                          }`}
                        >
                          {language === 'en' 
                            ? `${option.complexity} complexity` 
                            : `complejidad ${option.complexity}`}
                        </Badge>
                      </div>
                    </div>
                    
                    {index === 1 && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                        <h4 className="font-medium text-blue-800">{language === 'en' ? "Implementation Details" : "Detalles de Implementación"}</h4>
                        <p className="text-sm mt-1">
                          {language === 'en'
                            ? "Relocating final assembly to Mexico would require establishing a manufacturing relationship with a Mexican facility, shipping components separately, and ensuring proper documentation to qualify for USMCA preferential treatment."
                            : "Reubicar el ensamblaje final a México requeriría establecer una relación de fabricación con una instalación mexicana, enviar componentes por separado y asegurar la documentación adecuada para calificar para el trato preferencial T-MEC."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium">{language === 'en' ? "Cost-Benefit Analysis" : "Análisis Costo-Beneficio"}</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between">
                      <span>{language === 'en' ? "Implementation Costs:" : "Costos de Implementación:"}</span>
                      <span className="font-medium">$15,000 - $75,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? "Annual Duty Savings:" : "Ahorro Anual en Aranceles:"}</span>
                      <span className="font-medium text-green-600">$37,500 - $125,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{language === 'en' ? "Payback Period:" : "Período de Recuperación:"}</span>
                      <span className="font-medium">{language === 'en' ? "4-8 months" : "4-8 meses"}</span>
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
                      <span className="text-gray-600">{language === 'en' ? "Eligibility:" : "Elegibilidad:"}</span>
                      <Badge
                        variant={program.eligibility === (language === 'en' ? "Eligible" : "Elegible") ? "default" : "secondary"}
                      >
                        {program.eligibility}
                      </Badge>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">{language === 'en' ? "Potential Savings:" : "Ahorros Potenciales:"}</span>
                      <div className="font-bold text-green-600 text-lg mt-1">{program.savings}</div>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">{language === 'en' ? "Requirements:" : "Requisitos:"}</span>
                      <p className="mt-1">{program.requirements}</p>
                    </div>
                    
                    {index === 0 && (
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mt-4">
                        <h4 className="font-medium text-blue-800">{language === 'en' ? "Implementation Note" : "Nota de Implementación"}</h4>
                        <p className="text-sm mt-1">
                          {language === 'en'
                            ? "First Sale Rule requires two separate, bona fide sales with proper documentation of the manufacturer's sale price to the middleman."
                            : "La Regla de Primera Venta requiere dos ventas separadas y de buena fe con documentación adecuada del precio de venta del fabricante al intermediario."}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>{language === 'en' ? "Additional Program Considerations" : "Consideraciones Adicionales de Programas"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">{language === 'en' ? "Bonded Warehouse" : "Almacén Afianzado"}</h4>
                    <div className="text-sm mt-1">
                      <p>{language === 'en' 
                        ? "Store goods without paying duties until they enter commerce" 
                        : "Almacenar mercancías sin pagar aranceles hasta que entren al comercio"}
                      </p>
                      <p className="text-green-600 mt-1">
                        {language === 'en' ? "Duty deferral benefit" : "Beneficio de aplazamiento arancelario"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">{language === 'en' ? "Temporary Importation Bond (TIB)" : "Fianza de Importación Temporal (TIB)"}</h4>
                    <div className="text-sm mt-1">
                      <p>{language === 'en'
                        ? "Import for repair, testing or samples without paying duty"
                        : "Importar para reparación, pruebas o muestras sin pagar aranceles"}
                      </p>
                      <p className="text-green-600 mt-1">
                        {language === 'en' ? "Full duty exemption possible" : "Exención total de aranceles posible"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="p-3 border rounded-md">
                    <h4 className="font-medium">{language === 'en' ? "Trusted Trader Programs" : "Programas de Comerciante Confiable"}</h4>
                    <div className="text-sm mt-1">
                      <p>{language === 'en'
                        ? "CTPAT, AEO status for expedited processing"
                        : "Estado CTPAT, OEA para procesamiento acelerado"}
                      </p>
                      <p className="text-green-600 mt-1">
                        {language === 'en' ? "Reduced inspection rates" : "Tasas de inspección reducidas"}
                      </p>
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
              <CardTitle>{language === 'en' ? "Historical Tariff Rates & Projections" : "Tasas Arancelarias Históricas y Proyecciones"}</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ChartContainer
                config={{
                  rate: {
                    label: language === 'en' ? "Rate %" : "Tasa %",
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
                          return [
                            `${value}%${item.projected ? (language === 'en' ? ' (Projected)' : ' (Proyectado)') : ''}`, 
                            language === 'en' ? "Tariff Rate" : "Tasa Arancelaria"
                          ];
                        }}
                      />
                    }
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    name={language === 'en' ? "Tariff Rate %" : "Tasa Arancelaria %"}
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
                  <h4 className="font-medium">{language === 'en' ? "Key Drivers of Change" : "Factores Clave de Cambio"}</h4>
                  <ul className="mt-2 text-sm space-y-1 list-disc pl-5">
                    <li>
                      {language === 'en'
                        ? "2018: Initial Section 301 tariffs implemented (25%)"
                        : "2018: Aranceles iniciales de Sección 301 implementados (25%)"}
                    </li>
                    <li>
                      {language === 'en'
                        ? "2019: Additional tranche of products affected"
                        : "2019: Tramo adicional de productos afectados"}
                    </li>
                    <li>
                      {language === 'en'
                        ? "2022: USMCA implementation complete"
                        : "2022: Implementación del T-MEC completa"}
                    </li>
                    <li>
                      {language === 'en'
                        ? "2025: Potential new tariff increases projected"
                        : "2025: Potenciales nuevos aumentos arancelarios proyectados"}
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="font-medium">{language === 'en' ? "Future Outlook" : "Perspectiva Futura"}</h4>
                  <ul className="mt-2 text-sm space-y-1 list-disc pl-5">
                    <li>
                      {language === 'en'
                        ? "Continued high tariffs on Chinese electronics likely"
                        : "Probable continuidad de altos aranceles en electrónicos chinos"}
                    </li>
                    <li>
                      {language === 'en'
                        ? "Increased focus on critical supply chains and reshoring"
                        : "Mayor enfoque en cadenas de suministro críticas y relocalización"}
                    </li>
                    <li>
                      {language === 'en'
                        ? "Potential new trade agreements with Southeast Asian nations"
                        : "Posibles nuevos acuerdos comerciales con naciones del sudeste asiático"}
                    </li>
                    <li>
                      {language === 'en'
                        ? "Expanding technology export controls possible"
                        : "Posible expansión de controles de exportación de tecnología"}
                    </li>
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
              <CardTitle>{language === 'en' ? "Tariff Exclusion Process" : "Proceso de Exclusión Arancelaria"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">{language === 'en' ? "Exclusion Status" : "Estado de Exclusión"}</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between">
                        <span>{language === 'en' ? "Process Available:" : "Proceso Disponible:"}</span>
                        <Badge variant={exclusionInfo.available ? "default" : "secondary"}>
                          {language === 'en' ? (exclusionInfo.available ? "Yes" : "No") : (exclusionInfo.available ? "Sí" : "No")}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'en' ? "Process Type:" : "Tipo de Proceso:"}</span>
                        <span className="font-medium">{exclusionInfo.process}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'en' ? "Review Timeline:" : "Cronograma de Revisión:"}</span>
                        <span className="font-medium">{exclusionInfo.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'en' ? "Historical Success Rate:" : "Tasa de Éxito Histórica:"}</span>
                        <span className="font-medium">{exclusionInfo.successRate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-md mt-6">
                    <h3 className="text-lg font-medium">{language === 'en' ? "Application Criteria" : "Criterios de Solicitud"}</h3>
                    <ul className="mt-2 space-y-1 list-disc pl-5">
                      {exclusionInfo.criteria.split(", ").map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mt-6">
                    <h4 className="font-medium text-blue-800">{language === 'en' ? "Strategic Recommendation" : "Recomendación Estratégica"}</h4>
                    <p className="mt-2">
                      {language === 'en'
                        ? "Based on your product specifications and market conditions, an exclusion request has moderate potential for success. Focus on demonstrating limited US manufacturing alternatives and specific economic impact to strengthen your case."
                        : "Basado en las especificaciones de su producto y las condiciones del mercado, una solicitud de exclusión tiene un potencial moderado de éxito. Enfóquese en demostrar alternativas limitadas de fabricación en EE.UU. e impacto económico específico para fortalecer su caso."}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">{language === 'en' ? "Application Process" : "Proceso de Solicitud"}</h3>
                    <ol className="mt-3 space-y-3 list-decimal pl-5">
                      <li>
                        <div className="font-medium">{language === 'en' ? "Prepare Documentation" : "Preparar Documentación"}</div>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? "Gather product specifications, import data, and business impact analysis"
                            : "Recopilar especificaciones del producto, datos de importación y análisis de impacto empresarial"}
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">{language === 'en' ? "Submit via USTR Portal" : "Enviar a través del Portal USTR"}</div>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? "Complete online application with all supporting documentation"
                            : "Completar solicitud en línea con toda la documentación de respaldo"}
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">{language === 'en' ? "Public Comment Period" : "Período de Comentarios Públicos"}</div>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? "30-day period for interested parties to support or oppose"
                            : "Período de 30 días para que partes interesadas apoyen u opongan"}
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">{language === 'en' ? "USTR Review" : "Revisión de USTR"}</div>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? "Evaluation based on availability, economic impact, and strategic importance"
                            : "Evaluación basada en disponibilidad, impacto económico e importancia estratégica"}
                        </p>
                      </li>
                      <li>
                        <div className="font-medium">{language === 'en' ? "Determination" : "Determinación"}</div>
                        <p className="text-sm text-gray-600">
                          {language === 'en'
                            ? "Decision published in Federal Register with effective dates if granted"
                            : "Decisión publicada en el Registro Federal con fechas efectivas si se concede"}
                        </p>
                      </li>
                    </ol>
                  </div>

                  <div className="p-4 border rounded-md">
                    <h3 className="text-lg font-medium">{language === 'en' ? "Documentation Required" : "Documentación Requerida"}</h3>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">1</span>
                        </div>
                        <div>
                          <div className="font-medium">{language === 'en' ? "Product Description & HTS Code" : "Descripción del Producto y Código HTS"}</div>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? "Detailed technical specifications" : "Especificaciones técnicas detalladas"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">2</span>
                        </div>
                        <div>
                          <div className="font-medium">{language === 'en' ? "Economic Impact Analysis" : "Análisis de Impacto Económico"}</div>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? "Demonstrating financial harm from tariffs" : "Demostrar daño financiero por aranceles"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">3</span>
                        </div>
                        <div>
                          <div className="font-medium">{language === 'en' ? "Sourcing Analysis" : "Análisis de Abastecimiento"}</div>
                          <p className="text-sm text-gray-600">
                            {language === 'en' 
                              ? "Proof of inability to source from non-China origins" 
                              : "Prueba de incapacidad para abastecerse de orígenes no chinos"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-xs font-bold text-blue-700">4</span>
                        </div>
                        <div>
                          <div className="font-medium">{language === 'en' ? "Import Data" : "Datos de Importación"}</div>
                          <p className="text-sm text-gray-600">
                            {language === 'en' ? "Historical import volumes and values" : "Volúmenes y valores históricos de importación"}
                          </p>
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

