
import { ReactElement } from 'react';
import { LucideIcon } from 'lucide-react';

export interface SupplyChainStep {
  id: string;
  labelKey: string;
  label: string;
  icon: ReactElement;
  timeframe: string;
  risks: string[];
  cost: string;
  description: string;
}
