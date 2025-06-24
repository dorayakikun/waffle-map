import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../../types";

export type Props = {
  errorMessage: string;
  id: string;
  meshCodes: string;
  separator: Separator;
  onMeshecodesStringChanged: (
    e: React.SyntheticEvent<HTMLInputElement>,
  ) => void;
  onSeparatorChanged: (value: Separator) => void;
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
            className={`text-base bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-600 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 ${
              props.errorMessage
                ? "border-red-500 focus:ring-red-500 hover:border-red-600 dark:border-red-400 dark:focus:ring-red-400"
                : "border-slate-300 dark:border-slate-600 focus:border-slate-500 dark:focus:border-slate-400 hover:border-slate-400 dark:hover:border-slate-500"
            }`}
          />
          {props.errorMessage && (
            <div className="mt-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                {props.errorMessage}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-base font-bold text-slate-700 dark:text-slate-200 mb-2">
            Separator
          </label>
          <Select value={props.separator} onValueChange={props.onSeparatorChanged}>
            <SelectTrigger className="w-full bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-600 shadow-sm hover:bg-slate-100 hover:border-slate-400 dark:hover:bg-slate-600 dark:hover:border-slate-500 focus:ring-2 focus:ring-slate-500 dark:focus:ring-slate-400 focus:border-slate-500 dark:focus:border-slate-400">
              <SelectValue placeholder="Select separator" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600">
              <SelectItem
                value=","
                className="text-slate-900 dark:text-slate-100 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-500 dark:hover:text-white focus:bg-slate-200 focus:text-slate-900 dark:focus:bg-slate-500 dark:focus:text-white"
              >
                Commas (,)
              </SelectItem>
              <SelectItem
                value="."
                className="text-slate-900 dark:text-slate-100 hover:bg-slate-200 hover:text-slate-900 dark:hover:bg-slate-500 dark:hover:text-white focus:bg-slate-200 focus:text-slate-900 dark:focus:bg-slate-500 dark:focus:text-white"
              >
                Dots (.)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
