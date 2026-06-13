import { type HTMLAttributes } from 'react';
interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
    /** max tilt in degrees around Y axis (X axis uses ~0.78 of it) */
    max?: number;
    /** spawn an accent ripple from the click point */
    ripple?: boolean;
}
/** Parallax container: 3-D tilt that follows the pointer, optional click
 *  ripple. Generic — feature cards style themselves via className. */
export declare function TiltCard({ max, ripple, onClick, children, ...rest }: TiltCardProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=TiltCard.d.ts.map