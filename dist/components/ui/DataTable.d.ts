import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
export declare function TableScroll({ className, style, ...rest }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export declare function DataTable({ className, ...rest }: TableHTMLAttributes<HTMLTableElement>): import("react").JSX.Element;
export declare function TableHeadCell({ align, style, ...rest }: ThHTMLAttributes<HTMLTableCellElement> & {
    align?: 'left' | 'center' | 'right';
}): import("react").JSX.Element;
export declare function TableCell({ align, style, ...rest }: TdHTMLAttributes<HTMLTableCellElement> & {
    align?: 'left' | 'center' | 'right';
}): import("react").JSX.Element;
export declare function TableEmptyRow({ colSpan, children, }: {
    colSpan?: number;
    children: ReactNode;
}): import("react").JSX.Element;
//# sourceMappingURL=DataTable.d.ts.map