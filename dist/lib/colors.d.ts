export interface ColorProvider {
    id?: string | null;
    provider?: string | null;
    name?: string | null;
}
export declare function lineColor(p: ColorProvider, i?: number): string;
export declare function lineCode(p: ColorProvider): string;
export declare function modelColor(id: string): string;
//# sourceMappingURL=colors.d.ts.map