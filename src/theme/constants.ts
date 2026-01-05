/**
 * Color constants for Leaflet components.
 *
 * These values are duplicated from theme tokens because Leaflet
 * operates outside of Chakra UI's theming system.
 *
 * IMPORTANT: When updating colors, sync with:
 * - src/theme/tokens/colors.ts (primary, secondary palettes)
 */
export const MESH_COLORS = {
  grid: "#A855F7", // secondary.500 (Purple)
  userInput: "#4F46E5", // primary.600 (Indigo)
  debug: {
    background: "rgba(99, 102, 241, 0.2)", // primary.500 with opacity
    outline: "#6366F1", // primary.500
  },
  label: {
    stroke: "#FFFFFF", // white (tokens/colors.ts)
  },
} as const;
