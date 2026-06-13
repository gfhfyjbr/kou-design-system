import type { HTMLAttributes, ReactNode, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function TableScroll({
  className,
  style,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={className} style={{ overflowX: 'auto', ...style }} {...rest} />
}

export function DataTable({ className, ...rest }: TableHTMLAttributes<HTMLTableElement>) {
  return <table className={cx('table', className)} {...rest} />
}

export function TableHeadCell({
  align,
  style,
  ...rest
}: ThHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
}) {
  return <th style={{ textAlign: align, ...style }} {...rest} />
}

export function TableCell({
  align,
  style,
  ...rest
}: TdHTMLAttributes<HTMLTableCellElement> & {
  align?: 'left' | 'center' | 'right'
}) {
  return <td style={{ textAlign: align, ...style }} {...rest} />
}

export function TableEmptyRow({
  colSpan = 1,
  children,
}: {
  colSpan?: number
  children: ReactNode
}) {
  return (
    <tr>
      <td colSpan={colSpan}>{children}</td>
    </tr>
  )
}
