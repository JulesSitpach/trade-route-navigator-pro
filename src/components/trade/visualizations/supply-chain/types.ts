
export interface SupplyChainStep {
  id: string;
  labelKey: string;
  label: string;
  iconName: string; // Changed from icon: JSX.Element to iconName: string
  timeframe: string;
  risks: string[];
  cost: string;
  description: string;
}
