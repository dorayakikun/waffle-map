import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { semanticColors } from "./semanticTokens/colors";
import { colors } from "./tokens/colors";
import { spacing } from "./tokens/spacing";

const config = defineConfig({
  globalCss: {
    "html, body": {
      fontFamily: "body",
      bg: "bg.canvas",
      color: "fg",
    },
  },
  theme: {
    tokens: {
      colors,
      spacing,
      fonts: {
        heading: {
          value:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        },
        body: {
          value:
            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        },
        mono: {
          value:
            '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        },
      },
    },
    semanticTokens: {
      colors: semanticColors,
    },
  },
});

export const system = createSystem(defaultConfig, config);
