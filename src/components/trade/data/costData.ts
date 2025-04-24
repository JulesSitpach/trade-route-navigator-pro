
export const defaultCostItems = [
  { label: "Product Value", value: "$10,000.00" },
  { label: "Import Duty (8.5%)", value: "$850.00" },
  { label: "Freight Cost", value: "$1,200.00" },
  { label: "Insurance (1.2%)", value: "$120.00" },
  { label: "Documentation Fees", value: "$75.00" },
  { label: "Customs Clearance", value: "$150.00" },
  { label: "Inland Transportation", value: "$300.00" },
  { label: "Warehousing", value: "$200.00" },
  { label: "Other Taxes and Fees", value: "$180.00" }
];

export const calculateTotalCost = (items: Array<{ value: string }>) => {
  return items.reduce((sum, item) => {
    const value = parseFloat(item.value.replace(/[$,]/g, '')) || 0;
    return sum + value;
  }, 0);
};
