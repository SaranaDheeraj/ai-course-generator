// app/providers.tsx
"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
  brand: {
    600: "#228be6",
    500: "#339af0",
    400: "#4dabf7",
  },
};

const theme = extendTheme({ colors });

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
