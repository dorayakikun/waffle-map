import * as React from "react";
import { Button, Input, InputOnChangeData, Message } from "semantic-ui-react";

export interface Props {
  latLng: string;
  errorMessage: string;
  putMarker: (latLng: string) => void;
  removeAllMarkers: () => void;
}

export interface State {
  latLng: string;
  errorMessage: string;
}

export function MarkerInput(props: Props) {
  const [latLng, setLatLng] = React.useState<string>(props.latLng || "");

  const handleChange = React.useCallback(
    (_event: React.SyntheticEvent<HTMLElement>, data: InputOnChangeData) =>
      setLatLng(data.value),
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
    [latLng]
  );

  const handleClickRemoveAllMarkers = React.useCallback(
    () => props.removeAllMarkers(),
    []
  );

  return (
    <div onKeyPress={handleClickPutAMarker}>
      <Input
        error={props.errorMessage !== ""}
        inverted
        onChange={handleChange}
        placeholder="lat,lng"
        style={{
          marginBottom: "10px",
          marginRight: "3px",
          marginTop: "10px"
        }}
        value={latLng}
      />

      <Button icon="marker" onClick={handleClickPutAMarker} />
      <Button icon="trash" onClick={handleClickRemoveAllMarkers} />

      {props.errorMessage !== "" && (
        <Message negative>
          <Message.Header>Waffle Map Error</Message.Header>
          <p>{props.errorMessage}</p>
        </Message>
      )}
    </div>
  );
}
