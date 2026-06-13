import { type ReactNode } from 'react';
interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: ReactNode;
    kana?: string;
    children: ReactNode;
    footer?: ReactNode;
    wide?: boolean;
}
/** Liquid-glass dialog with backdrop blur. Closes on Esc / backdrop click.
 *  While open, the page behind is scroll-locked. */
export declare function Modal({ open, onClose, title, kana, children, footer, wide }: ModalProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=Modal.d.ts.map