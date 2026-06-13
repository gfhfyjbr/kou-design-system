import type { HTMLAttributes } from 'react'
import { cx } from '../../lib/cx'

type TextTag = 'span' | 'p' | 'div' | 'em' | 'strong'

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextTag
}

export function MonoText({ as: Tag = 'span', className, ...rest }: TextProps) {
  return <Tag className={cx('mono', className)} {...rest} />
}

export function KanaText({ as: Tag = 'span', className, ...rest }: TextProps) {
  return <Tag className={cx('kana', className)} {...rest} />
}

export function MutedText({ as: Tag = 'span', className, ...rest }: TextProps) {
  return <Tag className={cx('mut', className)} {...rest} />
}
