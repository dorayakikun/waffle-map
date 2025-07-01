import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1",
        "text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
        // Placeholder styles
        "placeholder:text-muted-foreground",
        // Dark mode styles
        "dark:bg-input/30",
        // File input styles
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        // Disabled states
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none",
        // Focus states
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        // Invalid states
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
