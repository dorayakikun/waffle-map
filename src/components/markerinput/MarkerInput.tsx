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
  errorMessage: string;
  latLngString: string;
  onPutMarkerClicked: (e: any) => void;
  onRemoveAllMarkersClicked: () => void;
};

export function MarkerInput(props: Props) {
  const [latLngString, setLatLngString] = React.useState<string>(
    props.latLngString || ""
  );

  const handleChange = React.useCallback(
    (e: React.SyntheticEvent<HTMLElement>) =>
      setLatLngString((e.target as any).value),
    []
  );

  return (
    <FormControl
      isInvalid={props.errorMessage !== ""}
      onKeyPress={props.onPutMarkerClicked}
    >
      <HStack spacing={3}>
        <Input
          onChange={handleChange}
          placeholder="lat,lng"
          value={latLngString}
        />
        <Stack direction="row" spacing={3}>
          <Button
            leftIcon={<AddIcon />}
            colorScheme={"teal"}
            onClick={props.onPutMarkerClicked}
            width="128px"
            variant="outline"
          >
            Put
          </Button>
          <Button
            leftIcon={<DeleteIcon />}
            colorScheme={"teal"}
            onClick={props.onRemoveAllMarkersClicked}
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
