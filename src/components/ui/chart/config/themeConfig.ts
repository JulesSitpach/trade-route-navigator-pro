
import { ChartConfig } from "../types";
import { lightTheme } from "../chartTheme";

export const themeConfig: ChartConfig = {
  // Base colors
  primary: {
    label: "Primary",
    color: lightTheme.colors.primary,
  },
  secondary: {
    label: "Secondary",
    color: lightTheme.colors.secondary,
  }
};

export default themeConfig;
