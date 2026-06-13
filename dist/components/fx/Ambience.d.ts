import { type RefObject } from 'react';
type CanvasRef = RefObject<HTMLCanvasElement | null>;
type DivRef = RefObject<HTMLDivElement | null>;
export declare function AuroraBackground(): import("react").JSX.Element;
export declare function EmberCanvas({ canvasRef }: {
    canvasRef: CanvasRef;
}): import("react").JSX.Element;
export declare function SparkCanvas({ canvasRef }: {
    canvasRef: CanvasRef;
}): import("react").JSX.Element;
export declare function PointerSpotlight({ spotRef }: {
    spotRef: DivRef;
}): import("react").JSX.Element;
export declare function CustomCursor({ dotRef, ringRef }: {
    dotRef: DivRef;
    ringRef: DivRef;
}): import("react").JSX.Element | null;
export declare function KouFxLayers({ fxA, fxS, spotRef, dotRef, ringRef, }: {
    fxA: CanvasRef;
    fxS: CanvasRef;
    spotRef: DivRef;
    dotRef: DivRef;
    ringRef: DivRef;
}): import("react").JSX.Element;
/** Wires page-wide ambience effects to the granular fx layers. Decoration is
 * skipped for reduced motion; pointer-driven parts only run on fine pointers. */
export declare function useKouAmbience({ fxA, fxS, spotRef, dotRef, ringRef, }: {
    fxA: CanvasRef;
    fxS: CanvasRef;
    spotRef: DivRef;
    dotRef: DivRef;
    ringRef: DivRef;
}): void;
/** Complete default ambience: aurora blobs, drifting embers, click sparks,
 * pointer spotlight, custom cursor, panel border-light and magnetic buttons. */
export declare function Ambience(): import("react").JSX.Element;
export {};
//# sourceMappingURL=Ambience.d.ts.map