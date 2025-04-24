
import { ChartConfig } from "../types";
import { lightTheme } from "../chartTheme";

export const riskConfig: ChartConfig = {
  highRisk: {
    label: "High Risk",
    color: lightTheme.colors.risk.high,
  },
  mediumRisk: {
    label: "Medium Risk",
    color: lightTheme.colors.risk.medium,
  },
  lowRisk: {
    label: "Low Risk",
    color: lightTheme.colors.risk.low,
  },
};

export default riskConfig;
