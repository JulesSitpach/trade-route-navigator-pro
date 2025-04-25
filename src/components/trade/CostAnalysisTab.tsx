import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CostItem } from "./shared/CostItem";
import { useState, useEffect } from "react";
import { requiredDocuments } from "./data";
import { generateCostItems, calculateTotalCost } from "./data/costData";
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from "./data/utils/formatters";

interface CostAnalysisTabProps {
  data: {
    product: {
      productValue: string;
      productCategory: string;
      originCountry: string;
      destinationCountry: string;
    };
    shipping: {
      quantity: string;
      transportMode: string;
      weight: string;
    };
  };
}

const CostAnalysisTab = ({ data }: CostAnalysisTabProps) => {
  const { t, language } = useLanguage();
  const [costItems, setCostItems] = useState(generateCostItems({ productValue: 0 }));
  const [totalLandedCost, setTotalLandedCost] = useState("$0.00");
  const [recommendedStrategy, setRecommendedStrategy] = useState<string | null>(null);

  useEffect(() => {
    if (data?.product?.productValue) {
      const productValue = parseFloat(data.product.productValue) || 0;
      
      // Generate cost items based on product value and shipping details
      const items = generateCostItems({
        productValue,
        originCountry: data.product.originCountry,
        destinationCountry: data.product.destinationCountry,
        productCategory: data.product.productCategory,
        shippingData: {
          quantity: data.shipping.quantity,
          weight: data.shipping.weight,
          transportMode: data.shipping.transportMode
        }
      });
      
      setCostItems(items);

      // Calculate total landed cost (excluding the product value itself)
      const total = calculateTotalCost(items);
      setTotalLandedCost(formatCurrency(total));

      // Generate recommendation based on inputs
      const totalValue = productValue * (parseInt(data.shipping.quantity) || 1);
      if (data.shipping.transportMode === 'air') {
        if (language === 'en') {
          setRecommendedStrategy(
            `Based on your choice of air freight, consider consolidating shipments to optimize costs. Current estimated savings potential: ${formatSavingsEstimate(totalValue, 'air')}`
          );
        } else {
          setRecommendedStrategy(
            `Basado en su elección de carga aérea, considere consolidar envíos para optimizar costos. Ahorro potencial estimado actual: ${formatSavingsEstimate(totalValue, 'air')}`
          );
        }
      } else if (totalValue > 50000) {
        if (language === 'en') {
          setRecommendedStrategy(
            `For your high-value shipment from ${data.product.originCountry} to ${data.product.destinationCountry}, we recommend dedicated freight service with premium insurance coverage.`
          );
        } else {
          setRecommendedStrategy(
            `Para su envío de alto valor desde ${data.product.originCountry} hasta ${data.product.destinationCountry}, recomendamos un servicio de carga dedicado con cobertura de seguro premium.`
          );
        }
      } else {
        if (language === 'en') {
          setRecommendedStrategy(
            `For this ${data.product.productCategory} shipment, we recommend ${data.shipping.transportMode} freight via standard shipping lanes to optimize costs while maintaining reasonable delivery times.`
          );
        } else {
          setRecommendedStrategy(
            `Para este envío de ${data.product.productCategory}, recomendamos carga ${data.shipping.transportMode === 'air' ? 'aérea' : data.shipping.transportMode === 'ocean' ? 'marítima' : data.shipping.transportMode === 'road' ? 'terrestre' : data.shipping.transportMode} por rutas estándar para optimizar costos manteniendo tiempos de entrega razonables.`
          );
        }
      }
    }
  }, [data, language]);

  useEffect(() => {
    const total = calculateTotalCost(costItems);
    setTotalLandedCost(`$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  }, [costItems]);

  const formatSavingsEstimate = (value: number, mode: string) => {
    const savingsRate = mode === 'air' ? 0.15 : 0.08;
    const savings = value * savingsRate;
    return `$${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const getTranslatedCostItems = () => {
    if (language === 'en') return costItems;
    
    return costItems.map(item => {
      const labelTranslations: Record<string, string> = {
        'Product Value': 'Valor del Producto',
        'Import Duty': 'Arancel de Importación',
        'Freight Cost': 'Costo de Flete',
        'Insurance': 'Seguro',
        'Documentation Fees': 'Tarifas de Documentación',
        'Customs Clearance': 'Despacho Aduanero',
        'Inland Transportation': 'Transporte Terrestre',
        'Warehousing': 'Almacenaje',
        'Other Taxes and Fees': 'Otros Impuestos y Tarifas'
      };

      // Try to find a direct translation, otherwise keep the original label
      const translatedLabel = labelTranslations[item.label] || item.label;
      return { ...item, label: translatedLabel };
    });
  };

  return (
    <div className="space-y-6">
      {recommendedStrategy && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="text-blue-700 font-semibold mb-2">{t('strategy.recommended')}</h4>
          <p className="text-gray-700">{recommendedStrategy}</p>
        </div>
      )}

      <div className="space-y-4">
        {getTranslatedCostItems().map((item, index) => (
          <CostItem 
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}

        <div className="border-t-2 border-gray-200 pt-4 mt-6">
          <CostItem 
            label={t('cost.total')} 
            value={totalLandedCost} 
            className="text-lg font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisTab;
