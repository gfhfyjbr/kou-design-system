import type { HTMLAttributes, ReactNode } from 'react';
export declare function Card(props: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export declare function CardHeader(props: HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
export declare function CardTitle({ children, kana }: {
    children: ReactNode;
    kana?: string;
}): import("react").JSX.Element;
export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
    label: ReactNode;
    kana?: ReactNode;
    value: ReactNode;
    accent?: boolean;
    sparkSeed?: string;
}
export declare function MetricCard({ label, kana, value, accent, sparkSeed, className, children, ...rest }: MetricCardProps): import("react").JSX.Element;
//# sourceMappingURL=Card.d.ts.map