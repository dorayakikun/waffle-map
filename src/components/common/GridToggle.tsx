import { HStack, Switch } from "@chakra-ui/react";
import type * as React from "react";

export type Props = {
  enableGrid: boolean;
  id: string;
  handleChanged: (details: { checked: boolean }) => void;
  title: string;
};

export const GridToggle = (props: Props) => {
  return (
    <HStack id={props.id}>
      <Switch.Root checked={props.enableGrid} onCheckedChange={props.handleChanged}>
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>{props.title}</Switch.Label>
      </Switch.Root>
    </HStack>
  );
};
