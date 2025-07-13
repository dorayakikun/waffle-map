"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Renders a styled table with horizontal overflow handling.
 *
 * Wraps the table in a container div to enable horizontal scrolling on overflow. Applies base styles and allows additional class names and props to be passed to the table element.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  );
}

/**
 * Renders a styled table header (`<thead>`) element with a bottom border applied to all child rows.
 *
 * Additional props are spread onto the `<thead>` element for further customization.
 */
function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled `<tbody>` element for a table, removing the border from the last row and allowing additional class names and props.
 */
function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

/**
 * Renders a styled table footer (`<tfoot>`) with muted background, top border, and medium font weight.
 *
 * Additional class names and props are merged and applied to the `<tfoot>` element.
 */
function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a table row (`<tr>`) with hover and selected state background styling.
 *
 * Combines default utility classes for interactive row highlighting and border styling with any additional classes provided.
 */
function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table header cell (`<th>`) with customizable classes and alignment.
 *
 * Applies foreground text color, fixed height, padding, left alignment, vertical centering, medium font weight, and prevents text wrapping. Adjusts padding and vertical translation for child checkbox elements.
 */
function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table cell (`<td>`) element with customizable class names and support for checkbox alignment.
 *
 * Applies padding, vertical alignment, and nowrap styling. Adjusts padding and vertical translation for child elements with the `role="checkbox"` attribute.
 */
function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className,
      )}
      {...props}
    />
  );
}

/**
 * Renders a styled table caption with muted text color and top margin.
 *
 * Spreads additional props onto the underlying `<caption>` element.
 */
function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
