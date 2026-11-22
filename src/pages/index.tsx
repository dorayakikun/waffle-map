import {
  Accordion,
  Badge,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Check,
  Grid3x3,
  Hash,
  Layers,
  MapPin,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Share2,
  Sun,
} from "lucide-react";
import * as React from "react";

import { GeodeticInputContainer } from "../components/geodeticInput/";
import { MapContainer } from "../components/map/";
import { MarkerInputContainer } from "../components/markerinput";
import { MeshcodesInputContainer } from "../components/meshcodeinput/index";
import { MeshDetailsContainer } from "../components/meshdetails";
import { MeshToggleContainer } from "../components/meshtoggle/";
import { TileToggleContainer } from "../components/tileToggle";
import { useUrlSync } from "../hooks";
import { useColorModeStore } from "../stores/useColorModeStore";
import { useGeodeticInputStore } from "../stores/useGeodeticInputStore";
import { useMarkerInputStore } from "../stores/useMarkerInputStore";
import { useMeshcodesInputStore } from "../stores/useMeshcodesInputStore";
import { useMeshToggleStore } from "../stores/useMeshToggleStore";
import { useTileToggleStore } from "../stores/useTileToggleStore";

export function AppContainer() {
  useUrlSync();

  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [urlCopied, setUrlCopied] = React.useState(false);
  const copyTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const colorMode = useColorModeStore((s) => s.colorMode);
  const toggleColorMode = useColorModeStore((s) => s.toggleColorMode);
  const datum = useGeodeticInputStore((s) => s.datum);
  const unit = useGeodeticInputStore((s) => s.unit);
  const enableTileGrid = useTileToggleStore((s) => s.enableTileGrid);
  const enableMeshGrid = useMeshToggleStore((s) => s.enableMeshGrid);
  const markerCount = useMarkerInputStore((s) => s.positions.length);
  const meshcodeCount = useMeshcodesInputStore((s) => s.meshcodes.length);

  React.useEffect(() => {
    return () => {
      if (copyTimerRef.current !== null) {
        clearTimeout(copyTimerRef.current);
      }
    };
  }, []);

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setUrlCopied(true);
      if (copyTimerRef.current !== null) {
        clearTimeout(copyTimerRef.current);
      }
      copyTimerRef.current = setTimeout(() => {
        setUrlCopied(false);
        copyTimerRef.current = null;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy share URL:", error);
    }
  };

  return (
    <Flex h="100dvh" w="100vw" overflow="hidden" bg="bg.canvas">
      {sidebarOpen && (
        <Box
          as="aside"
          w="340px"
          minW="300px"
          flexShrink={0}
          h="full"
          display="flex"
          flexDirection="column"
          borderRightWidth="1px"
          borderColor="border"
          bg="bg.canvas"
          zIndex={10}
          shadow="sm"
        >
          <Flex
            px={4}
            py={3}
            align="center"
            justify="space-between"
            borderBottomWidth="1px"
            borderColor="border"
            bg="bg.panel"
          >
            <HStack gap={2.5}>
              <Flex
                boxSize="34px"
                rounded="xl"
                align="center"
                justify="center"
                bg="brand.subtle"
                borderWidth="1px"
                borderColor="brand.muted"
                flexShrink={0}
              >
                <Image src="/images/logo.png" alt="wafflemap" boxSize="22px" />
              </Flex>
              <Box lineHeight="1.15">
                <Text fontSize="md" fontWeight="700" letterSpacing="-0.02em" color="fg">
                  wafflemap
                </Text>
                <Text fontSize="2xs" fontWeight="500" color="fg.muted">
                  Mesh Code Studio
                </Text>
              </Box>
            </HStack>

            <HStack gap={1}>
              <IconButton
                aria-label="Copy shareable URL"
                title="Copy shareable URL"
                size="xs"
                variant="ghost"
                rounded="lg"
                color={urlCopied ? "success.600" : "fg.muted"}
                onClick={handleCopyShareUrl}
              >
                {urlCopied ? <Check size={15} /> : <Share2 size={15} />}
              </IconButton>
              <IconButton
                aria-label={colorMode === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                title={colorMode === "dark" ? "Light mode" : "Dark mode"}
                size="xs"
                variant="ghost"
                rounded="lg"
                color="fg.muted"
                onClick={toggleColorMode}
              >
                {colorMode === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </IconButton>
              <IconButton
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                size="xs"
                variant="ghost"
                rounded="lg"
                color="fg.muted"
                onClick={() => setSidebarOpen(false)}
              >
                <PanelLeftClose size={15} />
              </IconButton>
            </HStack>
          </Flex>

          <Box flex="1" overflowY="auto" px={3} py={3}>
            <Stack gap={3}>
              <GeodeticInputContainer />

              <Accordion.Root
                collapsible
                variant="plain"
                display="flex"
                flexDirection="column"
                gap={2}
              >
                <Accordion.Item
                  value="tile-grid"
                  rounded="xl"
                  borderWidth="1px"
                  borderColor="border"
                  bg="bg.panel"
                  overflow="hidden"
                  transition="border-color 150ms ease, box-shadow 150ms ease"
                  _hover={{ borderColor: "primary.300" }}
                >
                  <Accordion.ItemTrigger
                    px={3}
                    py={2.5}
                    cursor="pointer"
                    _hover={{ bg: "bg.subtle" }}
                  >
                    <HStack flex="1" gap={2.5}>
                      <Flex
                        boxSize="26px"
                        rounded="lg"
                        align="center"
                        justify="center"
                        bg={enableTileGrid ? "brand.muted" : "bg.muted"}
                        color={enableTileGrid ? "brand.fg" : "fg.muted"}
                      >
                        <Grid3x3 size={14} />
                      </Flex>
                      <Text fontSize="sm" fontWeight="600" color="fg">
                        Tile Grid
                      </Text>
                      {enableTileGrid && (
                        <Badge
                          size="xs"
                          variant="subtle"
                          colorPalette="primary"
                          rounded="full"
                          px={1.5}
                        >
                          ON
                        </Badge>
                      )}
                    </HStack>
                    <Accordion.ItemIndicator color="fg.muted" />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent px={3} pb={3} pt={1}>
                    <TileToggleContainer id="tileToggle" />
                  </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item
                  value="mesh-grid"
                  rounded="xl"
                  borderWidth="1px"
                  borderColor="border"
                  bg="bg.panel"
                  overflow="hidden"
                  transition="border-color 150ms ease, box-shadow 150ms ease"
                  _hover={{ borderColor: "secondary.300" }}
                >
                  <Accordion.ItemTrigger
                    px={3}
                    py={2.5}
                    cursor="pointer"
                    _hover={{ bg: "bg.subtle" }}
                  >
                    <HStack flex="1" gap={2.5}>
                      <Flex
                        boxSize="26px"
                        rounded="lg"
                        align="center"
                        justify="center"
                        bg={enableMeshGrid ? "accent.muted" : "bg.muted"}
                        color={enableMeshGrid ? "accent.fg" : "fg.muted"}
                      >
                        <Layers size={14} />
                      </Flex>
                      <Text fontSize="sm" fontWeight="600" color="fg">
                        Mesh Grid
                      </Text>
                      {enableMeshGrid && (
                        <Badge
                          size="xs"
                          variant="subtle"
                          colorPalette="secondary"
                          rounded="full"
                          px={1.5}
                        >
                          ON
                        </Badge>
                      )}
                    </HStack>
                    <Accordion.ItemIndicator color="fg.muted" />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent px={3} pb={3} pt={1}>
                    <MeshToggleContainer id="meshToggle" />
                  </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item
                  value="marker"
                  rounded="xl"
                  borderWidth="1px"
                  borderColor="border"
                  bg="bg.panel"
                  overflow="hidden"
                  transition="border-color 150ms ease, box-shadow 150ms ease"
                  _hover={{ borderColor: "primary.300" }}
                >
                  <Accordion.ItemTrigger
                    px={3}
                    py={2.5}
                    cursor="pointer"
                    _hover={{ bg: "bg.subtle" }}
                  >
                    <HStack flex="1" gap={2.5}>
                      <Flex
                        boxSize="26px"
                        rounded="lg"
                        align="center"
                        justify="center"
                        bg={markerCount > 0 ? "brand.muted" : "bg.muted"}
                        color={markerCount > 0 ? "brand.fg" : "fg.muted"}
                      >
                        <MapPin size={14} />
                      </Flex>
                      <Text fontSize="sm" fontWeight="600" color="fg">
                        Marker
                      </Text>
                      {markerCount > 0 && (
                        <Badge
                          size="xs"
                          variant="solid"
                          colorPalette="primary"
                          rounded="full"
                          px={1.5}
                          fontFamily="mono"
                        >
                          {markerCount}
                        </Badge>
                      )}
                    </HStack>
                    <Accordion.ItemIndicator color="fg.muted" />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent px={3} pb={3} pt={1}>
                    <MarkerInputContainer id="markerInput" />
                  </Accordion.ItemContent>
                </Accordion.Item>

                <Accordion.Item
                  value="mesh-code"
                  rounded="xl"
                  borderWidth="1px"
                  borderColor="border"
                  bg="bg.panel"
                  overflow="hidden"
                  transition="border-color 150ms ease, box-shadow 150ms ease"
                  _hover={{ borderColor: "primary.300" }}
                >
                  <Accordion.ItemTrigger
                    px={3}
                    py={2.5}
                    cursor="pointer"
                    _hover={{ bg: "bg.subtle" }}
                  >
                    <HStack flex="1" gap={2.5}>
                      <Flex
                        boxSize="26px"
                        rounded="lg"
                        align="center"
                        justify="center"
                        bg={meshcodeCount > 0 ? "brand.muted" : "bg.muted"}
                        color={meshcodeCount > 0 ? "brand.fg" : "fg.muted"}
                      >
                        <Hash size={14} />
                      </Flex>
                      <Text fontSize="sm" fontWeight="600" color="fg">
                        Mesh Code
                      </Text>
                      {meshcodeCount > 0 && (
                        <Badge
                          size="xs"
                          variant="solid"
                          colorPalette="primary"
                          rounded="full"
                          px={1.5}
                          fontFamily="mono"
                        >
                          {meshcodeCount}
                        </Badge>
                      )}
                    </HStack>
                    <Accordion.ItemIndicator color="fg.muted" />
                  </Accordion.ItemTrigger>
                  <Accordion.ItemContent px={3} pb={3} pt={1}>
                    <Stack gap={3}>
                      <MeshcodesInputContainer id="meshCodeInput" />
                      <MeshDetailsContainer />
                    </Stack>
                  </Accordion.ItemContent>
                </Accordion.Item>
              </Accordion.Root>
            </Stack>
          </Box>
        </Box>
      )}

      <Box as="main" flex="1" position="relative" h="full">
        {!sidebarOpen && (
          <IconButton
            aria-label="Expand sidebar"
            title="Expand sidebar"
            position="absolute"
            top={3}
            left={14}
            zIndex={1000}
            size="sm"
            rounded="xl"
            bg="bg.panel"
            color="fg"
            borderWidth="1px"
            borderColor="border"
            shadow="md"
            onClick={() => setSidebarOpen(true)}
          >
            <PanelLeftOpen size={16} />
          </IconButton>
        )}

        <MapContainer />

        <HStack
          position="absolute"
          bottom={3}
          left={3}
          zIndex={500}
          pointerEvents="none"
          px={3}
          py={1.5}
          rounded="full"
          bg={colorMode === "dark" ? "rgba(17, 24, 39, 0.84)" : "rgba(255, 255, 255, 0.86)"}
          backdropFilter="blur(12px)"
          borderWidth="1px"
          borderColor="border"
          shadow="sm"
          gap={2}
          fontSize="xs"
        >
          <Text fontFamily="mono" fontWeight="600" color="brand.fg">
            {datum}
          </Text>
          <Text color="fg.subtle">·</Text>
          <Text fontFamily="mono" color="fg.muted">
            {unit}
          </Text>
          <Text color="fg.subtle" display={{ base: "none", md: "inline" }}>
            ·
          </Text>
          <Text color="fg.muted" display={{ base: "none", md: "inline" }}>
            Right-click map to inspect mesh scales
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
}
