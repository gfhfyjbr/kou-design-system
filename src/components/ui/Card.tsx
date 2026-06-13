import type { HTMLAttributes, ReactNode } from 'react'
import { Panel, PanelHeader, PanelTitle } from './Panel'
import { Spark } from './Spark'
import { TiltCard } from './TiltCard'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Card(props: HTMLAttributes<HTMLDivElement>) {
  return <Panel {...props} />
}

export function CardHeader(props: HTMLAttributes<HTMLDivElement>) {
  return <PanelHeader {...props} />
}

export function CardTitle({ children, kana }: { children: ReactNode; kana?: string }) {
  return <PanelTitle kana={kana}>{children}</PanelTitle>
}

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  kana?: ReactNode
  value: ReactNode
  accent?: boolean
  sparkSeed?: string
}

export function MetricCard({
  label,
  kana,
  value,
  accent,
  sparkSeed,
  className,
  children,
  ...rest
}: MetricCardProps) {
  return (
    <TiltCard className={cx('stat', accent && 'accent', className)} {...rest}>
      <div className="stat-head">
        <span>{label}</span>
        {kana !== undefined && <span className="stat-badge kana">{kana}</span>}
      </div>
      <b className="mono">{value}</b>
      {children}
      {sparkSeed && <Spark seed={sparkSeed} />}
    </TiltCard>
  )
}
