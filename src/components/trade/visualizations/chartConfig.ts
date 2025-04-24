
import { ChartConfig } from "@/components/ui/chart";
import { chartTheme } from "@/utils/chartTheme";

// Define colors for various chart elements
export const chartConfig: ChartConfig = {
  freight: {
    label: "Freight",
    color: chartTheme.colors.categorical.freight,
  },
  insurance: {
    label: "Insurance",
    color: chartTheme.colors.categorical.insurance,
  },
  customs: {
    label: "Customs",
    color: chartTheme.colors.categorical.customs,
  },
  handling: {
    label: "Handling",
    color: chartTheme.colors.categorical.handling,
  },
  documentation: {
    label: "Documentation",
    color: chartTheme.colors.categorical.documentation,
  },
  warehouse: {
    label: "Warehousing",
    color: chartTheme.colors.primary[2],
  },
  lastMile: {
    label: "Last Mile",
    color: chartTheme.colors.categorical.lastMile,
  },
  compliance: {
    label: "Compliance",
    color: chartTheme.colors.categorical.compliance,
  },
  risk: {
    label: "Risk",
    color: chartTheme.colors.lines.risk,
  },
  // Risk levels
  highRisk: {
    label: "High Risk",
    color: chartTheme.colors.risk.high,
  },
  mediumRisk: {
    label: "Medium Risk",
    color: chartTheme.colors.risk.medium,
  },
  lowRisk: {
    label: "Low Risk",
    color: chartTheme.colors.risk.low,
  },
  // Time periods
  q1: {
    label: "Q1",
    color: chartTheme.colors.primary[0],
  },
  q2: {
    label: "Q2",
    color: chartTheme.colors.primary[3],
  },
  q3: {
    label: "Q3",
    color: chartTheme.colors.primary[2],
  },
  q4: {
    label: "Q4",
    color: chartTheme.colors.primary[1],
  },
  // Routes
  primaryRoute: {
    label: "Primary Route",
    color: chartTheme.colors.primary[0],
  },
  secondaryRoute: {
    label: "Secondary Route",
    color: chartTheme.colors.primary[3],
  },
  alternativeRoute: {
    label: "Alternative Route",
    color: chartTheme.colors.primary[2],
  }
};

