import { type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
export declare function Field({ label, children }: {
    label: string;
    children: ReactNode;
}): import("react").JSX.Element;
export declare const Input: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & import("react").RefAttributes<HTMLInputElement>>;
export declare const TextArea: import("react").ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & import("react").RefAttributes<HTMLTextAreaElement>>;
export declare const Select: import("react").ForwardRefExoticComponent<SelectHTMLAttributes<HTMLSelectElement> & import("react").RefAttributes<HTMLSelectElement>>;
//# sourceMappingURL=Field.d.ts.map