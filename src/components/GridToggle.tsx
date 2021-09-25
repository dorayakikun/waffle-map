import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import * as React from "react";

export type Props = {
  title: string;
  isShowGrid: boolean;
  onToggleChanged: (event: React.FormEvent<HTMLInputElement>) => void;
};

export function GridToggle(props: Props): React.ReactElement<Props> {
  return (
    <FormControl display={"flex"} alignItems={"center"}>
      <FormLabel htmlFor={props.title} mb={"0"}>
        {props.title}
      </FormLabel>
      <Switch
        id={props.title}
        isChecked={props.isShowGrid}
        onChange={props.onToggleChanged}
      />
    </FormControl>
  );
}
