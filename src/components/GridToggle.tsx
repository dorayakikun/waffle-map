import * as React from "react";
import { Checkbox, CheckboxProps } from "semantic-ui-react";

export type Props = {
  title: string;
  isShowGrid: boolean;
  onToggleChanged: (
    event: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => void;
};

export function GridToggle(props: Props): React.ReactElement<Props> {
  return (
    <div>
      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <span style={{ color: "white", marginRight: 5 }}>{props.title}</span>
        <Checkbox
          checked={props.isShowGrid}
          onChange={props.onToggleChanged}
          toggle
        />
      </div>
    </div>
  );
}
