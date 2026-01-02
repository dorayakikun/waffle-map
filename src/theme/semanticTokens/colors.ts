import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticColors = defineSemanticTokens.colors({
  // ブランドカラー
  brand: {
    solid: { value: "{colors.primary.600}" },
    contrast: { value: "white" },
    fg: { value: "{colors.primary.700}" },
    muted: { value: "{colors.primary.100}" },
    subtle: { value: "{colors.primary.50}" },
    emphasized: { value: "{colors.primary.800}" },
    focusRing: { value: "{colors.primary.500}" },
  },
  // アクセントカラー
  accent: {
    solid: { value: "{colors.secondary.600}" },
    contrast: { value: "white" },
    fg: { value: "{colors.secondary.700}" },
    muted: { value: "{colors.secondary.100}" },
    subtle: { value: "{colors.secondary.50}" },
  },
  // メッシュグリッド用
  mesh: {
    grid: { value: "{colors.secondary.500}" },
    userInput: { value: "{colors.primary.600}" },
  },
  // 背景色
  bg: {
    DEFAULT: {
      value: { base: "white", _dark: "{colors.neutral.900}" },
    },
    subtle: {
      value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.800}" },
    },
    muted: {
      value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.700}" },
    },
    canvas: {
      value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.950}" },
    },
  },
  // 前景色（テキスト）
  fg: {
    DEFAULT: {
      value: { base: "{colors.neutral.900}", _dark: "white" },
    },
    muted: {
      value: { base: "{colors.neutral.600}", _dark: "{colors.neutral.400}" },
    },
    subtle: {
      value: { base: "{colors.neutral.500}", _dark: "{colors.neutral.500}" },
    },
  },
  // ボーダー
  border: {
    DEFAULT: {
      value: { base: "{colors.neutral.200}", _dark: "{colors.neutral.700}" },
    },
    muted: {
      value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" },
    },
  },
});
