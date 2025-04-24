
import { ChartConfig } from "../types";
import { lightTheme } from "../chartTheme";

export const costConfig: ChartConfig = {
  freight: {
    label: "Freight",
    color: lightTheme.colors.accent[0],
  },
  customs: {
    label: "Customs",
    color: lightTheme.colors.accent[1],
  },
  insurance: {
    label: "Insurance",
    color: lightTheme.colors.accent[2],
  },
  handling: {
    label: "Handling",
    color: lightTheme.colors.accent[3],
  },
  documentation: {
    label: "Documentation",
    color: lightTheme.colors.accent[4],
  },
  lastMile: {
    label: "Last Mile",
    color: lightTheme.colors.accent[5],
  },
};

export default costConfig;
