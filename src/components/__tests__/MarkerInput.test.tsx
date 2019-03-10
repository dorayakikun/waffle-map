import * as React from "react";
import * as render from "react-test-renderer";
import { MarkerInput, Props } from "../MarkerInput";

const props: Props = {
  errorMessage: "",
  latLng: "",
  putMarker: () => {},
  removeAllMarkers: () => {}
};

test("Should set props to MarkerInput", () => {
  const tree = render.create(<MarkerInput {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Should set props to MarkerInput(datum is Tokyo)", () => {
  const errorMessage = "It seems there was something wrong ...";
  const latLng = "lat,lng";
  const newProps = { ...props, errorMessage, latLng };
  const tree = render.create(<MarkerInput {...newProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
