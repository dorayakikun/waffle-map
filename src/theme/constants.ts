// Leaflet用の色定数
// Chakra UIのテーマシステム外で使用するため、直接値を定義
export const MESH_COLORS = {
  grid: "#A855F7", // secondary.500 (Purple)
  userInput: "#4F46E5", // primary.600 (Indigo)
  debug: {
    background: "rgba(99, 102, 241, 0.2)", // primary.500 with opacity
    outline: "#6366F1", // primary.500
  },
} as const;
