import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Datum, Unit } from "../../types";

export type Props = {
  unit: Unit;
  datum: Datum;
  onUnitChanged: (value: Unit) => void;
  onDatumChanged: (value: Datum) => void;
};

export function GeodeticInput(props: Props): React.ReactElement<Props> {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
          Unit
        </label>
        <Select value={props.unit} onValueChange={props.onUnitChanged}>
          <SelectTrigger className="w-full bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 shadow-sm hover:bg-slate-100 hover:border-slate-400 dark:hover:bg-slate-600 dark:hover:border-slate-500 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-slate-500 dark:focus:border-slate-400">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
            <SelectItem
              value="millisec"
              className="text-slate-900 dark:text-slate-100 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-500 dark:hover:text-white focus:bg-slate-200 focus:text-slate-900 dark:focus:bg-slate-500 dark:focus:text-white"
            >
              Milliseconds
            </SelectItem>
            <SelectItem
              value="degree"
              className="text-slate-900 dark:text-slate-100 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-500 dark:hover:text-white focus:bg-slate-200 focus:text-slate-900 dark:focus:bg-slate-500 dark:focus:text-white"
            >
              Degrees
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
          Datum
        </label>
        <Select value={props.datum} onValueChange={props.onDatumChanged}>
          <SelectTrigger className="w-full bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 shadow-sm hover:bg-slate-100 hover:border-slate-400 dark:hover:bg-slate-600 dark:hover:border-slate-500 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-slate-500 dark:focus:border-slate-400">
            <SelectValue placeholder="Select datum" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
            <SelectItem
              value="Tokyo"
              className="text-slate-900 dark:text-slate-100 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-500 dark:hover:text-white focus:bg-slate-200 focus:text-slate-900 dark:focus:bg-slate-500 dark:focus:text-white"
            >
              Tokyo Datum
            </SelectItem>
            <SelectItem
              value="WGS84"
              className="text-slate-900 dark:text-slate-100 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-500 dark:hover:text-white focus:bg-slate-200 focus:text-slate-900 dark:focus:bg-slate-500 dark:focus:text-white"
            >
              WGS84
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
