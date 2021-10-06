import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import * as React from "react";

export type Props = {
  enableGrid: boolean;
  id: string;
  handleChanged: (event: React.FormEvent<HTMLInputElement>) => void;
  title: string;
};

export const GridToggle = (props: Props) => {
  return (
    <FormControl id={props.id} display={"flex"} alignItems={"center"}>
      <FormLabel htmlFor={props.title} mb={"0"}>
        {props.title}
      </FormLabel>
      <Switch
        id={props.title}
        isChecked={props.enableGrid}
        onChange={props.handleChanged}
      />
    </FormControl>
  );
};
