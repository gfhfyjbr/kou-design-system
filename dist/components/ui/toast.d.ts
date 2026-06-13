import { type ReactNode } from 'react';
type ToastKind = 'ok' | 'warn' | 'err';
type PushToast = (msg: string, kind?: ToastKind) => void;
export declare const useToast: () => PushToast;
export declare function ToastProvider({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
export {};
//# sourceMappingURL=toast.d.ts.map