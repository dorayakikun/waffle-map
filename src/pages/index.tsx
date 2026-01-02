import { Accordion, Box, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";

import { GeodeticInputContainer } from "../components/geodeticInput/";
import { MapContainer } from "../components/map/";
import { MarkerInputContainer } from "../components/markerinput";
import { MeshcodesInputContainer } from "../components/meshcodeinput/index";
import { MeshDetailsContainer } from "../components/meshdetails";
import { MeshToggleContainer } from "../components/meshtoggle/";
import { TileToggleContainer } from "../components/tileToggle";

export function AppContainer() {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem colSpan={1}>
        <Stack gap={3}>
          <Stack direction="row" ml={3} mt={3} gap={3}>
            <Image src={"/images/logo.png"} alt={"wafflemap"} />
            <Text fontSize={"3xl"}>wafflemap</Text>
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
              <Accordion.ItemContent pb={4}>
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
              <Accordion.ItemContent pb={4}>
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
              <Accordion.ItemContent pb={4}>
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
              <Accordion.ItemContent pb={4}>
                <MeshcodesInputContainer id={"meshCodeInput"} />
                <MeshDetailsContainer />
              </Accordion.ItemContent>
            </Accordion.Item>
          </Accordion.Root>
        </Stack>
      </GridItem>
      <GridItem colSpan={4}>
        <MapContainer />
      </GridItem>
    </Grid>
  );
}
