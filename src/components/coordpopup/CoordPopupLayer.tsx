import * as React from "react";
import { Popup } from "react-leaflet";
import { Check, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMeshCalculator, LatLng } from "../../domain/calculateMesh";
import { convertLatLngToTokyoIfNeeded } from "../../domain/convertLatLng";
import { round } from "../../domain/roundPoint";

function createScaleDescription(
  scale: number,
  datum: string,
  latLng: LatLng,
  meshCalculator: any,
): string {
  const { lat, lng } = convertLatLngToTokyoIfNeeded(latLng, datum);
  return `scale${scale}: ${meshCalculator.toMeshCode(lat, lng, scale)}`;
}

type Props = {
  position: LatLng;
  datum: string;
  unit: string;
  positionDescription: string;
};

export function CoordPopupLayer(props: Props) {
  const [copiedItem, setCopiedItem] = React.useState<string | null>(null);
  const [meshCalculator, setMeshCalculator] = React.useState<any>(null);

  // Load mesh calculator on component mount
  React.useEffect(() => {
    getMeshCalculator().then(setMeshCalculator);
  }, []);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error("Failed to copy to clipboard:", err);
    }
  };

  const copyPosition = async () => {
    const positionText = `${round(props.position.lat, 5)}, ${round(props.position.lng, 5)}`;
    await copyToClipboard(positionText, "position");
  };

  const copyMeshCode = async (scale: number) => {
    if (!meshCalculator) return;
    const { lat, lng } = convertLatLngToTokyoIfNeeded(props.position, props.datum);
    const meshCode = meshCalculator.toMeshCode(lat, lng, scale);
    await copyToClipboard(meshCode, `scale-${scale}`);
  };

  // Show loading state while mesh calculator is loading
  if (!meshCalculator) {
    return (
      <Popup position={props.position}>
        <Card className="w-full max-w-sm shadow-lg border border-slate-200 dark:border-slate-600">
          <CardHeader className="bg-slate-700 text-white text-center rounded-t-lg">
            <CardTitle className="text-lg font-semibold">Loading...</CardTitle>
          </CardHeader>
        </Card>
      </Popup>
    );
  }

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
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-900">
                  {props.positionDescription}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyPosition}
                  className="h-6 w-6 p-0 hover:bg-slate-200 dark:hover:bg-slate-300"
                >
                  {copiedItem === "position"
                    ? <Check className="h-3 w-3 text-green-600" />
                    : <Copy className="h-3 w-3 text-slate-600 dark:text-slate-700" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              {meshCalculator.SCALES.map((scale: number, idx: number) => (
                <div
                  key={`coord_popup_item_${idx}`}
                  className="p-2 bg-slate-50 dark:bg-slate-200 rounded border border-slate-200 dark:border-slate-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-slate-700 dark:text-slate-900">
                      {createScaleDescription(scale, props.datum, props.position, meshCalculator)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyMeshCode(scale)}
                      className="h-6 w-6 p-0 hover:bg-slate-200 dark:hover:bg-slate-300"
                    >
                      {copiedItem === `scale-${scale}`
                        ? <Check className="h-3 w-3 text-green-600" />
                        : <Copy className="h-3 w-3 text-slate-600 dark:text-slate-700" />}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Popup>
  );
}
