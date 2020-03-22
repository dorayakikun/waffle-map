import * as React from "react";
import * as render from "react-test-renderer";
import { toBounds, toCenterLatLng } from "waffle-map-mesh-calculator-basic";
import { MeshDetail, Props } from "../MeshDetail";

test("Should set props to MeshDetail", () => {
  const meshCode = "5339";
  const center = toCenterLatLng(meshCode);
  const bounds = toBounds(meshCode);

  const props: Props = {
    bounds,
    center,
    code: meshCode,
  };
  const tree = render.create(<MeshDetail {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
