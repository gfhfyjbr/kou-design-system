import type { ButtonHTMLAttributes } from 'react';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'danger';
    tiny?: boolean;
}
/** Shared button. Sweep highlight, magnetic pull and cursor ring come from
 *  global styles/fx — this only owns the class composition. */
export declare function Button({ variant, tiny, className, ...rest }: ButtonProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map