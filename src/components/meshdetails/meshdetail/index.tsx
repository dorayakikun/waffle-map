import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { LatLng } from "../../../domain/calculateMesh";
import { round } from "../../../domain/roundPoint";

export type Props = {
  code: string;
  rows: { latLng: LatLng; title: string }[];
};

export function MeshDetail(props: Props): React.ReactElement<Props> {
  return (
    <div className="mt-4 p-4 bg-white dark:bg-slate-100 rounded-md border border-slate-200 dark:border-slate-300 shadow-sm">
      <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-900 mb-3">Mesh Details</h4>
      <div className="overflow-hidden rounded-md border border-slate-200 dark:border-slate-300">
        <Table>
          <TableBody>
            <TableRow className="bg-slate-50 dark:bg-slate-200">
              <TableCell className="font-medium text-slate-900 dark:text-slate-900">Mesh Code</TableCell>
              <TableCell className="font-mono text-slate-900 dark:text-slate-900">{props.code}</TableCell>
            </TableRow>
            {props.rows.map((row) => (
              <TableRow key={`${props.code}-${row.title}`} className="hover:bg-slate-100 hover:border-slate-400 dark:hover:bg-slate-300 dark:hover:border-slate-400 transition-colors">
                <TableCell className="font-medium text-slate-900 dark:text-slate-900">{row.title}</TableCell>
                <TableCell className="font-mono text-slate-900 dark:text-slate-900">
                  <div className="space-y-1">
                    <div>Lat: {round(row.latLng.lat, 5)}</div>
                    <div>Lng: {round(row.latLng.lng, 5)}</div>
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
