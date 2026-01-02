import { Accordion, Box, Flex, Image, Stack, Text } from "@chakra-ui/react";

import { GeodeticInputContainer } from "../components/geodeticInput/";
import { MapContainer } from "../components/map/";
import { MarkerInputContainer } from "../components/markerinput";
import { MeshcodesInputContainer } from "../components/meshcodeinput/index";
import { MeshDetailsContainer } from "../components/meshdetails";
import { MeshToggleContainer } from "../components/meshtoggle/";
import { TileToggleContainer } from "../components/tileToggle";

export function AppContainer() {
  return (
    <Flex h="100vh">
      <Box
        as="aside"
        w="320px"
        minW="280px"
        flexShrink={0}
        overflowY="auto"
        borderRight="1px solid"
        borderColor="neutral.200"
        bg="neutral.50"
        _dark={{ borderColor: "neutral.700", bg: "neutral.900" }}
      >
        <Stack gap={2} p={2}>
          <Stack direction="row" ml={2} mt={2} gap={2} align="center">
            <Image src={"/images/logo.png"} alt={"wafflemap"} boxSize="32px" />
            <Text fontSize={"2xl"} fontWeight="bold" color="purple.600">
              wafflemap
            </Text>
          </Stack>
          <GeodeticInputContainer />
          <Accordion.Root collapsible>
            <Accordion.Item value="tile-grid">
              <Accordion.ItemTrigger>
                <Box flex={"1"} textAlign={"left"}>
                  Tile Grid
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb={2}>
                <TileToggleContainer id={"tileToggle"} />
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="mesh-grid">
              <Accordion.ItemTrigger>
                <Box flex={"1"} textAlign={"left"}>
                  Mesh Grid
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb={2}>
                <MeshToggleContainer id={"meshToggle"} />
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="marker">
              <Accordion.ItemTrigger>
                <Box flex={"1"} textAlign={"left"}>
                  Marker
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb={2}>
                <MarkerInputContainer id={"markerInput"} />
              </Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="mesh-code">
              <Accordion.ItemTrigger>
                <Box flex={"1"} textAlign={"left"}>
                  Mesh Code
                </Box>
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.ItemContent pb={2}>
                <MeshcodesInputContainer id={"meshCodeInput"} />
                <MeshDetailsContainer />
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Stack>
      </Box>
      <Box as="main" flex="1" position="relative">
        <MapContainer />
      </Box>
    </Flex>
  );
}
