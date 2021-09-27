import {
  Box,
  Text,
  Stack,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { Popup, useMapEvents } from "react-leaflet";
import meshCalculator, { LatLng } from "../domain/calculateMesh";
import {
  convertLatLngToMillisecIfNeeded,
  convertLatLngToTokyoIfNeeded,
} from "../domain/convertLatLng";
import { round } from "../domain/roundPoint";

type Props = {
  datum: string;
  unit: string;
};

function createPositionDescription(
  datum: string,
  unit: string,
  latLng?: LatLng
): string {
  if (latLng == null) {
    throw new Error("latLng is missing.");
  }

  const a = convertLatLngToTokyoIfNeeded(latLng, datum);
  const b = convertLatLngToMillisecIfNeeded(a, unit);
  return `position: ${round(b.lat, 5)}, ${round(b.lng, 5)}`;
}

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
      {createScaleDescription(scale, datum, latLng)}
    </ListItem>
  ));
}
type _Props = {
  position: LatLng;
  datum: string;
  unit: string;
};
function CoordPopup(props: _Props) {
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
        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              {createPositionDescription(
                props.datum,
                props.unit,
                props.position
              )}
            </ListItem>
            {createScaleCardContents(props.datum, props.position)}
          </List>
        </Box>
      </Box>
    </Popup>
  );
}

export function CoordPopupLayer(props: Props): React.ReactElement | null {
  const [position, setPosition] = React.useState<LatLng | undefined>(undefined);
  useMapEvents({
    contextmenu(e) {
      setPosition(e.latlng);
    },
  });
  return position === undefined ? null : (
    <CoordPopup position={position} datum={props.datum} unit={props.unit} />
  );
}
