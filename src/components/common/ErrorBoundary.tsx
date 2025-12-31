import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import * as React from "react";

type Props = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

type State = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Error Boundary component to catch and handle React rendering errors.
 * Prevents entire app from crashing when a child component throws an error.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box p={6} bg="red.50" _dark={{ bg: "red.900" }} borderRadius="md">
          <VStack gap={4} align="start">
            <Heading size="md" color="red.600" _dark={{ color: "red.300" }}>
              Something went wrong
            </Heading>
            <Text color="gray.700" _dark={{ color: "gray.300" }}>
              {this.state.error?.message ?? "An unexpected error occurred"}
            </Text>
            <Button colorScheme="red" size="sm" onClick={this.handleReset}>
              Try again
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}
