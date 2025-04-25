
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CostItem } from "./shared/CostItem";
import { useState, useEffect } from "react";
import { requiredDocuments } from "./data";
import { generateCostItems, calculateTotalCost } from "./data/costData";

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
  const [costItems, setCostItems] = useState(generateCostItems({ productValue: 0 }));
  const [totalLandedCost, setTotalLandedCost] = useState("$0.00");
  const [recommendedStrategy, setRecommendedStrategy] = useState<string | null>(null);

  useEffect(() => {
    if (data?.product?.productValue) {
      const productValue = parseFloat(data.product.productValue) || 0;
      
      // Generate cost items based on product value and shipping details
      const items = generateCostItems({
        productValue,
        shippingData: {
          quantity: data.shipping.quantity,
          weight: data.shipping.weight,
          transportMode: data.shipping.transportMode
        }
      });
      
      setCostItems(items);

      // Generate recommendation based on inputs
      const totalValue = productValue * (parseInt(data.shipping.quantity) || 1);
      if (data.shipping.transportMode === 'air') {
        setRecommendedStrategy(
          `Based on your choice of air freight, consider consolidating shipments to optimize costs. Current estimated savings potential: ${formatSavingsEstimate(totalValue, 'air')}`
        );
      } else if (totalValue > 50000) {
        setRecommendedStrategy(
          `For your high-value shipment from ${data.product.originCountry} to ${data.product.destinationCountry}, we recommend dedicated freight service with premium insurance coverage.`
        );
      } else {
        setRecommendedStrategy(
          `For this ${data.product.productCategory} shipment, we recommend ${data.shipping.transportMode} freight via standard shipping lanes to optimize costs while maintaining reasonable delivery times.`
        );
      }
    }
  }, [data]);

  useEffect(() => {
    const total = calculateTotalCost(costItems);
    setTotalLandedCost(`$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  }, [costItems]);

  const formatSavingsEstimate = (value: number, mode: string) => {
    const savingsRate = mode === 'air' ? 0.15 : 0.08;
    const savings = value * savingsRate;
    return `$${savings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="space-y-6">
      {recommendedStrategy && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="text-blue-700 font-semibold mb-2">Recommended Strategy</h4>
          <p className="text-gray-700">{recommendedStrategy}</p>
        </div>
      )}

      <div className="space-y-4">
        {costItems.map((item, index) => (
          <CostItem 
            key={index}
            label={item.label}
            value={item.value}
          />
        ))}

        <div className="border-t-2 border-gray-200 pt-4 mt-6">
          <CostItem 
            label="Total Landed Cost" 
            value={totalLandedCost} 
            className="text-lg font-bold"
          />
        </div>
      </div>
    </div>
  );
};

export default CostAnalysisTab;
