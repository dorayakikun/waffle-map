import { defineSemanticTokens } from "@chakra-ui/react";

export const semanticColors = defineSemanticTokens.colors({
  // colorPalette="primary" 用セマンティックトークン
  primary: {
    solid: { value: { base: "{colors.primary.600}", _dark: "{colors.primary.500}" } },
    contrast: { value: "white" },
    fg: { value: { base: "{colors.primary.700}", _dark: "{colors.primary.300}" } },
    muted: { value: { base: "{colors.primary.100}", _dark: "{colors.primary.900}" } },
    subtle: { value: { base: "{colors.primary.50}", _dark: "{colors.primary.950}" } },
    emphasized: { value: { base: "{colors.primary.300}", _dark: "{colors.primary.700}" } },
    focusRing: { value: "{colors.primary.500}" },
  },
  // colorPalette="secondary" 用セマンティックトークン
  secondary: {
    solid: { value: { base: "{colors.secondary.600}", _dark: "{colors.secondary.500}" } },
    contrast: { value: "white" },
    fg: { value: { base: "{colors.secondary.700}", _dark: "{colors.secondary.300}" } },
    muted: { value: { base: "{colors.secondary.100}", _dark: "{colors.secondary.900}" } },
    subtle: { value: { base: "{colors.secondary.50}", _dark: "{colors.secondary.950}" } },
    emphasized: { value: { base: "{colors.secondary.300}", _dark: "{colors.secondary.700}" } },
    focusRing: { value: "{colors.secondary.500}" },
  },
  // ブランドカラー
  brand: {
    solid: { value: "{colors.primary.600}" },
    contrast: { value: "white" },
    fg: { value: { base: "{colors.primary.700}", _dark: "{colors.primary.300}" } },
    muted: { value: { base: "{colors.primary.100}", _dark: "{colors.primary.900}" } },
    subtle: { value: { base: "{colors.primary.50}", _dark: "{colors.primary.950}" } },
    emphasized: { value: "{colors.primary.800}" },
    focusRing: { value: "{colors.primary.500}" },
  },
  // アクセントカラー
  accent: {
    solid: { value: "{colors.secondary.600}" },
    contrast: { value: "white" },
    fg: { value: { base: "{colors.secondary.700}", _dark: "{colors.secondary.300}" } },
    muted: { value: { base: "{colors.secondary.100}", _dark: "{colors.secondary.900}" } },
    subtle: { value: { base: "{colors.secondary.50}", _dark: "{colors.secondary.950}" } },
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
    panel: {
      value: { base: "white", _dark: "{colors.neutral.900}" },
    },
    subtle: {
      value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.800}" },
    },
    muted: {
      value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" },
    },
    canvas: {
      value: { base: "{colors.neutral.50}", _dark: "{colors.neutral.950}" },
    },
  },
  // 前景色（テキスト）
  fg: {
    DEFAULT: {
      value: { base: "{colors.neutral.900}", _dark: "{colors.neutral.50}" },
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
      value: { base: "{colors.neutral.200}", _dark: "{colors.neutral.800}" },
    },
    muted: {
      value: { base: "{colors.neutral.100}", _dark: "{colors.neutral.800}" },
    },
  },
});
