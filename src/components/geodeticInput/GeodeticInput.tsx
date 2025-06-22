import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Props = {
  unit: string;
  datum: string;
  onUnitChanged: (value: string) => void;
  onDatumChanged: (value: string) => void;
};

export function GeodeticInput(props: Props): React.ReactElement<Props> {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
          Unit
        </label>
        <Select value={props.unit} onValueChange={props.onUnitChanged}>
          <SelectTrigger className="bg-white dark:bg-slate-100 text-slate-900 dark:text-slate-900 text-base border-slate-300 dark:border-slate-300 shadow-sm hover:bg-slate-50 hover:border-slate-400 dark:hover:bg-slate-200 dark:hover:border-slate-400 focus:ring-2 focus:ring-slate-500 focus:border-slate-500">
            <SelectValue placeholder="Select unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="millisec">Milliseconds</SelectItem>
            <SelectItem value="degree">Degrees</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <label className="block text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
          Datum
        </label>
        <Select value={props.datum} onValueChange={props.onDatumChanged}>
          <SelectTrigger className="bg-white dark:bg-slate-100 text-slate-900 dark:text-slate-900 text-base border-slate-300 dark:border-slate-300 shadow-sm hover:bg-slate-50 hover:border-slate-400 dark:hover:bg-slate-200 dark:hover:border-slate-400 focus:ring-2 focus:ring-slate-500 focus:border-slate-500">
            <SelectValue placeholder="Select datum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Tokyo">Tokyo Datum</SelectItem>
            <SelectItem value="WGS84">WGS84</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
