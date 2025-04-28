
import { ChartConfig } from "@/components/ui/chart";
import { lightTheme } from "@/components/ui/chart/chartTheme";

// Define colors for various chart elements based on the Global Trade Strategy Navigator color system
export const chartConfig: ChartConfig = {
  freight: {
    label: "Freight",
    color: "#E74C3C",  // Error Red - Freight/Shipping
  },
  insurance: {
    label: "Insurance",
    color: "#27AE60",  // Success Green - Insurance
  },
  customs: {
    label: "Customs",
    color: "#9B59B6",  // Purple - Customs/Regulatory
  },
  handling: {
    label: "Handling",
    color: "#16A085",  // Dark Teal - Transportation
  },
  documentation: {
    label: "Documentation",
    color: "#F39C12",  // Warning Amber - Documentation
  },
  warehouse: {
    label: "Warehousing",
    color: "#D35400",  // Dark Orange - Warehousing
  },
  lastMile: {
    label: "Last Mile",
    color: "#16A085",  // Dark Teal - Transportation
  },
  compliance: {
    label: "Compliance",
    color: "#8E44AD",  // Dark Purple - Taxes/Fees
  },
  risk: {
    label: "Risk",
    color: "#E74C3C",  // Error Red
  },
  // Risk levels
  highRisk: {
    label: "High Risk",
    color: "#E74C3C",  // Error Red
  },
  mediumRisk: {
    label: "Medium Risk",
    color: "#F39C12",  // Warning Amber
  },
  lowRisk: {
    label: "Low Risk",
    color: "#27AE60",  // Success Green
  },
  // Time periods
  q1: {
    label: "Q1",
    color: "#3498DB",  // Teal Blue - Import/Export
  },
  q2: {
    label: "Q2",
    color: "#9B59B6",  // Purple
  },
  q3: {
    label: "Q3",
    color: "#27AE60",  // Success Green
  },
  q4: {
    label: "Q4",
    color: "#F39C12",  // Warning Amber
  },
  // Routes
  primaryRoute: {
    label: "Primary Route",
    color: "#3498DB",  // Teal Blue - Import/Export
  },
  secondaryRoute: {
    label: "Secondary Route",
    color: "#9B59B6",  // Purple
  },
  alternativeRoute: {
    label: "Alternative Route",
    color: "#27AE60",  // Success Green
  }
};
