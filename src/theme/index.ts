import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { semanticColors } from "./semanticTokens/colors";
import { colors } from "./tokens/colors";
import { spacing } from "./tokens/spacing";

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      spacing,
    },
    semanticTokens: {
      colors: semanticColors,
    },
  },
});

export const system = createSystem(defaultConfig, config);
