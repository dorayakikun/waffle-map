import { Box, Button, Field, HStack, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { Plus, Trash2, X } from "lucide-react";
import type * as React from "react";
import type { LatLng } from "../../domain/calculateMesh";
import { round } from "../../domain/roundPoint";

export type Props = {
  errorMessage: string;
  latLngString: string;
  id: string;
  positions?: LatLng[];
  handleLatLangStringChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPutMarkerClicked: () => void;
  onRemoveAllMarkersClicked: () => void;
  onRemoveMarkerClicked?: (index: number) => void;
};

export function MarkerInput(props: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      props.onPutMarkerClicked();
    }
  };

  return (
    <Stack gap={2.5}>
      <Field.Root id={props.id} invalid={props.errorMessage !== ""}>
        <Stack gap={2} w="full">
          <Input
            size="sm"
            rounded="lg"
            bg="bg.subtle"
            fontFamily="mono"
            fontSize="xs"
            onChange={props.handleLatLangStringChanged}
            onKeyDown={handleKeyDown}
            placeholder="lat,lng"
            value={props.latLngString}
          />
          <HStack gap={2} w="full">
            <Button
              size="sm"
              flex="1"
              rounded="lg"
              colorPalette="primary"
              variant="solid"
              onClick={props.onPutMarkerClicked}
            >
              <Plus size={14} />
              Put
            </Button>
            <Button
              size="sm"
              flex="1"
              rounded="lg"
              colorPalette="neutral"
              variant="outline"
              onClick={props.onRemoveAllMarkersClicked}
            >
              <Trash2 size={14} />
              Remove
            </Button>
          </HStack>
        </Stack>
        <Field.ErrorText fontSize="xs" mt={1}>
          {props.errorMessage}
        </Field.ErrorText>
      </Field.Root>

      {props.positions && props.positions.length > 0 && (
        <Stack gap={1} maxH="140px" overflowY="auto" pt={1}>
          {(() => {
            const seen = new Map<string, number>();
            return props.positions.map((pos, idx) => {
              const baseKey = `${pos.lat}-${pos.lng}`;
              const occurrence = seen.get(baseKey) ?? 0;
              seen.set(baseKey, occurrence + 1);
              return (
                <HStack
                  key={`${baseKey}-${occurrence}`}
                  px={2.5}
                  py={1.5}
                  rounded="lg"
                  bg="bg.subtle"
                  borderWidth="1px"
                  borderColor="border.muted"
                  justify="space-between"
                >
                  <Box>
                    <Text
                      fontSize="xs"
                      fontFamily="mono"
                      fontVariantNumeric="tabular-nums"
                      color="fg"
                    >
                      {round(pos.lat, 5)}, {round(pos.lng, 5)}
                    </Text>
                  </Box>
                  {props.onRemoveMarkerClicked && (
                    <IconButton
                      aria-label="Delete marker"
                      size="2xs"
                      variant="ghost"
                      rounded="md"
                      color="fg.muted"
                      onClick={() => props.onRemoveMarkerClicked?.(idx)}
                    >
                      <X size={12} />
                    </IconButton>
                  )}
                </HStack>
              );
            });
          })()}
        </Stack>
      )}
    </Stack>
  );
}
