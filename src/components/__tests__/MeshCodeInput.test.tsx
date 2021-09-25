import * as React from "react";
/** @jsx jsx */
import { jsx } from "@emotion/react";
import * as render from "react-test-renderer";
import { MeshCodeInput, Props } from "../MeshCodeInput";

const defaultProps: Props = {
  errorMessage: "",
  id: "meshCodeInput",
  meshCodes: "",
  onMeshesChanged: () => {},
  onSeparatorChanged: () => {},
  separator: ".",
};

test("Should set props to MeshCodeInput", () => {
  const tree = render.create(<MeshCodeInput {...defaultProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("Should render negative message when errorMessage is not blank", () => {
  const invalidProps = {
    ...defaultProps,
    errorMessage: "It seems there was something wrong ...",
    meshCodes: "5",
  };
  const tree = render.create(<MeshCodeInput {...invalidProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
