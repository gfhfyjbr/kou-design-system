import type { HTMLAttributes } from 'react';
interface DividerProps extends HTMLAttributes<HTMLHRElement> {
    /** Switch the solid hairline for the dashed in-panel rule. */
    subtle?: boolean;
}
/** Hairline section divider. */
export declare function Divider({ subtle, className, ...rest }: DividerProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Divider.d.ts.map