
import { Route } from '../../types';

export interface VisualizationsTabProps {
  data: {
    product: {
      productDescription: string;
      originCountry: string;
      destinationCountry: string;
      productValue: string;
      productCategory: string;
    };
    shipping: {
      quantity: string;
      transportMode: string;
      shipmentType: string;
      packageType: string;
      dangerousGoods: string;
      weight: string;
      length: string;
      width: string;
      height: string;
      specialRequirements: string;
    };
  };
  routes: Route[];
}

export interface RouteComparisonTimelineProps {
  routes: Route[];
}
