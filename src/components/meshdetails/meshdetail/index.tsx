import { Box, HStack, IconButton, Table, Text } from "@chakra-ui/react";
import { Check, ClipboardCopy } from "lucide-react";
import * as React from "react";
import type { LatLng } from "../../../domain/calculateMesh";
import { round } from "../../../domain/roundPoint";

export type Props = {
  code: string;
  rows: { latLng: LatLng; title: string }[];
};

export function MeshDetail(props: Props): React.ReactElement<Props> {
  const [copied, setCopied] = React.useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(props.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Failed to copy mesh code:", error);
    }
  };

  return (
    <Box rounded="lg" borderWidth="1px" borderColor="border" bg="bg.subtle" overflow="hidden">
      <HStack
        px={2.5}
        py={1.5}
        justify="space-between"
        bg="brand.subtle"
        borderBottomWidth="1px"
        borderColor="border"
      >
        <HStack gap={1.5}>
          <Box boxSize="6px" rounded="full" bg="primary.500" />
          <Text fontSize="xs" fontWeight="700" fontFamily="mono" color="brand.fg">
            {props.code}
          </Text>
        </HStack>
        <IconButton
          aria-label={`Copy mesh code ${props.code}`}
          size="2xs"
          variant="ghost"
          rounded="md"
          color={copied ? "success.600" : "fg.muted"}
          onClick={handleCopyCode}
        >
          {copied ? <Check size={12} /> : <ClipboardCopy size={12} />}
        </IconButton>
      </HStack>

      <Table.Root size="sm" variant="line">
        <Table.Body>
          <Table.Row>
            <Table.Cell py={1.5} px={2.5} fontSize="2xs" color="fg.muted" fontWeight="600">
              mesh code
            </Table.Cell>
            <Table.Cell
              py={1.5}
              px={2.5}
              fontSize="xs"
              fontFamily="mono"
              fontVariantNumeric="tabular-nums"
              color="fg"
            >
              {props.code}
            </Table.Cell>
          </Table.Row>
          {props.rows.map((row) => (
            <Table.Row key={`${props.code}-${row.title}`}>
              <Table.Cell py={1.5} px={2.5} fontSize="2xs" color="fg.muted" fontWeight="600">
                {row.title}
              </Table.Cell>
              <Table.Cell
                py={1.5}
                px={2.5}
                fontSize="xs"
                fontFamily="mono"
                fontVariantNumeric="tabular-nums"
                color="fg"
                lineHeight="1.35"
              >
                {round(row.latLng.lat, 5)}
                <br />
                {round(row.latLng.lng, 5)}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
