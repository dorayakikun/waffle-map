import { Box, List, Stack, Text } from "@chakra-ui/react";
import type * as React from "react";
import { Popup } from "react-leaflet";
import meshCalculator, { type LatLng } from "../../domain/calculateMesh";
import { convertLatLngToTokyoIfNeeded } from "../../domain/convertLatLng";

function createScaleDescription(scale: number, datum: string, latLng?: LatLng): string {
  if (latLng == null) {
    throw new Error("Unexpected exception occured. Missing latlang.");
  }
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return `scale${scale}: ${meshCalculator.toMeshCode(lat, lng, scale)}`;
}

function createScaleCardContents(datum: string, latLng?: LatLng): React.ReactElement[] {
  return meshCalculator.SCALES.map((scale) => (
    <List.Item key={`coord_popup_item_scale_${scale}`}>
      <Text fontSize={"md"}>{createScaleDescription(scale, datum, latLng)}</Text>
    </List.Item>
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
      <Box w={"full"} bg={"white"} _dark={{ bg: "gray.800" }} rounded={"md"} overflow={"hidden"}>
        <Stack
          textAlign={"center"}
          p={6}
          color={"gray.800"}
          _dark={{ color: "white" }}
          align={"center"}
        >
          <Text
            fontSize={"3xl"}
            bg={"green.50"}
            _dark={{ bg: "green.900" }}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            Scales
          </Text>
        </Stack>
        <Box bg={"gray.50"} _dark={{ bg: "gray.900" }} px={6} py={6}>
          <List.Root gap={3}>
            <List.Item>
              <Text fontSize="md">{props.positionDescription}</Text>
            </List.Item>
            {createScaleCardContents(props.datum, props.position)}
          </List.Root>
        </Box>
      </Box>
    </Popup>
  );
}
