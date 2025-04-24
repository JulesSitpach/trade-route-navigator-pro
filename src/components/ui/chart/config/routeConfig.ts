
import { ChartConfig } from "../types";
import { lightTheme } from "../chartTheme";

export const routeConfig: ChartConfig = {
  primaryRoute: {
    label: "Primary Route",
    color: lightTheme.colors.accent[0],
  },
  secondaryRoute: {
    label: "Secondary Route",
    color: lightTheme.colors.accent[3],
  },
  alternativeRoute: {
    label: "Alternative Route",
    color: lightTheme.colors.accent[2],
  },
};

export default routeConfig;
