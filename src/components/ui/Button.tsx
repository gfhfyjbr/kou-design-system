import type { ButtonHTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'danger'
  tiny?: boolean
}

/** Shared button. Sweep highlight, magnetic pull and cursor ring come from
 *  global styles/fx — this only owns the class composition. */
export function Button({ variant = 'default', tiny, className, ...rest }: ButtonProps) {
  return <button className={cx('btn', variant !== 'default' && variant, tiny && 'tiny', className)} {...rest} />
}
