import { ReactNode } from "react";

interface TableProps {
  children: ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <div className="w-full overflow-hidden border border-border rounded-lg bg-surface">
      <table className="w-full">{children}</table>
    </div>
  );
}

export function TableHead({ children }: TableProps) {
  return (
    <thead className="bg-surface-hover border-b border-border">
      {children}
    </thead>
  );
}

export function TableBody({ children }: TableProps) {
  return <tbody className="divide-y divide-border">{children}</tbody>;
}

export function TableRow({ children }: TableProps) {
  return (
    <tr className="transition-colors hover:bg-surface-hover">
      {children}
    </tr>
  );
}

interface TableHeaderProps {
  children: ReactNode;
}

export function TableHeader({ children }: TableHeaderProps) {
  return (
    <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary">
      {children}
    </th>
  );
}

interface TableCellProps {
  children: ReactNode;
}

export function TableCell({ children }: TableCellProps) {
  return (
    <td className="px-4 py-3 text-sm text-text-primary">
      {children}
    </td>
  );
}