import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsForm from './ProductDetailsForm';
import ShippingDetailsForm from './ShippingDetailsForm';
import TradeAnalysis from './TradeAnalysis';

const TradeNavigator = () => {
  const [formData] = useState({
    product: {
      productDescription: 'Sample Electronics',
      originCountry: 'China',
      destinationCountry: 'USA',
      productValue: 10000
    },
    shipping: {
      quantity: 100,
      transportMode: 'sea'
    }
  });
  
  const { toast } = useToast();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const analysisRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#3A4756] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Global Trade Strategy Navigator
          </h1>
          <p className="text-lg text-center text-blue-100">
            Diversify your trade routes, strengthen your business future
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Card className="shadow-lg">
          <TradeAnalysis data={formData} />
        </Card>
      </main>
    </div>
  );
};

export default TradeNavigator;
