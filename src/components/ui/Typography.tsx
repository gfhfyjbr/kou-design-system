import type { HTMLAttributes } from 'react'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

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
