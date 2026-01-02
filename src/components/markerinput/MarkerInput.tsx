import { Button, Field, HStack, Input, Stack } from "@chakra-ui/react";
import { Plus, Trash2 } from "lucide-react";
import type * as React from "react";

export type Props = {
  errorMessage: string;
  latLngString: string;
  id: string;
  handleLatLangStringChanged: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPutMarkerClicked: () => void;
  onRemoveAllMarkersClicked: () => void;
};

export function MarkerInput(props: Props) {
  return (
    <Field.Root id={props.id} invalid={props.errorMessage !== ""}>
      <Stack gap={3}>
        <Input
          onChange={props.handleLatLangStringChanged}
          placeholder="lat,lng"
          value={props.latLngString}
        />
        <HStack gap={3}>
          <Button
            colorPalette={"teal"}
            onClick={props.onPutMarkerClicked}
            width="128px"
            variant="outline"
          >
            <Plus size={16} />
            Put
          </Button>
          <Button
            colorPalette={"teal"}
            onClick={props.onRemoveAllMarkersClicked}
            width="128px"
            variant="outline"
          >
            <Trash2 size={16} />
            Remove
          </Button>
        </HStack>
      </Stack>
      <Field.ErrorText>{props.errorMessage}</Field.ErrorText>
    </Field.Root>
  );
}
