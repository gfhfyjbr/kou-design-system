import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

/** A keyboard key cap — for command hints like ⌘K or Esc. */
export function Kbd({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <kbd className={cx('kbd', className)} {...rest} />
}
