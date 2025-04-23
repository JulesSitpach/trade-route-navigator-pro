
import { ChartConfig } from "@/components/ui/chart";

// Define colors for various chart elements
export const chartConfig: ChartConfig = {
  freight: {
    label: "Freight",
    color: "#8B5CF6", // Vivid Purple
  },
  insurance: {
    label: "Insurance",
    color: "#D946EF", // Magenta Pink
  },
  customs: {
    label: "Customs",
    color: "#F97316", // Bright Orange
  },
  handling: {
    label: "Handling",
    color: "#0EA5E9", // Ocean Blue
  },
  documentation: {
    label: "Documentation",
    color: "#6B7280", // Gray
  },
  warehouse: {
    label: "Warehousing",
    color: "#10B981", // Green
  },
  lastMile: {
    label: "Last Mile",
    color: "#FBBF24", // Yellow
  },
  compliance: {
    label: "Compliance",
    color: "#6366F1", // Indigo
  },
  risk: {
    label: "Risk",
    color: "#EF4444", // Red
  },
  // Risk levels
  highRisk: {
    label: "High Risk",
    color: "#EF4444", // Red
  },
  mediumRisk: {
    label: "Medium Risk",
    color: "#F97316", // Orange
  },
  lowRisk: {
    label: "Low Risk",
    color: "#22C55E", // Green
  },
  // Time periods
  q1: {
    label: "Q1",
    color: "#8B5CF6", // Purple
  },
  q2: {
    label: "Q2",
    color: "#0EA5E9", // Blue
  },
  q3: {
    label: "Q3",
    color: "#22C55E", // Green
  },
  q4: {
    label: "Q4",
    color: "#F97316", // Orange
  },
  // Routes
  primaryRoute: {
    label: "Primary Route",
    color: "#8B5CF6", // Purple
  },
  secondaryRoute: {
    label: "Secondary Route",
    color: "#0EA5E9", // Blue
  },
  alternativeRoute: {
    label: "Alternative Route",
    color: "#22C55E", // Green
  }
};
