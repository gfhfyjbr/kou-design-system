import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
type DivProps = HTMLAttributes<HTMLDivElement>;
export interface AppShellProps extends DivProps {
    rail?: ReactNode;
}
export declare function AppShell({ rail, children, className, ...rest }: AppShellProps): import("react").JSX.Element;
export declare function MainPane({ className, ...rest }: HTMLAttributes<HTMLElement>): import("react").JSX.Element;
export declare function Views({ logs, className, ...rest }: DivProps & {
    logs?: boolean;
}): import("react").JSX.Element;
export declare function ViewSection({ active, viewId, className, ...rest }: HTMLAttributes<HTMLElement> & {
    active?: boolean;
    viewId?: string;
}): import("react").JSX.Element;
export declare function OverviewGrid({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function SideStack({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function Toolbar({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function Spacer({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function Pad({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function FormRow({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function ModelsGrid({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function SettingsGrid({ className, ...rest }: DivProps): import("react").JSX.Element;
export declare function Stack({ gap, className, style, ...rest }: DivProps & {
    gap?: CSSProperties['gap'];
}): import("react").JSX.Element;
export declare function Inline({ gap, wrap, align, justify, className, style, ...rest }: DivProps & {
    gap?: CSSProperties['gap'];
    wrap?: boolean;
    align?: CSSProperties['alignItems'];
    justify?: CSSProperties['justifyContent'];
}): import("react").JSX.Element;
export declare function ResponsiveGrid({ minColumnWidth, gap, align, className, style, ...rest }: DivProps & {
    minColumnWidth?: string;
    gap?: CSSProperties['gap'];
    align?: CSSProperties['alignItems'];
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=Layout.d.ts.map