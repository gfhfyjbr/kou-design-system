import type { HTMLAttributes, ReactNode } from 'react';
/** Graphite plate with metal rim, corner glints and cursor border-light. */
export declare function Panel({ className, ...rest }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export declare function PanelHeader({ className, ...rest }: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
interface PanelTitleProps {
    children: ReactNode;
    kana?: string;
}
export declare function PanelTitle({ children, kana }: PanelTitleProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Panel.d.ts.map