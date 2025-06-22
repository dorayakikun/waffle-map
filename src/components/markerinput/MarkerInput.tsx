import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type Props = {
  errorMessage: string;
  latLngString: string;
  id: string;
  handleLatLangStringChanged: (e: any) => void;
  onPutMarkerClicked: () => void;
  onRemoveAllMarkersClicked: () => void;
};

export function MarkerInput(props: Props) {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Input
          id={props.id}
          onChange={props.handleLatLangStringChanged}
          placeholder="Please enter coordinates like '35.6762, 139.6503'"
          value={props.latLngString}
          className={`text-base bg-white dark:bg-slate-100 text-slate-900 dark:text-slate-900 shadow-sm placeholder:text-slate-400 hover:bg-slate-50 hover:border-slate-400 dark:hover:bg-slate-200 dark:hover:border-slate-400 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 ${props.errorMessage ? "border-red-500 focus:ring-red-500 hover:border-red-600" : "border-slate-300 dark:border-slate-300"}`}
        />
        <div className="grid grid-cols-1 gap-3">
          <Button
            onClick={props.onPutMarkerClicked}
            variant="default"
            size="default"
            className="w-full bg-slate-700 hover:bg-slate-800 text-white font-semibold"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Marker
          </Button>
          <Button
            onClick={props.onRemoveAllMarkersClicked}
            variant="outline"
            size="default"
            className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-950 font-semibold"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove All
          </Button>
        </div>
      </div>
      {props.errorMessage && (
        <div className="p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">{props.errorMessage}</p>
        </div>
      )}
    </div>
  );
}
