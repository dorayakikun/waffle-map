import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type Props = {
  errorMessage: string;
  id: string;
  meshCodes: string;
  separator: string;
  onMeshecodesStringChanged: (
    e: React.SyntheticEvent<HTMLInputElement>,
  ) => void;
  onSeparatorChanged: (value: string) => void;
};

export function MeshcodesInput(props: Props): React.ReactElement<Props> {
  const placeholder = React.useCallback(() => {
    const example = ["5339-35-97", "5339-35-98", "5339-35-99"].join(props.separator);
    return `Please enter mesh codes like '${example}'`;
  }, [props.separator]);

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div>
          <label className="block text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
            Mesh Codes
          </label>
          <Input
            id={props.id}
            placeholder={placeholder()}
            onChange={props.onMeshecodesStringChanged}
            value={props.meshCodes}
            className={`text-base bg-white dark:bg-slate-100 text-slate-900 dark:text-slate-900 shadow-sm placeholder:text-slate-400 hover:bg-slate-50 hover:border-slate-400 dark:hover:bg-slate-200 dark:hover:border-slate-400 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${props.errorMessage ? "border-red-500 focus:ring-red-500 hover:border-red-600" : "border-slate-300 dark:border-slate-300"}`}
          />
          {props.errorMessage && (
            <div className="mt-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">{props.errorMessage}</p>
            </div>
          )}
        </div>
        
        <div>
          <label className="block text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
            Separator
          </label>
          <Select value={props.separator} onValueChange={props.onSeparatorChanged}>
            <SelectTrigger className="bg-white dark:bg-slate-100 text-slate-900 dark:text-slate-900 text-base border-slate-300 dark:border-slate-300 shadow-sm hover:bg-slate-50 hover:border-slate-400 dark:hover:bg-slate-200 dark:hover:border-slate-400 focus:ring-2 focus:ring-slate-500 focus:border-slate-500">
              <SelectValue placeholder="Select separator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value=",">Commas (,)</SelectItem>
              <SelectItem value=".">Dots (.)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
