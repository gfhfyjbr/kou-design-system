import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  /** Switch the solid hairline for the dashed in-panel rule. */
  subtle?: boolean
}

/** Hairline section divider. */
export function Divider({ subtle, className, ...rest }: DividerProps) {
  return <hr className={cx('divider', subtle && 'subtle', className)} {...rest} />
}
