import { Box, Grid, HStack, NativeSelect, Text } from "@chakra-ui/react";
import { Compass } from "lucide-react";
import type * as React from "react";

export type Props = {
  unit: string;
  datum: string;
  onUnitChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onDatumChanged: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

export function GeodeticInput(props: Props): React.ReactElement<Props> {
  return (
    <Box p={3} rounded="xl" borderWidth="1px" borderColor="border" bg="bg.panel">
      <HStack gap={1.5} mb={2.5} color="fg.muted">
        <Compass size={13} />
        <Text fontSize="2xs" fontWeight="700" textTransform="uppercase" letterSpacing="0.06em">
          Coordinate System
        </Text>
      </HStack>

      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Box>
          <Text fontSize="2xs" fontWeight="600" color="fg.muted" mb={1}>
            Unit
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              aria-label="Coordinate unit"
              onChange={props.onUnitChanged}
              value={props.unit}
              rounded="lg"
              bg="bg.subtle"
              borderColor="border"
              fontSize="xs"
              fontWeight="500"
            >
              <option value="millisec">millisec</option>
              <option value="degree">degree</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

        <Box>
          <Text fontSize="2xs" fontWeight="600" color="fg.muted" mb={1}>
            Datum
          </Text>
          <NativeSelect.Root size="sm">
            <NativeSelect.Field
              aria-label="Geodetic datum"
              onChange={props.onDatumChanged}
              value={props.datum}
              rounded="lg"
              bg="bg.subtle"
              borderColor="border"
              fontSize="xs"
              fontWeight="500"
            >
              <option value="Tokyo">Tokyo</option>
              <option value="WGS84">WGS84</option>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>
      </Grid>
    </Box>
  );
}
