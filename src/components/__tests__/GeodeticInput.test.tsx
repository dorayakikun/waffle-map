import * as React from "react";
import * as render from "react-test-renderer";
import { GeodeticInput, Props } from "../GeodeticInput";

const props: Props = {
  changeUnit: () => {},
  datum: "WGS84",
  onDatumChanged: () => {},
  unit: "degree"
};

test("Should set props to GeodeticInput", () => {
  const tree = render.create(<GeodeticInput {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Should set props to GeodeticInput(datum is Tokyo)", () => {
  const datum = "Tokyo";
  const newProps = { ...props, datum };
  const tree = render.create(<GeodeticInput {...newProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Should set props to GeodeticInput(unit is millisec)", () => {
  const unit = "millisec";
  const newProps = { ...props, unit };
  const tree = render.create(<GeodeticInput {...newProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
