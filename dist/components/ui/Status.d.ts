import type { HTMLAttributes, ReactNode } from 'react';
export type ModeState = 'connecting' | 'live' | 'demo';
export type SignalTone = 'ok' | 'warn' | 'err' | 'idle' | 'off';
export declare function ModeChip({ mode, children, className, ...rest }: HTMLAttributes<HTMLDivElement> & {
    mode: ModeState;
}): import("react").JSX.Element;
export declare function StatusBadge({ tone, children, }: {
    tone: 'on' | 'off' | 'warn';
    children: ReactNode;
}): import("react").JSX.Element;
export declare function SignalPost({ active }: {
    active: 'ok' | 'warn' | 'err' | 'off';
}): import("react").JSX.Element;
export declare function LineDot({ color, className, style, ...rest }: HTMLAttributes<HTMLSpanElement> & {
    color: string;
}): import("react").JSX.Element;
export declare function ProviderDot({ color }: {
    color: string;
}): import("react").JSX.Element;
export declare function KeyValue({ label, children, className, ...rest }: HTMLAttributes<HTMLDivElement> & {
    label: ReactNode;
}): import("react").JSX.Element;
export interface DefinitionItem {
    label: ReactNode;
    value: ReactNode;
}
export declare function DefinitionList({ items, className, ...rest }: HTMLAttributes<HTMLDivElement> & {
    items: DefinitionItem[];
}): import("react").JSX.Element;
//# sourceMappingURL=Status.d.ts.map