
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // General
    'title': 'Global Trade Strategy Navigator',
    'subtitle': 'Diversify your trade routes, strengthen your business future',
    
    // Product Details Form
    'product.details': 'Product Details',
    'product.description': 'Product Description',
    'product.description.placeholder': 'Enter product description',
    'product.category': 'Product Category',
    'product.category.placeholder': 'Select product category',
    'product.value': 'Product Value',
    'product.value.placeholder': 'Enter product value',
    'product.origin': 'Origin Country',
    'product.destination': 'Destination Country',
    'product.hscode': 'HS Code',
    
    // Shipping Details Form
    'shipping.details': 'Shipping Details',
    'shipping.quantity': 'Quantity',
    'shipping.quantity.placeholder': 'Enter quantity',
    'shipping.mode': 'Transport Mode',
    'shipping.mode.placeholder': 'Select transport mode',
    'shipping.type': 'Shipment Type',
    'shipping.type.placeholder': 'Select shipment type',
    'shipping.package': 'Package Type',
    'shipping.package.placeholder': 'Select package type',
    'shipping.dangerous': 'Dangerous Goods',
    'shipping.weight': 'Weight (kg)',
    'shipping.dimensions': 'Dimensions (cm)',
    'shipping.length': 'Length',
    'shipping.width': 'Width',
    'shipping.height': 'Height',
    'shipping.requirements': 'Special Requirements',
    
    // Analysis Sections
    'button.calculate': 'Calculate Trade Analysis',
    'analysis.title': 'Trade Analysis Results',
    'analysis.costs': 'Cost Breakdown',
    'analysis.routes': 'Alternative Routes',
    'analysis.tariffs': 'Tariff Analysis',
    'analysis.regulations': 'Regulations',
    'analysis.visualizations': 'Visualizations',
    'analysis.visualizations.description': 'Visual representation of your trade data',
    
    // Tabs and Navigation
    'tab.costs': 'Cost Breakdown',
    'tab.routes': 'Routes Timeline',
    'tab.tariffs': 'Tariff Heatmap',
    'tab.seasonality': 'Seasonality',
    'tab.risks': 'Risk Matrix',
    'tab.supply': 'Supply Chain',
    'tab.compliance': 'Compliance',
    
    // Transport Modes
    'transport.ocean': 'Ocean',
    'transport.air': 'Air',
    'transport.road': 'Road',
    'transport.rail': 'Rail',
    'transport.multimodal': 'Multimodal',
    
    // Shipment Types
    'shipment.fcl': 'Full Container Load (FCL)',
    'shipment.lcl': 'Less than Container Load (LCL)',
    'shipment.bulk': 'Bulk Cargo',
    'shipment.breakbulk': 'Break Bulk',
    'shipment.roro': 'Roll-on/Roll-off',
    
    // Package Types
    'package.boxes': 'Boxes',
    'package.pallets': 'Pallets',
    'package.drums': 'Drums',
    'package.bags': 'Bags',
    'package.crates': 'Crates',
    
    // Validation Messages
    'validation.required': 'This field is required',
    
    // Notes and Helpers
    'note.required': 'Required field',
    'note.optional': 'Optional',
    
    // Tariff Analysis
    'tariff.basic': 'Basic Tariff',
    'tariff.hscode': 'HS Code',
    'tariff.countryComparison': 'Country Comparison',
    'tariff.rulesOfOrigin': 'Rules of Origin',
    'tariff.engineering': 'Tariff Engineering',
    'tariff.specialPrograms': 'Special Programs',
    'tariff.historicalTrends': 'Historical Trends',
    'tariff.exclusionBreakdown': 'Exclusion Breakdown',
    
    // Alternative Routes
    'routes.title': 'Alternative Routes and Transportation Methods',
    'routes.description': 'Strategic shipping options tailored for small and medium-sized businesses to optimize costs, timeline, and market opportunities.',
    
    // Regulations
    'regulations.documents': 'Required Documents',
    'regulations.timeline': 'Regulatory Timeline',
    'regulations.requirements': 'Country Requirements',
    'regulations.productRegs': 'Product Regulations',
    'regulations.permits': 'Permit Guidance',
    'regulations.updates': 'Regulatory Updates',
    'regulations.compliance': 'Compliance Cost Summary',
    'regulations.resources': 'Helpful Resources',
    
    // Strategy Recommendations
    'strategy.recommended': 'Recommended Strategy',
    
    // Misc
    'yes': 'Yes',
    'no': 'No',
    'missing.fields': 'Missing Required Fields',
    'missing.fields.description': 'Please fill in all mandatory fields:',
    'analysis.generated': 'Analysis Generated',
    'analysis.generated.description': 'Your trade analysis has been calculated successfully.',
  },
  es: {
    // General
    'title': 'Navegador de Estrategia Comercial Global',
    'subtitle': 'Diversifica tus rutas comerciales, fortalece el futuro de tu negocio',
    
    // Product Details Form
    'product.details': 'Detalles del Producto',
    'product.description': 'Descripción del Producto',
    'product.description.placeholder': 'Ingrese descripción del producto',
    'product.category': 'Categoría del Producto',
    'product.category.placeholder': 'Seleccione categoría',
    'product.value': 'Valor del Producto',
    'product.value.placeholder': 'Ingrese valor del producto',
    'product.origin': 'País de Origen',
    'product.destination': 'País de Destino',
    'product.hscode': 'Código HS',
    
    // Shipping Details Form
    'shipping.details': 'Detalles de Envío',
    'shipping.quantity': 'Cantidad',
    'shipping.quantity.placeholder': 'Ingrese cantidad',
    'shipping.mode': 'Modo de Transporte',
    'shipping.mode.placeholder': 'Seleccione modo de transporte',
    'shipping.type': 'Tipo de Envío',
    'shipping.type.placeholder': 'Seleccione tipo de envío',
    'shipping.package': 'Tipo de Embalaje',
    'shipping.package.placeholder': 'Seleccione tipo de embalaje',
    'shipping.dangerous': 'Mercancías Peligrosas',
    'shipping.weight': 'Peso (kg)',
    'shipping.dimensions': 'Dimensiones (cm)',
    'shipping.length': 'Largo',
    'shipping.width': 'Ancho',
    'shipping.height': 'Alto',
    'shipping.requirements': 'Requisitos Especiales',
    
    // Analysis Sections
    'button.calculate': 'Calcular Análisis Comercial',
    'analysis.title': 'Resultados del Análisis Comercial',
    'analysis.costs': 'Desglose de Costos',
    'analysis.routes': 'Rutas Alternativas',
    'analysis.tariffs': 'Análisis de Aranceles',
    'analysis.regulations': 'Regulaciones',
    'analysis.visualizations': 'Visualizaciones',
    'analysis.visualizations.description': 'Representación visual de sus datos comerciales',
    
    // Tabs and Navigation
    'tab.costs': 'Desglose de Costos',
    'tab.routes': 'Línea de Tiempo de Rutas',
    'tab.tariffs': 'Mapa de Calor de Aranceles',
    'tab.seasonality': 'Estacionalidad',
    'tab.risks': 'Matriz de Riesgos',
    'tab.supply': 'Cadena de Suministro',
    'tab.compliance': 'Cumplimiento',
    
    // Transport Modes
    'transport.ocean': 'Marítimo',
    'transport.air': 'Aéreo',
    'transport.road': 'Terrestre',
    'transport.rail': 'Ferroviario',
    'transport.multimodal': 'Multimodal',
    
    // Shipment Types
    'shipment.fcl': 'Contenedor Completo (FCL)',
    'shipment.lcl': 'Contenedor Parcial (LCL)',
    'shipment.bulk': 'Carga a Granel',
    'shipment.breakbulk': 'Carga Fraccionada',
    'shipment.roro': 'Roll-on/Roll-off',
    
    // Package Types
    'package.boxes': 'Cajas',
    'package.pallets': 'Pallets',
    'package.drums': 'Tambores',
    'package.bags': 'Bolsas',
    'package.crates': 'Cajones',
    
    // Validation Messages
    'validation.required': 'Este campo es obligatorio',
    
    // Notes and Helpers
    'note.required': 'Campo obligatorio',
    'note.optional': 'Opcional',
    
    // Tariff Analysis
    'tariff.basic': 'Arancel Básico',
    'tariff.hscode': 'Código HS',
    'tariff.countryComparison': 'Comparación de Países',
    'tariff.rulesOfOrigin': 'Reglas de Origen',
    'tariff.engineering': 'Ingeniería Arancelaria',
    'tariff.specialPrograms': 'Programas Especiales',
    'tariff.historicalTrends': 'Tendencias Históricas',
    'tariff.exclusionBreakdown': 'Desglose de Exclusiones',
    
    // Alternative Routes
    'routes.title': 'Rutas Alternativas y Métodos de Transporte',
    'routes.description': 'Opciones de envío estratégicas adaptadas para pequeñas y medianas empresas para optimizar costos, plazos y oportunidades de mercado.',
    
    // Regulations
    'regulations.documents': 'Documentos Requeridos',
    'regulations.timeline': 'Cronograma Regulatorio',
    'regulations.requirements': 'Requisitos por País',
    'regulations.productRegs': 'Regulaciones del Producto',
    'regulations.permits': 'Guía de Permisos',
    'regulations.updates': 'Actualizaciones Regulatorias',
    'regulations.compliance': 'Resumen de Costos de Cumplimiento',
    'regulations.resources': 'Recursos Útiles',
    
    // Strategy Recommendations
    'strategy.recommended': 'Estrategia Recomendada',
    
    // Misc
    'yes': 'Sí',
    'no': 'No',
    'missing.fields': 'Faltan Campos Obligatorios',
    'missing.fields.description': 'Por favor complete todos los campos obligatorios:',
    'analysis.generated': 'Análisis Generado',
    'analysis.generated.description': 'Su análisis comercial ha sido calculado exitosamente.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
