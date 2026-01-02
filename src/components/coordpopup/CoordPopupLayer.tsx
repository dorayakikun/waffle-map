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
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
      setCopied(true);

      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
    }
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
    throw new Error("Unexpected exception occurred. Missing latLng.");
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
      <Box w={"full"} bg={"white"} _dark={{ bg: "neutral.800" }} rounded={"md"} overflow={"hidden"}>
        <Stack
          textAlign={"center"}
          p={4}
          color={"neutral.800"}
          _dark={{ color: "white" }}
          align={"center"}
        >
          <Text
            fontSize={"3xl"}
            bg={"purple.50"}
            _dark={{ bg: "purple.900" }}
            p={1}
            px={2}
            color={"purple.500"}
            rounded={"full"}
          >
            Scales
          </Text>
        </Stack>
        <Box bg={"neutral.50"} _dark={{ bg: "neutral.900" }} px={4} py={4}>
          <List.Root gap={2}>
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
