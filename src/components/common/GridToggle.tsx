import * as React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export type Props = {
  enableGrid: boolean;
  id: string;
  handleChanged: (checked: boolean) => void;
  title: string;
};

export const GridToggle = (props: Props) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-100 rounded-lg border border-slate-200 dark:border-slate-300 shadow-sm hover:bg-slate-50 hover:border-slate-400 dark:hover:bg-slate-200 dark:hover:border-slate-400 transition-colors">
      <Label htmlFor={props.id} className="text-base font-bold text-slate-700 dark:text-slate-900 cursor-pointer">
        {props.title}
      </Label>
      <div className="ml-4">
        <Switch
          id={props.id}
          checked={props.enableGrid}
          onCheckedChange={props.handleChanged}
          className="data-[state=checked]:bg-slate-600 data-[state=unchecked]:bg-slate-300 dark:data-[state=unchecked]:bg-slate-500"
        />
      </div>
    </div>
  );
};
