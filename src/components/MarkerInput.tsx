import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as React from "react";

export type Props = {
  id: string;
  latLng: string;
  errorMessage: string;
  putMarker: (latLng: string) => void;
  removeAllMarkers: () => void;
};

export type State = {
  latLng: string;
  errorMessage: string;
};

export function MarkerInput(props: Props) {
  const [latLng, setLatLng] = React.useState<string>(props.latLng || "");

  const handleChange = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) =>
      setLatLng((e.target as any).value),
    []
  );

  const handleClickPutAMarker = React.useCallback(
    (event: any) => {
      if (
        (event as React.KeyboardEvent<HTMLElement>).key === "Enter" ||
        (event as React.MouseEvent<HTMLElement>).type === "click"
      ) {
        props.putMarker(latLng);
      }
    },
    [latLng, props]
  );

  const handleClickRemoveAllMarkers = React.useCallback(
    () => props.removeAllMarkers(),
    [props]
  );

  return (
    <FormControl
      id={props.id}
      isInvalid={props.errorMessage !== ""}
      onKeyPress={handleClickPutAMarker}
    >
      <HStack spacing={3}>
        <Input onChange={handleChange} placeholder="lat,lng" value={latLng} />
        <Stack direction="row" spacing={3}>
          <Button
            leftIcon={<AddIcon />}
            colorScheme={"teal"}
            onClick={handleClickPutAMarker}
            width="128px"
            variant="outline"
          >
            Put
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme={"teal"}
            onClick={handleClickRemoveAllMarkers}
            width="128px"
            variant="outline"
          >
            Remove
          </Button>
        </Stack>
      </HStack>
      <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
