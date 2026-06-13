import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

type DivProps = HTMLAttributes<HTMLDivElement>

export interface AppShellProps extends DivProps {
  rail?: ReactNode
}

export function AppShell({ rail, children, className, ...rest }: AppShellProps) {
  return (
    <div className={cx('app', className)} {...rest}>
      {rail}
      {children}
    </div>
  )
}

export function MainPane({ className, ...rest }: HTMLAttributes<HTMLElement>) {
  return <main className={className} {...rest} />
}

export function Views({
  logs,
  className,
  ...rest
}: DivProps & {
  logs?: boolean
}) {
  return <div className={cx('views', logs && 'views-logs', className)} {...rest} />
}

export function ViewSection({
  active = true,
  viewId,
  className,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  active?: boolean
  viewId?: string
}) {
  return <section id={viewId ? `view-${viewId}` : undefined} className={cx('view', active && 'active', className)} {...rest} />
}

export function OverviewGrid({ className, ...rest }: DivProps) {
  return <div className={cx('ov-grid', className)} {...rest} />
}

export function SideStack({ className, ...rest }: DivProps) {
  return <div className={cx('ov-side', className)} {...rest} />
}

export function Toolbar({ className, ...rest }: DivProps) {
  return <div className={cx('view-bar', className)} {...rest} />
}

export function Spacer({ className, ...rest }: DivProps) {
  return <span className={cx('spacer', className)} {...rest} />
}

export function Pad({ className, ...rest }: DivProps) {
  return <div className={cx('pad', className)} {...rest} />
}

export function FormRow({ className, ...rest }: DivProps) {
  return <div className={cx('form-row', className)} {...rest} />
}

export function ModelsGrid({ className, ...rest }: DivProps) {
  return <div className={cx('models-grid', className)} {...rest} />
}

export function SettingsGrid({ className, ...rest }: DivProps) {
  return <div className={cx('settings-grid', className)} {...rest} />
}

export function Stack({
  gap = 18,
  className,
  style,
  ...rest
}: DivProps & {
  gap?: CSSProperties['gap']
}) {
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap, ...style }}
      {...rest}
    />
  )
}

export function Inline({
  gap = 10,
  wrap = true,
  align = 'center',
  justify,
  className,
  style,
  ...rest
}: DivProps & {
  gap?: CSSProperties['gap']
  wrap?: boolean
  align?: CSSProperties['alignItems']
  justify?: CSSProperties['justifyContent']
}) {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexWrap: wrap ? 'wrap' : 'nowrap',
        alignItems: align,
        justifyContent: justify,
        gap,
        ...style,
      }}
      {...rest}
    />
  )
}

export function ResponsiveGrid({
  minColumnWidth = '280px',
  gap = 18,
  align = 'start',
  className,
  style,
  ...rest
}: DivProps & {
  minColumnWidth?: string
  gap?: CSSProperties['gap']
  align?: CSSProperties['alignItems']
}) {
  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`,
        gap,
        alignItems: align,
        ...style,
      }}
      {...rest}
    />
  )
}
