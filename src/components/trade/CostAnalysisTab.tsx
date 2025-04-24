
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CostItem } from "./shared/CostItem";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requiredDocuments } from "./data";
import { generateCostItems, calculateTotalCost } from "./data/costData";

interface RequirementItemProps {
  label: string;
  status: 'required' | 'warning' | 'not-required';
}

const RequirementItem = ({ label, status }: RequirementItemProps) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-700">{label}</span>
    <Badge variant={status === 'warning' ? 'destructive' : status === 'required' ? 'default' : 'secondary'}>
      {status === 'not-required' ? 'Not Required' : 'Required'}
    </Badge>
  </div>
);

interface CostAnalysisProps {
  data: {
    product: {
      productValue: string;
    };
    shipping: {
      quantity: string;
    };
  };
}

const CostAnalysisTab = ({ data }: CostAnalysisProps) => {
  const [costItems, setCostItems] = useState(generateCostItems({ productValue: 10000 }));
  
  const [importRequirements, setImportRequirements] = useState(
    requiredDocuments.map(doc => ({
      label: doc.name,
      status: doc.status
    }))
  );
  
  const [recommendedStrategy, setRecommendedStrategy] = useState<string | null>(null);
  const [totalLandedCost, setTotalLandedCost] = useState("$0.00");

  useEffect(() => {
    if (data?.product?.productValue) {
      const productValue = parseFloat(data.product.productValue) || 0;
      const quantity = parseInt(data.shipping?.quantity) || 1;
      
      // Generate cost items based on product value and quantity
      const items = generateCostItems({
        productValue: productValue * quantity,
        // You can add more dynamic rates based on other form fields
      });
      
      setCostItems(items);

      // Generate recommendation based on value and quantity
      const totalValue = productValue * quantity;
      if (totalValue > 50000) {
        setRecommendedStrategy(
          "Based on your high-value shipment, we recommend dedicated freight service with premium insurance coverage to ensure maximum protection."
        );
      } else if (totalValue > 10000) {
        setRecommendedStrategy(
          "Based on your product and destinations, we recommend ocean freight via Panama with consolidated shipping to reduce costs by approximately 18%."
        );
      } else {
        setRecommendedStrategy(
          "For this shipment value, we recommend grouped shipping to optimize costs while maintaining reasonable delivery times."
        );
      }
    }
  }, [data]);

  useEffect(() => {
    const total = calculateTotalCost(costItems);
    setTotalLandedCost(`$${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);
  }, [costItems]);

  return (
    <>
      {recommendedStrategy ? (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h4 className="text-blue-700 font-semibold mb-2">Recommended Strategy</h4>
          <p className="text-gray-700">{recommendedStrategy}</p>
        </div>
      ) : (
        <div className="bg-gray-100 border-l-4 border-gray-400 p-4 mb-6">
          <p className="text-gray-700">
            No trade strategy recommendation available yet. Please complete your product and shipping details.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {costItems.length > 0 ? (
          costItems.map((item, index) => (
            <CostItem 
              key={index}
              label={item.label}
              value={item.value}
            />
          ))
        ) : (
          <div className="text-center text-muted-foreground py-6">
            No cost breakdown data available yet
          </div>
        )}

        {costItems.length > 0 && (
          <div className="border-t-2 border-gray-200 pt-4 mt-6">
            <CostItem 
              label="Total Landed Cost" 
              value={totalLandedCost} 
              className="text-lg font-bold"
            />
          </div>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Import Requirements</h3>
        {importRequirements.length > 0 ? (
          <div className="space-y-4">
            {importRequirements.map((req, index) => (
              <RequirementItem 
                key={index}
                label={req.label} 
                status={req.status} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-6">
            No import requirements data available yet
          </div>
        )}
      </div>
    </>
  );
};

export default CostAnalysisTab;
