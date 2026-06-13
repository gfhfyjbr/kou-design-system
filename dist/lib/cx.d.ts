/** Join class names, dropping falsey values. The kit's one class composer —
 *  every component routes its class string through this instead of hand-rolling
 *  `[...].filter(Boolean).join(' ')`. */
export declare function cx(...parts: Array<string | false | null | undefined>): string;
//# sourceMappingURL=cx.d.ts.map