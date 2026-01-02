import { defineTokens } from "@chakra-ui/react";

export const colors = defineTokens.colors({
  // プライマリ（Indigo系）- ブランドカラー
  primary: {
    50: { value: "#EEF2FF" },
    100: { value: "#E0E7FF" },
    200: { value: "#C7D2FE" },
    300: { value: "#A5B4FC" },
    400: { value: "#818CF8" },
    500: { value: "#6366F1" },
    600: { value: "#4F46E5" },
    700: { value: "#4338CA" },
    800: { value: "#3730A3" },
    900: { value: "#312E81" },
    950: { value: "#1E1B4B" },
  },
  // セカンダリ（Purple系）- アクセントカラー
  secondary: {
    50: { value: "#FAF5FF" },
    100: { value: "#F3E8FF" },
    200: { value: "#E9D5FF" },
    300: { value: "#D8B4FE" },
    400: { value: "#C084FC" },
    500: { value: "#A855F7" },
    600: { value: "#9333EA" },
    700: { value: "#7E22CE" },
    800: { value: "#6B21A8" },
    900: { value: "#581C87" },
    950: { value: "#3B0764" },
  },
  // エラー（Red系）
  error: {
    50: { value: "#FEF2F2" },
    100: { value: "#FEE2E2" },
    200: { value: "#FECACA" },
    300: { value: "#FCA5A5" },
    400: { value: "#F87171" },
    500: { value: "#EF4444" },
    600: { value: "#DC2626" },
    700: { value: "#B91C1C" },
    800: { value: "#991B1B" },
    900: { value: "#7F1D1D" },
    950: { value: "#450A0A" },
  },
  // サクセス（Green系）
  success: {
    50: { value: "#F0FDF4" },
    100: { value: "#DCFCE7" },
    200: { value: "#BBF7D0" },
    300: { value: "#86EFAC" },
    400: { value: "#4ADE80" },
    500: { value: "#22C55E" },
    600: { value: "#16A34A" },
    700: { value: "#15803D" },
    800: { value: "#166534" },
    900: { value: "#14532D" },
    950: { value: "#052E16" },
  },
  // ニュートラル（Gray系）
  neutral: {
    50: { value: "#F9FAFB" },
    100: { value: "#F3F4F6" },
    200: { value: "#E5E7EB" },
    300: { value: "#D1D5DB" },
    400: { value: "#9CA3AF" },
    500: { value: "#6B7280" },
    600: { value: "#4B5563" },
    700: { value: "#374151" },
    800: { value: "#1F2937" },
    900: { value: "#111827" },
    950: { value: "#030712" },
  },
});
