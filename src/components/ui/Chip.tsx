import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  mono?: boolean
}

export function Chip({ mono, className, ...rest }: ChipProps) {
  return <span className={cx('chip', mono && 'mono', className)} {...rest} />
}
