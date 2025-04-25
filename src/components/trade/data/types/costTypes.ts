
export interface CostItem {
  label: string;
  value: string;
}

export interface CostBreakdownInput {
  productValue: number;
  importDutyRate?: number;
  freightCost?: number;
  insuranceRate?: number;
  documentationFees?: number;
  customsClearance?: number;
  inlandTransportation?: number;
  warehousingCost?: number;
  otherFeesRate?: number;
  originCountry?: string;
  destinationCountry?: string;
  productCategory?: string;
  shippingData?: {
    quantity: string;
    weight: string;
    transportMode: string;
  };
}

export interface ShippingData {
  quantity: string;
  weight: string;
  transportMode: string;
}
