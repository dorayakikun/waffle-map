import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";

import { GeodeticInputContainer } from "./GeodeticInputContainer";
import { MapContainer } from "./MapContainer";
import { MarkerInputContainer } from "./MarkerInputContainer";
import { MeshCodeInputContainer } from "./MeshCodeInputContainer";
import { MeshDetailsContainer } from "./MeshDetailsContainer";
import { MeshToggleContainer } from "./MeshToggleContainer";
import { TileToggleContainer } from "./TileToggleContainer";

export function AppContainer() {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem colSpan={1}>
        <Stack spacing={3}>
          <Stack direction="row" ml={3} mt={3} spacing={3}>
            <Image src={"/images/logo.png"} alt={"wafflemap"} />
            <Text fontSize={"3xl"}>wafflemap</Text>
          </Stack>
          <GeodeticInputContainer />
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={"1"} textAlign={"left"}>
                    Tile Grid
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TileToggleContainer id={"tileToggle"} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={"1"} textAlign={"left"}>
                    Mesh Grid
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <MeshToggleContainer id={"meshToggle"} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={"1"} textAlign={"left"}>
                    Marker
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <MarkerInputContainer id={"markerInput"} />
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex={"1"} textAlign={"left"}>
                    Mesh Code
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <MeshCodeInputContainer id={"meshCodeInput"} />
                <MeshDetailsContainer />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Stack>
      </GridItem>
      <GridItem colSpan={4}>
        <MapContainer />
      </GridItem>
    </Grid>
  );
}
