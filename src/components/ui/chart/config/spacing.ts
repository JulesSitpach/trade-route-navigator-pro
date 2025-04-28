
/**
 * Spacing configuration for chart components
 */

export const spacing = {
  margin: {
    top: 20,
    right: 30,
    bottom: 50, // Increased for better axis label visibility
    left: 50    // Increased for better axis label visibility
  },
  padding: {
    top: 8,
    right: 8,
    bottom: 8,
    left: 8
  },
  legend: {
    iconSize: 14,
    iconType: 'rect' as const,
    layout: 'horizontal' as const,
    verticalAlign: 'bottom' as const,
    align: 'center' as const
  }
};

export default spacing;
