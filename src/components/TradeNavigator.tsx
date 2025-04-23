
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductDetailsForm from './ProductDetailsForm';
import ShippingDetailsForm from './ShippingDetailsForm';
import TradeAnalysis from './TradeAnalysis';

const TradeNavigator = () => {
  const [formData, setFormData] = useState({
    product: {},
    shipping: {}
  });
  
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleCalculate = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#3A4756] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Global Trade Strategy Navigator
          </h1>
          <p className="text-lg text-center text-blue-100">
            Discover smarter trade routes and opportunities for your small business
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Card className="shadow-lg">
          <ProductDetailsForm 
            onChange={(data) => setFormData(prev => ({ ...prev, product: { ...prev.product, ...data } }))}
          />
        </Card>

        <Card className="shadow-lg">
          <ShippingDetailsForm 
            onChange={(data) => setFormData(prev => ({ ...prev, shipping: { ...prev.shipping, ...data } }))}
          />
        </Card>

        <div className="text-center">
          <Button 
            className="bg-[#3498db] hover:bg-[#2980b9] text-white px-8 py-2"
            onClick={handleCalculate}
          >
            Calculate Costs & Find Opportunities
          </Button>
        </div>

        {showAnalysis && (
          <Card className="shadow-lg mt-8">
            <TradeAnalysis data={formData} />
          </Card>
        )}
      </main>
    </div>
  );
};

export default TradeNavigator;
