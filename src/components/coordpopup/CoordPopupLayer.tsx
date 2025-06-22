import * as React from "react";
import { Popup } from "react-leaflet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import meshCalculator, { LatLng } from "../../domain/calculateMesh";
import { convertLatLngToTokyoIfNeeded } from "../../domain/convertLatLng";

function createScaleDescription(
  scale: number,
  datum: string,
  latLng?: LatLng,
): string {
  if (latLng == null) {
    throw new Error("Unexpected exception occured. Missing latlang.");
  }
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return `scale${scale}: ${meshCalculator.toMeshCode(lat, lng, scale)}`;
}

function createScaleCardContents(
  datum: string,
  latLng?: LatLng,
): React.ReactElement[] {
  return meshCalculator.SCALES.map((scale, idx) => (
    <li key={`coord_popup_item_${idx}`} className="text-sm">
      {createScaleDescription(scale, datum, latLng)}
    </li>
  ));
}

type Props = {
  position: LatLng;
  datum: string;
  unit: string;
  positionDescription: string;
};

export function CoordPopupLayer(props: Props) {
  return (
    <Popup position={props.position}>
      <Card className="w-full max-w-sm shadow-lg border border-slate-200 dark:border-slate-600">
        <CardHeader className="bg-slate-700 text-white text-center rounded-t-lg">
          <CardTitle className="text-lg font-semibold">
            Mesh Scales
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 bg-white dark:bg-slate-100">
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-200 rounded-md border border-slate-200 dark:border-slate-300">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-900">
                {props.positionDescription}
              </p>
            </div>
            <div className="space-y-2">
              {meshCalculator.SCALES.map((scale, idx) => (
                <div 
                  key={`coord_popup_item_${idx}`} 
                  className="p-2 bg-slate-50 dark:bg-slate-200 rounded border border-slate-200 dark:border-slate-300"
                >
                  <span className="text-sm font-mono text-slate-700 dark:text-slate-900">
                    {createScaleDescription(scale, props.datum, props.position)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Popup>
  );
}
