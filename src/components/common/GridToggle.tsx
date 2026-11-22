import { HStack, Switch } from "@chakra-ui/react";

export type Props = {
  enableGrid: boolean;
  id: string;
  handleChanged: (details: { checked: boolean }) => void;
  title: string;
};

export const GridToggle = (props: Props) => {
  return (
    <HStack
      id={props.id}
      px={2.5}
      py={2}
      rounded="lg"
      bg={props.enableGrid ? "brand.subtle" : "bg.subtle"}
      borderWidth="1px"
      borderColor={props.enableGrid ? "brand.muted" : "border.muted"}
      transition="background-color 150ms ease, border-color 150ms ease"
    >
      <Switch.Root
        w="full"
        justifyContent="space-between"
        colorPalette="primary"
        checked={props.enableGrid}
        onCheckedChange={props.handleChanged}
      >
        <Switch.HiddenInput />
        <Switch.Label fontSize="xs" fontWeight="500" color="fg" cursor="pointer">
          {props.title}
        </Switch.Label>
        <Switch.Control cursor="pointer">
          <Switch.Thumb />
        </Switch.Control>
      </Switch.Root>
    </HStack>
  );
};
