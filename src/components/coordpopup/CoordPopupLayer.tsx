import { Box, HStack, IconButton, List, Stack, Text } from "@chakra-ui/react";
import { Check, ClipboardCopy } from "lucide-react";
import * as React from "react";
import { Popup } from "react-leaflet";
import meshCalculator, { type LatLng } from "../../domain/calculateMesh";
import { convertLatLngToTokyoIfNeeded } from "../../domain/convertLatLng";

function CopyableListItem({
  text,
  copyValue,
}: { text: string; copyValue: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <List.Item>
      <HStack justify="space-between">
        <Text fontSize="md">{text}</Text>
        <IconButton
          aria-label="Copy to clipboard"
          size="xs"
          variant="ghost"
          onClick={handleCopy}
        >
          {copied ? <Check size={14} /> : <ClipboardCopy size={14} />}
        </IconButton>
      </HStack>
    </List.Item>
  );
}

function getMeshCode(scale: number, datum: string, latLng: LatLng): string {
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return meshCalculator.toMeshCode(lat, lng, scale);
}

function createScaleCardContents(
  datum: string,
  latLng?: LatLng,
): React.ReactElement[] {
  if (latLng == null) {
    throw new Error("Unexpected exception occured. Missing latlang.");
  }
  return meshCalculator.SCALES.map((scale) => {
    const meshCode = getMeshCode(scale, datum, latLng);
    return (
      <CopyableListItem
        key={`coord_popup_item_scale_${scale}`}
        text={`scale${scale}: ${meshCode}`}
        copyValue={meshCode}
      />
    );
  });
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
            <CopyableListItem
              text={props.positionDescription}
              copyValue={`${props.position.lat},${props.position.lng}`}
            />
            {createScaleCardContents(props.datum, props.position)}
          </List.Root>
        </Box>
      </Box>
    </Popup>
  );
}
