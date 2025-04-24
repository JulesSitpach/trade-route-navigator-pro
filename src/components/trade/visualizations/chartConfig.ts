
import { ChartConfig } from "@/components/ui/chart";
import { lightTheme } from "@/components/ui/chart/chartTheme";

// Define colors for various chart elements
export const chartConfig: ChartConfig = {
  freight: {
    label: "Freight",
    color: lightTheme.colors.accent[0],
  },
  insurance: {
    label: "Insurance",
    color: lightTheme.colors.accent[1],
  },
  customs: {
    label: "Customs",
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
  warehouse: {
    label: "Warehousing",
    color: lightTheme.colors.accent[5],
  },
  lastMile: {
    label: "Last Mile",
    color: lightTheme.colors.accent[6],
  },
  compliance: {
    label: "Compliance",
    color: lightTheme.colors.accent[7],
  },
  risk: {
    label: "Risk",
    color: lightTheme.colors.primary,
  },
  // Risk levels
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
  // Time periods
  q1: {
    label: "Q1",
    color: lightTheme.colors.accent[0],
  },
  q2: {
    label: "Q2",
    color: lightTheme.colors.accent[3],
  },
  q3: {
    label: "Q3",
    color: lightTheme.colors.accent[2],
  },
  q4: {
    label: "Q4",
    color: lightTheme.colors.accent[1],
  },
  // Routes
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
  }
};
