import { cx } from '../../lib/cx'

interface LampProps {
  tone?: 'ok' | 'warn' | 'err' | 'idle'
  pulse?: boolean
  on?: boolean
}

export function Lamp({ tone = 'idle', pulse, on }: LampProps) {
  return <span className={cx('lamp', tone !== 'idle' && tone, pulse && 'pulse', on && 'on')} />
}
