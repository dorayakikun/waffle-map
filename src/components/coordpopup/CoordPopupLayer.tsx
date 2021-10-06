import {
  Box,
  Text,
  Stack,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Popup } from "react-leaflet";
import meshCalculator, { LatLng } from "../../domain/calculateMesh";
import { convertLatLngToTokyoIfNeeded } from "../../domain/convertLatLng";

function createScaleDescription(
  scale: number,
  datum: string,
  latLng?: LatLng
): string {
  if (latLng == null) {
    throw new Error("Unexpected exception occured. Missing latlang.");
  }
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return `scale${scale}: ${meshCalculator.toMeshCode(lat, lng, scale)}`;
}

function createScaleCardContents(
  datum: string,
  latLng?: LatLng
): React.ReactElement[] {
  return meshCalculator.SCALES.map((scale, idx) => (
    <ListItem key={`coord_popup_item_${idx}`}>
      <Text fontSize={"md"}>
        {createScaleDescription(scale, datum, latLng)}
      </Text>
    </ListItem>
  ));
}
type Props = {
  position: LatLng;
  datum: string;
  unit: string;
  positionDescription: string;
};
export function CoordPopupLayer(props: Props) {
  return (
    <Popup position={props.position}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"3xl"}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            Scales
          </Text>
        </Stack>
        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={6}>
          <List spacing={3}>
            <ListItem>
              <Text fontSize="md">{props.positionDescription}</Text>
            </ListItem>
            {createScaleCardContents(props.datum, props.position)}
          </List>
        </Box>
      </Box>
    </Popup>
  );
}
