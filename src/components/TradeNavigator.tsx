
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChartBar } from 'lucide-react';
import ProductDetailsForm from './ProductDetailsForm';
import ShippingDetailsForm from './ShippingDetailsForm';
import TradeAnalysis from './TradeAnalysis';
import { PropDebugger } from './debug/PropDebugger';

const TradeNavigator = () => {
  const [formData, setFormData] = useState({
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

  const handleProductDetailsChange = (productData: any) => {
    setFormData(prev => ({
      ...prev,
      product: { ...prev.product, ...productData }
    }));
    // Hide analysis when inputs change
    if (showAnalysis) setShowAnalysis(false);
  };

  const handleShippingDetailsChange = (shippingData: any) => {
    setFormData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, ...shippingData }
    }));
    // Hide analysis when inputs change
    if (showAnalysis) setShowAnalysis(false);
  };

  const handleCalculateAnalysis = () => {
    setShowAnalysis(true);
    toast({
      title: "Analysis Generated",
      description: "Your trade analysis has been calculated successfully.",
      duration: 3000
    });
    
    // Scroll to analysis after short delay to ensure it's rendered
    setTimeout(() => {
      if (analysisRef.current) {
        analysisRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
          <ProductDetailsForm onChange={handleProductDetailsChange} />
        </Card>

        <Card className="shadow-lg">
          <ShippingDetailsForm onChange={handleShippingDetailsChange} />
        </Card>
        
        <div className="flex justify-center">
          <Button 
            onClick={handleCalculateAnalysis} 
            className="bg-[#3A4756] hover:bg-[#2A3746] text-white px-8 py-6"
            size="lg"
          >
            <ChartBar className="mr-2" />
            Calculate Trade Analysis
          </Button>
        </div>

        {showAnalysis && (
          <div ref={analysisRef}>
            <Card className="shadow-lg">
              <TradeAnalysis data={formData} />
            </Card>
          </div>
        )}

        <PropDebugger 
          componentProps={formData} 
          title="Form Data State"
          showInConsole={true}
        />
      </main>
    </div>
  );
};

export default TradeNavigator;
