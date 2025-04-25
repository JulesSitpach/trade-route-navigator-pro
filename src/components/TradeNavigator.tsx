import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ChartBar } from 'lucide-react';
import ProductDetailsForm from './ProductDetailsForm';
import ShippingDetailsForm from './ShippingDetailsForm';
import TradeAnalysis from './TradeAnalysis';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTradeData } from "@/contexts/TradeDataContext";

const TradeNavigator = () => {
  const [formData, setFormData] = useState({
    product: {
      productDescription: '',
      originCountry: '',
      destinationCountry: '',
      productValue: '',
      productCategory: ''
    },
    shipping: {
      quantity: '',
      transportMode: '',
      shipmentType: '',
      packageType: '',
      dangerousGoods: '',
      weight: '',
      length: '',
      width: '',
      height: '',
      specialRequirements: ''
    }
  });
  
  const { toast } = useToast();
  const [showAnalysis, setShowAnalysis] = useState(false);
  const analysisRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const { updateCostData } = useTradeData();

  const handleProductDetailsChange = (productData: any) => {
    setFormData(prev => ({
      ...prev,
      product: { ...prev.product, ...productData }
    }));
    if (showAnalysis) setShowAnalysis(false);
  };

  const handleShippingDetailsChange = (shippingData: any) => {
    setFormData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, ...shippingData }
    }));
    if (showAnalysis) setShowAnalysis(false);
  };

  const validateForm = () => {
    const { product, shipping } = formData;
    const requiredFields = {
      product: ['productDescription', 'originCountry', 'destinationCountry', 'productValue'],
      shipping: ['quantity', 'transportMode']
    };

    let missingFields: string[] = [];

    requiredFields.product.forEach(field => {
      if (!product[field as keyof typeof product]) {
        missingFields.push(field);
      }
    });

    requiredFields.shipping.forEach(field => {
      if (!shipping[field as keyof typeof shipping]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      toast({
        title: t('missing.fields'),
        description: `${t('missing.fields.description')} ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleCalculateAnalysis = () => {
    if (!validateForm()) {
      return;
    }

    updateCostData({
      productValue: parseFloat(formData.product.productValue) || 0,
      originCountry: formData.product.originCountry,
      destinationCountry: formData.product.destinationCountry,
      productCategory: formData.product.productCategory,
      shippingData: {
        quantity: formData.shipping.quantity,
        weight: formData.shipping.weight,
        transportMode: formData.shipping.transportMode
      }
    });

    setShowAnalysis(true);
    toast({
      title: t('analysis.generated'),
      description: t('analysis.generated.description'),
      duration: 3000
    });
    
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
          <div className="flex justify-end mb-4">
            <LanguageToggle />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('header.title')}
          </h1>
          <p className="text-lg text-center text-blue-100">
            {t('header.subtitle')}
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
            className="bg-pro-blue hover:bg-pro-blue/90 text-white px-8 py-6"
            size="lg"
          >
            <ChartBar className="mr-2" />
            {t('button.calculate')}
          </Button>
        </div>

        {showAnalysis && (
          <div ref={analysisRef}>
            <Card className="shadow-lg">
              <TradeAnalysis data={formData} />
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default TradeNavigator;
