import type { HTMLAttributes, ReactNode } from 'react'
import { Badge } from './Badge'
import { Lamp } from './Lamp'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export type ModeState = 'connecting' | 'live' | 'demo'
export type SignalTone = 'ok' | 'warn' | 'err' | 'idle' | 'off'

export function ModeChip({
  mode,
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  mode: ModeState
}) {
  const label = children ?? (mode === 'live' ? 'LIVE' : mode === 'demo' ? 'DEMO' : 'CONNECTING')
  return (
    <div className={cx('modechip', mode === 'live' && 'live', mode === 'demo' && 'demo', className)} {...rest}>
      <Lamp tone={mode === 'live' ? 'ok' : mode === 'demo' ? 'warn' : 'idle'} pulse={mode !== 'connecting'} />
      <span>{label}</span>
    </div>
  )
}

export function StatusBadge({
  tone,
  children,
}: {
  tone: 'on' | 'off' | 'warn'
  children: ReactNode
}) {
  return <Badge tone={tone}>{children}</Badge>
}

export function SignalPost({ active }: { active: 'ok' | 'warn' | 'err' | 'off' }) {
  return (
    <span className="sig-post">
      {(['ok', 'warn', 'err'] as const).map(tone => (
        <Lamp key={tone} tone={tone} on={active === tone} />
      ))}
    </span>
  )
}

export function LineDot({
  color,
  className,
  style,
  ...rest
}: HTMLAttributes<HTMLSpanElement> & {
  color: string
}) {
  return <span className={cx('line-dot', className)} style={{ background: color, color, ...style }} {...rest} />
}

export function ProviderDot({ color }: { color: string }) {
  return <LineDot className="prov-dot" color={color} />
}

export function KeyValue({
  label,
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  label: ReactNode
}) {
  return (
    <div className={cx('kv', className)} {...rest}>
      <span>{label}</span>
      <b>{children}</b>
    </div>
  )
}

export interface DefinitionItem {
  label: ReactNode
  value: ReactNode
}

export function DefinitionList({
  items,
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  items: DefinitionItem[]
}) {
  return (
    <div className={cx('prov-meta', className)} {...rest}>
      {items.map((item, index) => (
        <div key={index}>
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </div>
  )
}
