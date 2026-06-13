import type { HTMLAttributes } from 'react';
type TextTag = 'span' | 'p' | 'div' | 'em' | 'strong';
interface TextProps extends HTMLAttributes<HTMLElement> {
    as?: TextTag;
}
export declare function MonoText({ as: Tag, className, ...rest }: TextProps): import("react").JSX.Element;
export declare function KanaText({ as: Tag, className, ...rest }: TextProps): import("react").JSX.Element;
export declare function MutedText({ as: Tag, className, ...rest }: TextProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Typography.d.ts.map