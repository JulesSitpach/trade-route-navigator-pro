
import { TradeOpportunity } from '../../types';

export const opportunities: TradeOpportunity[] = [
  {
    title: 'Alternative Origin: Vietnam Instead of China',
    savings: '$3,125.00',
    tags: ['Tariff Reduction', 'Lower Risk'],
    description: 'Sourcing this product from Vietnam instead of China would reduce the tariff rate from 125% to 10%, resulting in significant savings on duty costs.',
    currentRoute: 'China → US (125% tariff)',
    alternativeRoute: 'Vietnam → US (10% tariff)',
    type: 'savings'
  },
  {
    title: 'Triangular Trade: China → Mexico → US',
    savings: '$2,875.00',
    tags: ['USMCA Advantage', 'Requires Processing'],
    description: 'Import components from China to Mexico (15% tariff), perform sufficient processing to meet USMCA requirements, then export to US with 0% tariff.',
    currentRoute: 'China → US (125% tariff)',
    alternativeRoute: 'China → Mexico (15% tariff) → US (0% tariff under USMCA)',
    type: 'savings'
  }
];
