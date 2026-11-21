import { Badge, Box, HStack, IconButton, List, Text } from "@chakra-ui/react";
import { Check, ClipboardCopy, Crosshair } from "lucide-react";
import * as React from "react";
import { Popup } from "react-leaflet";
import meshCalculator, { type LatLng } from "../../domain/calculateMesh";
import { convertLatLngToTokyoIfNeeded } from "../../domain/convertLatLng";

function CopyableListItem({ text, copyValue }: { text: string; copyValue: string }) {
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
    <List.Item listStyleType="none">
      <HStack
        justify="space-between"
        gap={3}
        px={2}
        py={1}
        rounded="md"
        transition="background-color 120ms ease"
        _hover={{ bg: "bg.muted" }}
      >
        <Text fontSize="xs" fontFamily="mono" fontVariantNumeric="tabular-nums" color="fg" m={0}>
          {text}
        </Text>
        <IconButton
          aria-label="Copy to clipboard"
          size="2xs"
          variant="ghost"
          rounded="md"
          color={copied ? "success.600" : "fg.muted"}
          onClick={handleCopy}
        >
          {copied ? <Check size={13} /> : <ClipboardCopy size={13} />}
        </IconButton>
      </HStack>
    </List.Item>
  );
}

function getMeshCode(scale: number, datum: string, latLng: LatLng): string {
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return meshCalculator.toMeshCode(lat, lng, scale);
}

function createScaleCardContents(datum: string, latLng?: LatLng): React.ReactElement[] {
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
      <Box
        w="full"
        bg="bg.panel"
        color="fg"
        rounded="xl"
        borderWidth="1px"
        borderColor="border"
        overflow="hidden"
      >
        <HStack
          px={3.5}
          py={2.5}
          pr={9}
          justify="space-between"
          bg="bg.subtle"
          borderBottomWidth="1px"
          borderColor="border"
        >
          <HStack gap={1.5}>
            <Box color="brand.fg">
              <Crosshair size={14} />
            </Box>
            <Text fontSize="xs" fontWeight="700" color="fg" m={0}>
              Scales
            </Text>
          </HStack>
          <Badge size="xs" variant="subtle" colorPalette="primary" rounded="full" fontFamily="mono">
            {props.datum} · {props.unit}
          </Badge>
        </HStack>

        <Box px={2} py={2}>
          <List.Root gap={0.5} m={0}>
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
