import * as React from "react";
import { Copy, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { LatLng } from "../../../domain/calculateMesh";
import { round } from "../../../domain/roundPoint";

export type Props = {
  code: string;
  rows: { latLng: LatLng; title: string }[];
};

export function MeshDetail(props: Props): React.ReactElement<Props> {
  const [copiedItem, setCopiedItem] = React.useState<string | null>(null);

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(itemId);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const copyMeshCode = async () => {
    await copyToClipboard(props.code, 'mesh-code');
  };

  const copyLatLng = async (latLng: LatLng, title: string) => {
    const positionText = `${round(latLng.lat, 5)}, ${round(latLng.lng, 5)}`;
    await copyToClipboard(positionText, `latlng-${title}`);
  };

  return (
    <div className="mt-4 p-4 bg-white dark:bg-slate-100 rounded-md border border-slate-200 dark:border-slate-300 shadow-sm">
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-900 mb-3">Mesh Details</h4>
      <div className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-300">
        <Table>
          <TableBody>
            <TableRow className="bg-slate-50 dark:bg-slate-200">
              <TableCell className="font-medium text-slate-900 dark:text-slate-900">Mesh Code</TableCell>
              <TableCell className="font-mono text-slate-900 dark:text-slate-900">
                <div className="flex items-center justify-between">
                  <span>{props.code}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyMeshCode}
                    className="h-6 w-6 p-0 hover:bg-slate-200 dark:hover:bg-slate-300"
                  >
                    {copiedItem === 'mesh-code' ? (
                      <Check className="h-3 w-3 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 text-slate-600 dark:text-slate-700" />
                    )}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            {props.rows.map((row) => (
              <TableRow key={`${props.code}-${row.title}`} className="hover:bg-slate-100 hover:border-slate-400 dark:hover:bg-slate-300 dark:hover:border-slate-400 transition-colors">
                <TableCell className="font-medium text-slate-900 dark:text-slate-900">{row.title}</TableCell>
                <TableCell className="font-mono text-slate-900 dark:text-slate-900">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div>Lat: {round(row.latLng.lat, 5)}</div>
                      <div>Lng: {round(row.latLng.lng, 5)}</div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyLatLng(row.latLng, row.title)}
                      className="h-6 w-6 p-0 hover:bg-slate-200 dark:hover:bg-slate-300"
                    >
                      {copiedItem === `latlng-${row.title}` ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3 text-slate-600 dark:text-slate-700" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
