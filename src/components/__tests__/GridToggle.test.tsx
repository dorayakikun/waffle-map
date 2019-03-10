import * as React from "react";
import * as render from "react-test-renderer";
import { GridToggle, Props } from "../GridToggle";

test("Should set props to MeshToggle", () => {
  const isShowGrid = false;
  const props: Props = {
    isShowGrid,
    onToggleChanged: () => {},
    title: "Show grid"
  };
  const tree = render.create(<GridToggle {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Should call onToggleChanged when changed checked", () => {
  const isShowGrid = false;
  const onToggleChanged = () => {};
  const props: Props = {
    isShowGrid,
    onToggleChanged,
    title: "Show grid"
  };
  const tree = render.create(<GridToggle {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
