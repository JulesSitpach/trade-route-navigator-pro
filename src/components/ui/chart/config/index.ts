
import { ChartConfig } from "../types";
import themeConfig from "./themeConfig";
import riskConfig from "./riskConfig";
import costConfig from "./costConfig";
import routeConfig from "./routeConfig";

export const chartConfig: ChartConfig = {
  ...themeConfig,
  ...riskConfig,
  ...costConfig,
  ...routeConfig,
};

export { themeConfig, riskConfig, costConfig, routeConfig };
export default chartConfig;
