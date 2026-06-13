import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { Ambience } from '../fx/Ambience'
import { Button } from '../ui/Button'
import { Card as Panel, CardHeader as PanelHeader, CardTitle as PanelTitle, MetricCard } from '../ui/Card'
import { Chip } from '../ui/Chip'
import { DataTable, TableCell, TableEmptyRow, TableHeadCell, TableScroll } from '../ui/DataTable'
import { Dropdown, MultiDropdown } from '../ui/Dropdown'
import { Empty } from '../ui/Empty'
import { Field, Input, TextArea } from '../ui/Field'
import { Lamp } from '../ui/Lamp'
import { FormRow, ModelsGrid, Pad, SettingsGrid, Spacer, Stack, Toolbar } from '../ui/Layout'
import { Modal } from '../ui/Modal'
import { DefinitionList, KeyValue, LineDot, ModeChip, ProviderDot, SignalPost, StatusBadge } from '../ui/Status'
import { KanaText, MonoText, MutedText } from '../ui/Typography'
import { lineCode, lineColor, modelColor } from '../../lib/colors'
import { REDUCED } from '../../lib/env'
import {
  KOU_VIEW_META,
  type KouAccount,
  type KouAliasRow,
  type KouApiKeyRow,
  type KouAuthStatus,
  type KouBoardEvent,
  type KouDropdownOption,
  type KouLogDetail,
  type KouLogRow,
  type KouMode,
  type KouModelInfo,
  type KouPreset,
  type KouProvider,
  type KouProviderAccountAction,
  type KouProviderSignal,
  type KouViewName,
} from './types'

function timeAgo(iso?: string | null): string {
  if (!iso) return '—'
  const d = (Date.now() - new Date(iso).getTime()) / 1000
  if (d < 0) return 'soon'
  if (d < 60) return Math.floor(d) + 's ago'
  if (d < 3600) return Math.floor(d / 60) + 'm ago'
  if (d < 86400) return Math.floor(d / 3600) + 'h ago'
  return Math.floor(d / 86400) + 'd ago'
}

function hhmmss(d: Date, utc = false): string {
  const p = (n: number) => String(n).padStart(2, '0')
  return utc
    ? p(d.getUTCHours()) + ':' + p(d.getUTCMinutes())
    : p(d.getHours()) + ':' + p(d.getMinutes()) + ':' + p(d.getSeconds())
}

function accountStatus(a: KouAccount): [string, string] {
  if (!a.enabled) return ['off', 'OFF']
  if (a.rate_limited_until && new Date(a.rate_limited_until) > new Date()) return ['warn', 'LIMITED']
  if (a.circuit_open_until && new Date(a.circuit_open_until) > new Date()) return ['err', 'TRIPPED']
  if (a.last_error) return ['warn', 'ERR·SEEN']
  return ['ok', 'READY']
}

const RAIL_NAV: Array<{ view: KouViewName; label: string; kana: string; icon: ReactNode }> = [
  {
    view: 'overview', label: 'Overview', kana: '概況',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="5" cy="12" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="19" cy="18" r="2" />
        <path d="M7 12h4m0 0c4 0 4-6 6-6m-6 6c4 0 4 6 6 6" />
      </svg>
    ),
  },
  {
    view: 'providers', label: 'Lines', kana: '路線',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="2" /><circle cx="15" cy="17" r="2" />
      </svg>
    ),
  },
  {
    view: 'keys', label: 'API Keys', kana: '鍵',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="8" cy="14" r="4" /><path d="M11 11l8-8m-3 1l2 2m-5 1l2 2" />
      </svg>
    ),
  },
  {
    view: 'models', label: 'Models', kana: '車両',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="9" width="18" height="7" rx="2" /><path d="M7 16v2m10-2v2M6 12.5h.01M10 12.5h8" />
      </svg>
    ),
  },
  {
    view: 'logs', label: 'Logs', kana: '記録',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M6 3h12v18H6z" /><path d="M9.5 7.5h5.5M9.5 11h5.5M9.5 14.5h3" />
      </svg>
    ),
  },
  {
    view: 'settings', label: 'Settings', kana: '設定',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M4 8h10m4 0h2M4 16h2m4 0h10" /><circle cx="16" cy="8" r="2" /><circle cx="8" cy="16" r="2" />
      </svg>
    ),
  },
]

const RAIL_STATUS: Record<KouMode, { tone: 'ok' | 'warn' | 'idle'; text: string }> = {
  connecting: { tone: 'idle', text: 'BOOT…' },
  live: { tone: 'ok', text: 'ON LINE' },
  demo: { tone: 'warn', text: 'DEMO' },
}

export function KouRail({
  view,
  mode,
  onNavigate,
  version = 'kou v0.1',
}: {
  view: KouViewName
  mode: KouMode
  onNavigate: (view: KouViewName) => void
  version?: string
}) {
  const status = RAIL_STATUS[mode]
  return (
    <aside className="rail">
      <div className="brand">
        <div className="hanko">光</div>
        <div className="brand-t"><b>KOU</b><span>ROUTER</span></div>
      </div>
      <nav>
        <span className="nav-cap">DISPATCH · 運行</span>
        {RAIL_NAV.map(item => (
          <a
            key={item.view}
            href={'#' + item.view}
            className={view === item.view ? 'active' : undefined}
            onClick={e => { e.preventDefault(); onNavigate(item.view) }}
          >
            {item.icon}
            <span>{item.label}</span>
            <i>{item.kana}</i>
          </a>
        ))}
      </nav>
      <div className="rail-foot">
        <Lamp tone={status.tone === 'idle' ? 'idle' : status.tone} pulse />
        <MonoText>{status.text}</MonoText>
        <span className="ver">{version}</span>
      </div>
    </aside>
  )
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return now
}

export function KouTopBar({
  view,
  mode,
  showAuthButton,
  onSignOut,
}: {
  view: KouViewName
  mode: KouMode
  showAuthButton: boolean
  onSignOut: () => void
}) {
  const now = useClock()
  const meta = KOU_VIEW_META[view]
  return (
    <header className="top">
      <div className="crumb">
        <h1>{meta.t}</h1>
        <KanaText>{meta.k}</KanaText>
      </div>
      <div className="top-right">
        <ModeChip mode={mode} />
        <div className="clock mono">
          <span>{hhmmss(now)}</span>
          <em>UTC {hhmmss(now, true)}</em>
        </div>
        {showAuthButton && <Button onClick={onSignOut}>SIGN OUT</Button>}
      </div>
    </header>
  )
}

export function KouGateScreen({
  error,
  onSubmit,
}: {
  error: string
  onSubmit: (password: string) => void | Promise<void>
}) {
  const [password, setPassword] = useState('')
  const go = () => { void onSubmit(password) }
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 90, display: 'grid',
        placeItems: 'center',
      }}
    >
      <Panel style={{ width: 'min(340px, 86vw)', padding: '26px 24px' }}>
        <MutedText as="p" style={{ fontSize: '11px', letterSpacing: '.35em', margin: '0 0 2px' }}>
          改札 KOU-ROUTER
        </MutedText>
        <h1 style={{ fontSize: '15px', letterSpacing: '.18em', margin: '0 0 16px' }}>TICKET GATE</h1>
        <Field label="ADMIN PASSWORD">
          <Input
            type="password"
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') go() }}
          />
        </Field>
        <Button variant="primary" style={{ width: '100%', marginTop: 12 }} onClick={go}>
          ENTER
        </Button>
        <p style={{ minHeight: 18, margin: '10px 0 0', fontSize: '12px', color: 'var(--shu, #ff4f30)' }}>
          {error}
        </p>
      </Panel>
    </div>
  )
}

function BoardRow({ e, animate }: { e: KouBoardEvent; animate: boolean }) {
  return (
    <div className={'board-r' + (animate ? ' in' : '')}>
      <span className="t">{e.time}</span>
      <span className="m">{e.model}</span>
      <span className="ln"><i style={{ background: e.color }} />{e.line}</span>
      <span className={'st ' + e.status}>{e.status === 'ok' ? 'OK' : e.status === 'warn' ? 'LIM' : 'ERR'}</span>
      <span className="lat">{e.lat ?? '—'}</span>
    </div>
  )
}

export function KouDeparturesBoard({
  rows,
  mode,
  animate,
}: {
  rows: KouBoardEvent[]
  mode: KouMode
  animate: boolean
}) {
  return (
      <Panel>
        <PanelHeader>
          <PanelTitle kana="発車標">DEPARTURES</PanelTitle>
        <MutedText className="mono" style={{ marginLeft: 'auto', fontSize: 10, letterSpacing: '.14em' }}>
          {mode === 'demo' ? 'synthetic traffic' : mode === 'live' ? 'account telemetry' : ''}
        </MutedText>
      </PanelHeader>
      <div className="board mono">
        <div className="board-r head">
          <span className="t">TIME</span><span className="m">MODEL</span>
          <span className="ln">LINE</span><span className="st">STATUS</span><span className="lat">LAT</span>
        </div>
        {rows.length
          ? rows.map(e => <BoardRow key={e.id} e={e} animate={animate} />)
          : <Empty kana="待機中">AWAITING TRAFFIC</Empty>}
      </div>
    </Panel>
  )
}

export function KouIngressChips({ url, onCopy }: { url: string; onCopy: () => void }) {
  return (
      <Panel>
        <PanelHeader>
          <PanelTitle kana="入口">INGRESS</PanelTitle>
        <MutedText className="mono" style={{ marginLeft: 'auto', fontSize: 10, letterSpacing: '.14em' }}>
          click = copy
        </MutedText>
      </PanelHeader>
      <div className="chips" style={{ paddingBottom: 6 }}>
        <Chip mono className="ingress-url" onClick={onCopy}>{url}</Chip>
      </div>
      <p className="mut" style={{ margin: 0, padding: '0 18px 14px', fontSize: 11.5 }}>
        chat · completions · responses · messages · embeddings · images · audio ·
        moderations · rerank · search — все под одним base URL
      </p>
    </Panel>
  )
}

export interface KouSignalRow {
  id: string
  name: string
  color: string
  signal: KouProviderSignal
}

export function KouSignals({ rows }: { rows: KouSignalRow[] }) {
  return (
    <Panel>
      <PanelHeader><PanelTitle kana="信号">SIGNALS</PanelTitle></PanelHeader>
      <div id="signals">
        {rows.length === 0 && <Empty kana="路線なし">NO LINES CONNECTED</Empty>}
        {rows.map(row => (
          <div className="sig" key={row.id}>
            <SignalPost active={row.signal.s} />
            <span className="sig-name"><LineDot color={row.color} />{row.name}</span>
            <span className={'sig-note mono' + (row.signal.s === 'warn' ? ' warn' : row.signal.s === 'err' ? ' err' : '')}>
              {row.signal.note}
            </span>
          </div>
        ))}
      </div>
    </Panel>
  )
}

function useCountUp(target: number | null, dur = 900): number | null {
  const [v, setV] = useState(0)
  const animated = useRef(false)
  useEffect(() => {
    if (target == null) return
    if (REDUCED || animated.current || target <= 0) { animated.current = true; setV(target); return }
    animated.current = true
    const t0 = performance.now()
    let raf = 0
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / dur)
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))))
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, dur])
  return target == null ? null : v
}

export interface KouStatTile {
  label: string
  kana: string
  value: number | null
  accent?: boolean
  go: KouViewName
}

function StatTile({ tile, onNavigate }: { tile: KouStatTile; onNavigate: (view: KouViewName) => void }) {
  const display = useCountUp(tile.value)
  return (
    <MetricCard
      label={tile.label}
      kana={tile.kana}
      value={display == null ? '—' : display}
      accent={tile.accent}
      sparkSeed={tile.label + ':' + (tile.value ?? '—')}
      data-go={tile.go}
      onClick={() => setTimeout(() => onNavigate(tile.go), REDUCED ? 0 : 160)}
    />
  )
}

export function KouStatsStrip({
  tiles,
  onNavigate,
}: {
  tiles: KouStatTile[]
  onNavigate: (view: KouViewName) => void
}) {
  return (
    <div className="stats" id="stats">
      {tiles.map(tile => <StatTile key={tile.label} tile={tile} onNavigate={onNavigate} />)}
    </div>
  )
}

const CLIENTS = ['/v1/messages', '/v1/chat/completions', '/v1/responses']

export function KouSwitchyard({
  providers,
  accounts,
  authed,
  demo,
  mode,
  onNavigate,
  onFlashProvider,
  onAddLine,
  getSignal,
}: {
  providers: KouProvider[]
  accounts: Record<string, KouAccount[]>
  authed: boolean
  demo: boolean
  mode: KouMode
  onNavigate: (view: KouViewName) => void
  onFlashProvider: (providerId: string) => void
  onAddLine: () => void
  getSignal: (provider: KouProvider) => KouProviderSignal
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hover, setHover] = useState<number | null>(null)

  const layout = useMemo(() => {
    const n = Math.max(providers.length, 1)
    const rows = n + 1
    const H = Math.max(300, 120 + rows * 64)
    const W = 1200, coreX = 520, coreY = H / 2, nodeX = 905
    const cliYs = CLIENTS.map((_, i) => coreY + (i - 1) * 58)
    const provYs = providers.map((_, i) => coreY + (i - (rows - 1) / 2) * 64)
    const ghostY = coreY + ((rows - 1) - (rows - 1) / 2) * 64
    return { H, W, coreX, coreY, nodeX, cliYs, provYs, ghostY }
  }, [providers])

  const { H, W, coreX, coreY, nodeX, cliYs, provYs, ghostY } = layout
  const cliPath = (y: number) => `M 60 ${y} C 240 ${y}, 300 ${coreY}, ${coreX - 46} ${coreY}`
  const provPath = (y: number) =>
    `M ${coreX + 46} ${coreY} C ${coreX + 200} ${coreY}, ${coreX + 230} ${y}, ${nodeX - 34} ${y}`

  useEffect(() => {
    if (REDUCED) return
    const svg = svgRef.current
    if (!svg) return
    const timers: number[] = []
    const launch = (pathId: string, color: string, r: number, durBase: number): number => {
      const dur = +(durBase + Math.random() * 1.6).toFixed(2)
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      dot.setAttribute('r', String(r))
      dot.setAttribute('fill', color)
      dot.setAttribute('opacity', '.9')
      const am = document.createElementNS('http://www.w3.org/2000/svg', 'animateMotion')
      am.setAttribute('dur', dur + 's')
      am.setAttribute('repeatCount', '1')
      am.setAttribute('fill', 'freeze')
      am.setAttribute('begin', 'indefinite')
      const mp = document.createElementNS('http://www.w3.org/2000/svg', 'mpath')
      mp.setAttribute('href', '#' + pathId)
      am.append(mp)
      dot.append(am)
      svg.append(dot)
      am.beginElement()
      timers.push(window.setTimeout(() => dot.remove(), dur * 1000 + 80))
      return dur
    }
    const live = providers.map((p, i) => ({ p, i })).filter(x => x.p.enabled !== false)
    CLIENTS.forEach((_, i) => {
      const go = () => {
        if (!svg.isConnected) return
        const dur = launch('cli-' + i, 'rgba(238,235,225,.65)', 2.4, 2.2)
        if (live.length) {
          const t = live[(Math.random() * live.length) | 0]
          timers.push(window.setTimeout(() => {
            if (svg.isConnected) launch('trk-' + t.i, lineColor(t.p, t.i), 3, 2.6)
          }, dur * 1000 + 140))
        }
        timers.push(window.setTimeout(go, 1100 + Math.random() * 2600))
      }
      timers.push(window.setTimeout(go, Math.random() * 1800))
    })
    return () => timers.forEach(clearTimeout)
  }, [providers, mode])

  const ticker = useMemo(() => {
    const sigs = providers.map(getSignal)
    if (sigs.some(s => s.s === 'err')) return { cls: 'err', text: 'SERVICE DISRUPTION · 運転見合わせ' }
    if (sigs.some(s => s.s === 'warn')) return { cls: 'warn', text: 'MINOR DELAYS · 遅延あり' }
    return { cls: '', text: 'ALL LINES OPERATIONAL · 全線運転' }
  }, [providers, getSignal])

  return (
    <Panel className="hero">
      <PanelHeader>
        <PanelTitle kana="配線盤">SWITCHYARD</PanelTitle>
        <div className="hero-live">
          <span className="lamp ok pulse" />
          <span>{mode === 'live' ? 'LIVE FLOW' : mode === 'demo' ? 'DEMO FLOW' : '—'}</span>
        </div>
      </PanelHeader>
      <div id="yard">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          className={hover != null ? 'focused' : undefined}
        >
          <defs>
            <linearGradient id="hankoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff5a36" /><stop offset="1" stopColor="#cf3517" />
            </linearGradient>
            <filter id="fGlow" filterUnits="userSpaceOnUse" x={-24} y={-24} width={W + 48} height={H + 48}>
              <feGaussianBlur stdDeviation="3.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="fBlur" filterUnits="userSpaceOnUse" x={-24} y={-24} width={W + 48} height={H + 48}>
              <feGaussianBlur stdDeviation="3" />
            </filter>
            {providers.map((p, i) => p.enabled !== false && (
              <linearGradient
                key={p.id} id={`tg-${i}`} gradientUnits="userSpaceOnUse"
                x1={coreX + 46} y1={coreY} x2={nodeX - 34} y2={provYs[i]}
              >
                <stop offset="0" style={{ stopColor: lineColor(p, i), stopOpacity: 0.08 }} />
                <stop offset=".55" style={{ stopColor: lineColor(p, i), stopOpacity: 0.3 }} />
                <stop offset="1" style={{ stopColor: lineColor(p, i), stopOpacity: 0.95 }} />
              </linearGradient>
            ))}
          </defs>

          {CLIENTS.map((c, i) => (
            <Fragment key={c}>
              <path id={`cli-${i}`} d={cliPath(cliYs[i])} fill="none" stroke="var(--line-2)" strokeWidth={2} opacity={0.55} />
              <path d={cliPath(cliYs[i])} pathLength={100} fill="none"
                stroke="rgba(238,235,225,.4)" strokeWidth={1} strokeDasharray="2 8" opacity={0.12} />
              <circle cx={60} cy={cliYs[i]} r={4} fill="var(--ink)" stroke="var(--faint)" strokeWidth={1.5} />
              <text className="y-label" x={74} y={cliYs[i] - 9}>{c}</text>
            </Fragment>
          ))}
          <text className="y-core-cap" x={60} y={cliYs[0] - 38}>CLIENTS 入口</text>

          {providers.map((p, i) => {
            const y = provYs[i]
            const col = lineColor(p, i)
            const d = provPath(y)
            const lit = hover === i
            return (
              <Fragment key={p.id}>
                <path d={d} fill="none" stroke="var(--line-2)" strokeWidth={4} opacity={0.32} />
                {p.enabled === false ? (
                  <path id={`trk-${i}`} className="y-trk" d={d} fill="none" stroke={col} strokeWidth={1.6} opacity={0.22} />
                ) : (
                  <>
                    <path id={`glo-${i}`} className={'y-glo' + (lit ? ' lit' : '')} d={d} fill="none"
                      stroke={`url(#tg-${i})`} strokeWidth={5} filter="url(#fBlur)" opacity={0.55} />
                    <path id={`trk-${i}`} className={'y-trk' + (lit ? ' lit' : '')} d={d} fill="none"
                      stroke={`url(#tg-${i})`} strokeWidth={1.6} />
                    <path className="y-flow" d={d} pathLength={100} fill="none"
                      stroke={col} strokeWidth={1.4} strokeDasharray="2 8" opacity={0.22} />
                  </>
                )}
              </Fragment>
            )
          })}

          <g>
            <g className="y-orbit">
              <circle cx={coreX} cy={coreY} r={70} fill="none" stroke="var(--line-2)" strokeWidth={1} strokeDasharray="2 10" opacity={0.7} />
            </g>
            <circle cx={coreX} cy={coreY} r={56} fill="none" stroke="var(--line-2)" strokeWidth={1} opacity={0.6} />
            <circle cx={coreX} cy={coreY} r={62} fill="none" stroke="var(--shu)" strokeWidth={1} opacity={0.16} />
            <rect
              x={coreX - 34} y={coreY - 34} width={68} height={68} rx={14}
              fill="url(#hankoGrad)" transform={`rotate(-4 ${coreX} ${coreY})`}
              stroke="rgba(255,255,255,.22)" strokeWidth={1}
            />
            <text className="y-core-glyph" x={coreX} y={coreY + 11} textAnchor="middle" transform={`rotate(-4 ${coreX} ${coreY})`}>光</text>
            <text className="y-core-cap" x={coreX} y={coreY + 62} textAnchor="middle">KOU CORE</text>
          </g>

          {providers.map((p, i) => {
            const y = provYs[i]
            const col = lineColor(p, i)
            const accs = accounts[p.id] || []
            const live = accs.filter(a => a.enabled).length
            const limited = p.rate_limited_until && new Date(p.rate_limited_until) > new Date()
            const lampCol = p.enabled === false ? 'var(--faint)' : limited ? 'var(--warn)' : 'var(--ok)'
            const sub = authed || demo
              ? `${live || accs.length || 0} ACCOUNT${(live || accs.length) === 1 ? '' : 'S'}`
              : (p.provider || '').toUpperCase()
            return (
              <g
                key={p.id}
                className="y-node"
                opacity={p.enabled === false ? 0.45 : 1}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(h => (h === i ? null : h))}
                onClick={() => {
                  onNavigate('providers')
                  onFlashProvider(p.id)
                }}
              >
                <circle cx={nodeX} cy={y} r={25} fill="var(--ink-2)" stroke={col} strokeWidth={2} />
                <circle cx={nodeX} cy={y} r={30} fill="none" stroke={col} strokeWidth={1} opacity={0.22} />
                <text className="y-node-code" x={nodeX} y={y + 4.5} textAnchor="middle">{lineCode(p)}</text>
                <circle cx={nodeX + 19} cy={y - 18} r={4} fill={lampCol} />
                <text className="y-label-lg" x={nodeX + 44} y={y - 2}>{p.name || p.provider}</text>
                <text className="y-sub" x={nodeX + 44} y={y + 14}>{sub}</text>
              </g>
            )
          })}

          <path
            d={`M ${coreX + 46} ${coreY} C ${coreX + 200} ${coreY}, ${coreX + 230} ${ghostY}, ${nodeX - 34} ${ghostY}`}
            fill="none" stroke="var(--line-2)" strokeWidth={1.4} strokeDasharray="3 6" opacity={0.55}
          />
          <g id="yardAdd" className="y-node" onClick={onAddLine}>
            <circle cx={nodeX} cy={ghostY} r={25} fill="transparent" stroke="var(--faint)" strokeWidth={1.4} strokeDasharray="4 5" />
            <text className="y-node-code" x={nodeX} y={ghostY + 5} textAnchor="middle" fill="var(--faint)">+</text>
            <text className="y-sub" x={nodeX + 44} y={ghostY + 4}>ADD LINE · 新路線</text>
          </g>
        </svg>
      </div>
      <div className="hero-ticker mono">
        <span>KOU CORE · EAST GATE</span>
        <span id="tickerRight" className={ticker.cls}>{ticker.text}</span>
      </div>
    </Panel>
  )
}

export function KouAmbience() {
  return <Ambience />
}

function AccountRow({
  account,
  onAction,
}: {
  account: KouAccount
  onAction: (action: KouProviderAccountAction, account: KouAccount) => void
}) {
  const [lc, label] = accountStatus(account)
  return (
    <div className="acc-row">
      <span className={'lamp' + (lc === 'off' ? '' : ' ' + lc)} />
      <div className="who">
        <b>{account.label || account.remote_email || '#' + String(account.id).slice(0, 8)}</b>
        {account.label && account.remote_email ? <span>{account.remote_email}</span> : null}
      </div>
      <span className="mono">{(account.auth_mode || '').toUpperCase()} · P{account.priority ?? 0}</span>
      <span className="mono">{label} · {timeAgo(account.last_used_at)}{account.proxy_url ? ' · proxy' : ''}</span>
      <div className="acc-actions">
        {account.auth_mode === 'oauth' && (
          <Button tiny data-act onClick={() => onAction('refresh', account)}>REFRESH</Button>
        )}
        <Button tiny data-act onClick={() => onAction(account.enabled ? 'disable' : 'enable', account)}>
          {account.enabled ? 'HOLD' : 'RELEASE'}
        </Button>
        <Button tiny data-act onClick={() => onAction('proxy', account)}>PROXY</Button>
        <Button tiny variant="danger" data-act onClick={() => onAction('delete', account)}>DEL</Button>
      </div>
    </div>
  )
}

function ProviderCard({
  provider,
  index,
  accounts,
  authed,
  demo,
  flash,
  signal,
  onConnect,
  onAction,
}: {
  provider: KouProvider
  index: number
  accounts: KouAccount[]
  authed: boolean
  demo: boolean
  flash: boolean
  signal: KouProviderSignal
  onConnect: (providerId: string) => void
  onAction: (action: KouProviderAccountAction, account: KouAccount) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const col = lineColor(provider, index)

  useEffect(() => {
    if (flash) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [flash])

  return (
    <div ref={ref}>
      <Panel className={'prov-card' + (flash ? ' flash' : '')} data-pid={provider.id}>
        <div className="prov-head">
          <ProviderDot color={col} />
          <span className="prov-name">{provider.name || provider.provider}</span>
          <Chip mono>{provider.provider}</Chip>
          <StatusBadge tone={provider.enabled === false ? 'off' : signal.s === 'warn' ? 'warn' : 'on'}>
            {provider.enabled === false ? 'CLOSED' : signal.s === 'warn' ? 'DELAYS' : 'IN SERVICE'}
          </StatusBadge>
          <span className="prov-url" style={{ marginLeft: 'auto' }}>{provider.base_url || ''}</span>
        </div>
        <DefinitionList
          items={[
            { label: 'PREFIX', value: provider.model_prefix || '—' },
            { label: 'PRIORITY', value: provider.priority ?? '—' },
            { label: 'DEFAULT MODEL', value: provider.default_model || '—' },
            { label: 'SIGNAL', value: signal.note },
          ]}
        />
        <div className="acc-zone">
          <div className="acc-head">
            ACCOUNTS · 口座
            {authed || demo
              ? <Button tiny variant="primary" data-act onClick={() => onConnect(provider.id)}>+ CONNECT</Button>
              : <span style={{ marginLeft: 'auto' }}>sign in to manage</span>}
          </div>
          {(authed || demo) && (
            accounts.length
              ? accounts.map(account => <AccountRow key={account.id} account={account} onAction={onAction} />)
              : <Empty kana="口座なし" style={{ padding: 18 }}>NO ACCOUNTS</Empty>
          )}
        </div>
      </Panel>
    </div>
  )
}

export function KouProvidersView({
  providers,
  accounts,
  authed,
  demo,
  flashProviderId,
  onImportPreset,
  onConnect,
  onAccountAction,
  getSignal,
}: {
  providers: KouProvider[]
  accounts: Record<string, KouAccount[]>
  authed: boolean
  demo: boolean
  flashProviderId: string | null
  onImportPreset: () => void
  onConnect: (providerId: string) => void
  onAccountAction: (action: KouProviderAccountAction, account: KouAccount) => void
  getSignal: (provider: KouProvider) => KouProviderSignal
}) {
  return (
    <>
      <Toolbar>
        <MutedText>Provider connections and their authenticated accounts.</MutedText>
        <Spacer />
        <Button variant="primary" onClick={onImportPreset}>
          + IMPORT PRESET
        </Button>
      </Toolbar>
      <Stack>
        {providers.length === 0 && (
          <Panel><Empty kana="路線を追加してください">NO PROVIDER LINES YET — IMPORT A PRESET</Empty></Panel>
        )}
        {providers.map((provider, index) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            index={index}
            accounts={accounts[provider.id] || []}
            authed={authed}
            demo={demo}
            flash={flashProviderId === provider.id}
            signal={getSignal(provider)}
            onConnect={onConnect}
            onAction={onAccountAction}
          />
        ))}
      </Stack>
    </>
  )
}

export function KouImportLineModal({
  open,
  selected,
  available,
  name,
  prefix,
  onPresetChange,
  onNameChange,
  onPrefixChange,
  onClose,
  onImport,
}: {
  open: boolean
  selected: string
  available: KouPreset[]
  name: string
  prefix: string
  onPresetChange: (value: string) => void
  onNameChange: (value: string) => void
  onPrefixChange: (value: string) => void
  onClose: () => void
  onImport: () => void
}) {
  return (
    <Modal
      open={open} onClose={onClose} title="IMPORT LINE" kana="路線追加"
      footer={
        <>
          <Button onClick={onClose}>CANCEL</Button>
          <Button variant="primary" disabled={!selected} onClick={onImport}>IMPORT</Button>
        </>
      }
    >
      <Field label="PRESET">
        <Dropdown
          value={selected}
          onChange={onPresetChange}
          options={available.map(p => ({ value: p.id, label: p.display_name, hint: p.base_url }))}
        />
      </Field>
      <Field label="NAME (optional)">
        <Input placeholder="My Claude" value={name} onChange={e => onNameChange(e.target.value)} />
      </Field>
      <Field label="MODEL PREFIX (optional)">
        <Input placeholder="claude" value={prefix} onChange={e => onPrefixChange(e.target.value)} />
      </Field>
    </Modal>
  )
}

export function KouConnectAccountModal({
  open,
  authMode,
  label,
  redirect,
  defaultRedirect,
  proxy,
  code,
  apiKey,
  sessionActive,
  onAuthModeChange,
  onLabelChange,
  onRedirectChange,
  onProxyChange,
  onCodeChange,
  onApiKeyChange,
  onClose,
  onSubmit,
}: {
  open: boolean
  authMode: 'oauth' | 'api_key'
  label: string
  redirect: string | null
  defaultRedirect: string
  proxy: string
  code: string
  apiKey: string
  sessionActive: boolean
  onAuthModeChange: (value: 'oauth' | 'api_key') => void
  onLabelChange: (value: string) => void
  onRedirectChange: (value: string) => void
  onProxyChange: (value: string) => void
  onCodeChange: (value: string) => void
  onApiKeyChange: (value: string) => void
  onClose: () => void
  onSubmit: () => void
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="CONNECT ACCOUNT" kana="口座接続"
      footer={
        <>
          <Button onClick={onClose}>CANCEL</Button>
          <Button variant="primary" onClick={onSubmit}>
            {authMode === 'oauth' ? (sessionActive ? 'COMPLETE' : 'START') : 'SAVE'}
          </Button>
        </>
      }
    >
      <Field label="MODE">
        <Dropdown
          value={authMode}
          onChange={value => onAuthModeChange(value as 'oauth' | 'api_key')}
          options={[
            { value: 'oauth', label: 'OAuth' },
            { value: 'api_key', label: 'API key' },
          ]}
        />
      </Field>
      <Field label="LABEL">
        <Input placeholder="main" value={label} onChange={e => onLabelChange(e.target.value)} />
      </Field>
      {authMode === 'oauth' ? (
        <>
          <Field label="REDIRECT URI">
            <Input value={redirect ?? defaultRedirect} onChange={e => onRedirectChange(e.target.value)} />
          </Field>
          <Field label="PROXY FOR OAUTH (optional)">
            <Input placeholder="socks5://…" value={proxy} onChange={e => onProxyChange(e.target.value)} />
          </Field>
          {sessionActive && (
            <Field label="PASTE CODE (code or code#state)">
              <Input placeholder="ac_…" value={code} onChange={e => onCodeChange(e.target.value)} />
            </Field>
          )}
        </>
      ) : (
        <Field label="API KEY">
          <Input placeholder="sk-…" value={apiKey} onChange={e => onApiKeyChange(e.target.value)} />
        </Field>
      )}
    </Modal>
  )
}

export function KouKeysView({
  keys,
  authed,
  name,
  selectedModels,
  modelOptions,
  newKey,
  onNameChange,
  onSelectedModelsChange,
  onCreate,
  onRevoke,
  onCloseNewKey,
  onCopyNewKey,
}: {
  keys: KouApiKeyRow[]
  authed: boolean
  name: string
  selectedModels: string[]
  modelOptions: KouDropdownOption[]
  newKey: string | null
  onNameChange: (value: string) => void
  onSelectedModelsChange: (values: string[]) => void
  onCreate: () => void
  onRevoke: (key: KouApiKeyRow) => void
  onCloseNewKey: () => void
  onCopyNewKey: () => void
}) {
  return (
    <>
      <Panel>
        <PanelHeader><PanelTitle kana="発行">ISSUE KEY</PanelTitle></PanelHeader>
        <FormRow>
          <Field label="NAME">
            <Input placeholder="my-app" value={name} onChange={e => onNameChange(e.target.value)} />
          </Field>
          <Field label="ALLOWED MODELS">
            <MultiDropdown
              values={selectedModels}
              onChange={onSelectedModelsChange}
              emptyLabel="* all models"
              options={modelOptions}
            />
          </Field>
          <Button variant="primary" onClick={onCreate}>CREATE</Button>
        </FormRow>
      </Panel>
      <Panel>
        <PanelHeader><PanelTitle kana="鍵一覧">ACTIVE KEYS</PanelTitle></PanelHeader>
        <TableScroll>
          <DataTable>
            <tbody>
              {!authed ? (
                <TableEmptyRow><Empty kana="要認証">SIGN IN TO MANAGE KEYS</Empty></TableEmptyRow>
              ) : keys.length === 0 ? (
                <TableEmptyRow><Empty kana="鍵なし">NO KEYS ISSUED</Empty></TableEmptyRow>
              ) : (
                <>
                  <tr>
                    <TableHeadCell /><TableHeadCell>NAME</TableHeadCell><TableHeadCell>PREFIX</TableHeadCell><TableHeadCell>MODELS</TableHeadCell>
                    <TableHeadCell>USAGE</TableHeadCell><TableHeadCell>LAST USED</TableHeadCell><TableHeadCell>ISSUED</TableHeadCell><TableHeadCell />
                  </tr>
                  {keys.map(key => (
                    <tr key={key.id}>
                      <TableCell><Lamp tone={key.is_active === false ? 'idle' : 'ok'} /></TableCell>
                      <TableCell><b>{key.name}</b></TableCell>
                      <TableCell className="mono">{key.key_prefix}…</TableCell>
                      <TableCell className="mono">{(key.allowed_models || ['*']).join(', ')}</TableCell>
                      <TableCell className="mono">{key.usage_count ?? 0}</TableCell>
                      <TableCell className="mono">{timeAgo(key.last_used_at)}</TableCell>
                      <TableCell className="mono">{key.created_at ? new Date(key.created_at).toLocaleDateString() : '—'}</TableCell>
                      <TableCell align="right">
                        <Button tiny variant="danger" data-kid={key.id} onClick={() => onRevoke(key)}>REVOKE</Button>
                      </TableCell>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </DataTable>
        </TableScroll>
      </Panel>
      <Modal
        open={newKey !== null}
        onClose={onCloseNewKey}
        title="KEY ISSUED" kana="発行済"
        footer={
          <>
            <Button variant="primary" onClick={onCopyNewKey}>COPY</Button>
            <Button onClick={onCloseNewKey}>DONE</Button>
          </>
        }
      >
        <MutedText as="p" style={{ fontSize: '12.5px' }}>Copy it now — it is shown only once.</MutedText>
        <div className="keybox">{newKey}</div>
      </Modal>
    </>
  )
}

export function KouModelsView({
  models,
  aliases,
  alias,
  target,
  onAliasChange,
  onTargetChange,
  onAddAlias,
}: {
  models: KouModelInfo[]
  aliases: KouAliasRow[]
  alias: string
  target: string
  onAliasChange: (value: string) => void
  onTargetChange: (value: string) => void
  onAddAlias: () => void
}) {
  return (
    <ModelsGrid>
      <Panel>
        <PanelHeader>
          <PanelTitle kana="車両一覧">ROLLING STOCK</PanelTitle>
          <MutedText className="mono" style={{ marginLeft: 'auto', fontSize: 10 }}>{models.length} UNITS</MutedText>
        </PanelHeader>
        <div>
          {models.length === 0 && <Empty kana="車両なし">NO MODELS VISIBLE</Empty>}
          {models.map(model => (
            <div className="model-li" key={model.id}>
              <i style={{ background: modelColor(model.id) }} />
              {model.id}
              <span>{model.owned_by || ''}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel>
        <PanelHeader><PanelTitle kana="別名">ALIASES</PanelTitle></PanelHeader>
        <FormRow>
          <Field label="ALIAS">
            <Input placeholder="fast" value={alias} onChange={e => onAliasChange(e.target.value)} />
          </Field>
          <Field label="TARGET">
            <Input placeholder="claude-haiku-4-5" value={target} onChange={e => onTargetChange(e.target.value)} />
          </Field>
          <Button variant="primary" onClick={onAddAlias}>MAP</Button>
        </FormRow>
        <TableScroll>
          <DataTable>
            <tbody>
              {aliases.length === 0 ? (
                <TableEmptyRow><Empty kana="別名なし">NO ALIASES</Empty></TableEmptyRow>
              ) : (
                <>
                  <tr><TableHeadCell>ALIAS</TableHeadCell><TableHeadCell /><TableHeadCell>TARGET</TableHeadCell></tr>
                  {aliases.map(item => (
                    <tr key={item.alias}>
                      <TableCell className="mono" style={{ color: 'var(--shu)' }}>{item.alias}</TableCell>
                      <TableCell className="mut mono" align="center">→</TableCell>
                      <TableCell className="mono">{item.target}</TableCell>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </DataTable>
        </TableScroll>
      </Panel>
    </ModelsGrid>
  )
}

const LOG_POLL_PAGE = 100

const PROTO: Record<string, string> = {
  'chat.completions': 'OPENAI-CHAT',
  completions: 'OPENAI-LEGACY',
  messages: 'ANTHROPIC',
  responses: 'OPENAI-RESPONSES',
  'ollama.chat': 'OLLAMA',
}

const proto = (endpoint: string) => PROTO[endpoint] ?? endpoint.replace('.', '-').toUpperCase()

const shortModel = (id: string) => (id.includes('/') ? id.slice(id.indexOf('/') + 1) : id) || '—'

function statusTone(status: number): 'ok' | 'warn' | 'err' {
  if (status < 400) return 'ok'
  if (status === 429) return 'warn'
  return 'err'
}

function fmtDuration(ms: number): string {
  if (ms < 1000) return ms + 'ms'
  return (ms / 1000).toFixed(1) + 's'
}

function fmtTokens(n?: number | null): string {
  if (n === null || n === undefined) return '—'
  return n.toLocaleString('en-US').replace(/,/g, ' ')
}

function tps(row: KouLogRow): number | null {
  if (!row.output_tokens || row.duration_ms <= 0) return null
  return row.output_tokens / (row.duration_ms / 1000)
}

function pretty(raw?: string | null): string {
  if (!raw) return '—'
  let out = raw
  try { out = JSON.stringify(JSON.parse(raw), null, 2) } catch { /* SSE transcript or plain text */ }
  return out.length > 40000 ? out.slice(0, 40000) + `\n… truncated (${out.length.toLocaleString()} chars)` : out
}

export function KouLogsView({
  logs,
  providers,
  authed,
  detail,
  onRefresh,
  onClean,
  onOpenLog,
  onCloseDetail,
}: {
  logs: KouLogRow[] | null
  providers: KouProvider[]
  authed: boolean
  detail: KouLogDetail | null
  onRefresh: () => void
  onClean: () => void
  onOpenLog: (row: KouLogRow) => void
  onCloseDetail: () => void
}) {
  const [q, setQ] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'ok' | 'err'>('all')
  const [providerFilter, setProviderFilter] = useState('all')
  const [visible, setVisible] = useState(LOG_POLL_PAGE)

  const providerName = (id?: string | null): string => {
    if (!id) return '—'
    if (id.startsWith('unresolved:')) return 'unresolved'
    const provider = providers.find(item => item.id === id)
    return provider ? (provider.name || provider.provider) : id.slice(0, 8)
  }

  const providerTint = (id?: string | null): string => {
    const index = providers.findIndex(provider => provider.id === id)
    return index >= 0 ? lineColor(providers[index], index) : 'var(--faint)'
  }

  const filtered = useMemo(() => (logs ?? []).filter(log => {
    if (statusFilter === 'ok' && log.status >= 400) return false
    if (statusFilter === 'err' && log.status < 400) return false
    if (providerFilter !== 'all' && log.provider_id !== providerFilter) return false
    if (q.trim()) {
      const hay = [
        log.requested_model, log.resolved_model, log.endpoint, log.account_label,
        log.api_key_name, providerName(log.provider_id), String(log.status), log.id,
      ].join(' ').toLowerCase()
      if (!hay.includes(q.trim().toLowerCase())) return false
    }
    return true
  }), [logs, statusFilter, providerFilter, q, providers])

  useEffect(() => { setVisible(LOG_POLL_PAGE) }, [q, statusFilter, providerFilter])
  const shown = useMemo(() => filtered.slice(0, visible), [filtered, visible])

  const total = logs?.length ?? 0
  const okCount = (logs ?? []).filter(log => log.status < 400).length
  const steps = useMemo(() => {
    if (!detail) return []
    const seqs = [...new Set([
      ...detail.upstream_requests.map(req => req.sequence_no),
      ...detail.upstream_responses.map(resp => resp.sequence_no),
    ])].sort((a, b) => a - b)
    return seqs.map(seq => ({
      seq,
      req: detail.upstream_requests.find(req => req.sequence_no === seq),
      resp: detail.upstream_responses.find(resp => resp.sequence_no === seq),
    }))
  }, [detail])

  const d = detail?.log
  const dTps = d ? tps(d) : null

  return (
    <>
      <Panel>
        <PanelHeader>
          <PanelTitle kana="運行記録">REQUEST LOG</PanelTitle>
          <div className="logs-stats mono">
            <span className="chip">{total} total</span>
            <span className="chip lg-ok">{okCount} ok</span>
            <span className="chip lg-err">{total - okCount} err</span>
            <span className="chip">{filtered.length} shown</span>
          </div>
          <Button tiny onClick={onRefresh}>REFRESH</Button>
          <Button tiny variant="danger" onClick={onClean}>CLEAN HISTORY</Button>
        </PanelHeader>
        <div className="logs-bar">
          <Input
            placeholder="search models, providers, accounts, keys…"
            value={q}
            onChange={e => setQ(e.target.value)}
            style={{ maxWidth: 280 }}
          />
          <Dropdown
            label="STATUS"
            value={statusFilter}
            onChange={value => setStatusFilter(value as typeof statusFilter)}
            options={[
              { value: 'all', label: 'all statuses' },
              { value: 'ok', label: 'success', hint: '2xx' },
              { value: 'err', label: 'errors', hint: '4xx·5xx' },
            ]}
          />
          <Dropdown
            label="LINE"
            value={providerFilter}
            onChange={setProviderFilter}
            options={[
              { value: 'all', label: 'all providers' },
              ...providers.map(provider => ({ value: provider.id, label: provider.name || provider.provider })),
            ]}
          />
        </div>
        <TableScroll>
          <DataTable className="logs-table">
            <tbody>
              {!authed ? (
                <TableEmptyRow><Empty kana="要認証">SIGN IN TO VIEW LOGS</Empty></TableEmptyRow>
              ) : logs === null ? (
                <TableEmptyRow><Empty kana="読込中">LOADING…</Empty></TableEmptyRow>
              ) : filtered.length === 0 ? (
                <TableEmptyRow><Empty kana="記録なし">NO REQUESTS RECORDED</Empty></TableEmptyRow>
              ) : (
                <>
                  <tr>
                    <TableHeadCell>STATUS</TableHeadCell><TableHeadCell>MODEL</TableHeadCell><TableHeadCell>REQUESTED</TableHeadCell><TableHeadCell>PROVIDER</TableHeadCell>
                    <TableHeadCell>PROTOCOL</TableHeadCell><TableHeadCell>ACCOUNT</TableHeadCell><TableHeadCell>API KEY</TableHeadCell>
                    <TableHeadCell align="right">TOKENS</TableHeadCell>
                    <TableHeadCell align="right">TPS</TableHeadCell>
                    <TableHeadCell align="right">DURATION</TableHeadCell>
                    <TableHeadCell align="right">TIME</TableHeadCell>
                  </tr>
                  {shown.map(log => {
                    const rowTps = tps(log)
                    return (
                      <tr key={log.id} className="lg-row" onClick={() => onOpenLog(log)} title={log.error ?? log.id}>
                        <TableCell><span className={'lg-st ' + statusTone(log.status)}>{log.status}</span></TableCell>
                        <TableCell className="mono" style={{ color: modelColor(log.resolved_model) }}>{shortModel(log.resolved_model)}</TableCell>
                        <TableCell className="mono mut">{log.requested_model || '—'}</TableCell>
                        <TableCell>
                          {log.provider_id ? (
                            <span className="lg-prov mono" style={{ ['--pc' as string]: providerTint(log.provider_id) }}>
                              {providerName(log.provider_id).toUpperCase()}
                            </span>
                          ) : '—'}
                        </TableCell>
                        <TableCell>
                          <span className="chip lg-proto">{proto(log.endpoint)}</span>
                          {log.is_stream && <span className="chip lg-sse">SSE</span>}
                        </TableCell>
                        <TableCell className="mono mut lg-trunc">{log.account_label ?? '—'}</TableCell>
                        <TableCell className="mono mut lg-trunc">{log.api_key_name ?? '—'}</TableCell>
                        <TableCell className="mono lg-tokens" align="right">
                          <i className="ti">TI: {fmtTokens(log.input_tokens)}</i>
                          <span className="mut"> | </span>
                          <i className="to">TO: {fmtTokens(log.output_tokens)}</i>
                        </TableCell>
                        <TableCell className="mono" align="right">
                          {rowTps === null ? <span className="mut">—</span> : (
                            <span className={'lg-tps' + (rowTps >= 10 ? ' hi' : '')}>{rowTps.toFixed(1)}</span>
                          )}
                        </TableCell>
                        <TableCell className="mono mut" align="right">{fmtDuration(log.duration_ms)}</TableCell>
                        <TableCell className="mono mut" align="right">{hhmmss(new Date(log.created_at))}</TableCell>
                      </tr>
                    )
                  })}
                  {filtered.length > visible && (
                    <tr>
                      <TableCell colSpan={11} align="center" style={{ padding: '12px' }}>
                        <Button tiny onClick={() => setVisible(value => value + 2 * LOG_POLL_PAGE)}>
                          SHOW MORE ({filtered.length - visible} hidden)
                        </Button>
                      </TableCell>
                    </tr>
                  )}
                </>
              )}
            </tbody>
          </DataTable>
        </TableScroll>
      </Panel>

      <Modal
        open={detail !== null}
        onClose={onCloseDetail}
        title="REQUEST PIPELINE"
        kana="経路"
        wide
        footer={<Button onClick={onCloseDetail}>CLOSE</Button>}
      >
        {d && (
          <>
            <div className="lg-sum mono">
              <span className={'lg-st ' + statusTone(d.status)}>{d.status}</span>
              <span className="chip lg-proto">{proto(d.endpoint)}</span>
              {d.is_stream && <span className="chip lg-sse">SSE</span>}
              <span className="chip" style={{ color: modelColor(d.resolved_model) }}>{shortModel(d.resolved_model)}</span>
              {d.provider_id && <span className="chip">{providerName(d.provider_id)}</span>}
              {d.account_label && <span className="chip">{d.account_label}</span>}
              {d.api_key_name && <span className="chip">key: {d.api_key_name}</span>}
              <span className="chip">{fmtDuration(d.duration_ms)}</span>
              <span className="chip lg-tokens">
                <i className="ti">TI: {fmtTokens(d.input_tokens)}</i> · <i className="to">TO: {fmtTokens(d.output_tokens)}</i>
              </span>
              {dTps !== null && <span className="chip">{dTps.toFixed(1)} t/s</span>}
              {d.cost_usd != null && <span className="chip">${d.cost_usd.toFixed(4)}</span>}
              <span className="chip mut">{d.attempts} attempt{d.attempts === 1 ? '' : 's'}</span>
            </div>

            <div className="lg-pipe">
              <div className="lg-step">
                <div className="lg-step-h">
                  <b>CLIENT → ROUTER</b>
                  <span className="chip lg-proto">{proto(d.endpoint)}</span>
                  <span className="mut mono">{d.requested_model || '—'}</span>
                </div>
                <pre className="lg-json">{pretty(d.client_body)}</pre>
              </div>

              {steps.map(step => (
                <Fragment key={step.seq}>
                  {step.req && (
                    <div className="lg-step">
                      <div className="lg-step-h">
                        <b>ROUTER → {providerName(step.req.provider_id).toUpperCase()}</b>
                        <span className="chip">{shortModel(step.req.model)}</span>
                        {steps.length > 1 && <span className="mut">attempt {step.seq}</span>}
                      </div>
                      <pre className="lg-json">{pretty(step.req.raw_body)}</pre>
                    </div>
                  )}
                  {step.resp && (
                    <div className={'lg-step resp' + (step.resp.upstream_status >= 400 ? ' bad' : '')}>
                      <div className="lg-step-h">
                        <b>{providerName(step.resp.provider_id).toUpperCase()} → ROUTER</b>
                        <span className={'lg-st ' + statusTone(step.resp.upstream_status)}>{step.resp.upstream_status}</span>
                        {steps.length > 1 && <span className="mut">attempt {step.seq}</span>}
                      </div>
                      <pre className="lg-json">{pretty(step.resp.raw_body)}</pre>
                    </div>
                  )}
                </Fragment>
              ))}

              {steps.length === 0 && !d.error && (
                <div className="lg-step resp">
                  <div className="lg-step-h"><b>ROUTER → UPSTREAM</b></div>
                  <pre className="lg-json">no upstream attempts recorded for this request</pre>
                </div>
              )}

              {d.error && (
                <div className="lg-step bad">
                  <div className="lg-step-h">
                    <b>ROUTER → CLIENT</b>
                    <span className={'lg-st ' + statusTone(d.status)}>{d.status}</span>
                  </div>
                  <pre className="lg-json lg-errtext">{d.error}</pre>
                </div>
              )}
            </div>
          </>
        )}
      </Modal>
    </>
  )
}

export function KouSettingsView({
  demo,
  authed,
  authStatus,
  settingsJson,
  onSettingsJsonChange,
  onSave,
  onSignOut,
}: {
  demo: boolean
  authed: boolean
  authStatus: KouAuthStatus | null
  settingsJson: string
  onSettingsJsonChange: (value: string) => void
  onSave: () => void
  onSignOut: () => void
}) {
  return (
    <SettingsGrid>
      <Panel>
        <PanelHeader><PanelTitle kana="改札">GUARD</PanelTitle></PanelHeader>
        {demo ? (
          <Pad>
            <KeyValue label="MODE">demo — guard preview</KeyValue>
            <KeyValue label="AUTH">enabled</KeyValue>
            <KeyValue label="SESSION">admin</KeyValue>
          </Pad>
        ) : !authStatus ? (
          <Pad><KeyValue label="STATUS">unreachable</KeyValue></Pad>
        ) : (
          <Pad>
            <KeyValue label="AUTH REQUIRED">{authStatus.auth_required ? 'yes' : 'no'}</KeyValue>
            <KeyValue label="SETUP COMPLETE">{authStatus.setup_complete ? 'yes' : 'no'}</KeyValue>
            <KeyValue label="SESSION">{authed ? 'authenticated' : 'anonymous'}</KeyValue>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {authed && authStatus.auth_required && (
                <Button onClick={onSignOut}>SIGN OUT</Button>
              )}
            </div>
            <MutedText as="p" style={{ fontSize: '12px', marginTop: 8 }}>
              The admin password is set in the CLI on first run, or via
              KOU_ROUTER_ADMIN_PASSWORD in non-interactive environments.
            </MutedText>
          </Pad>
        )}
      </Panel>
      <Panel>
        <PanelHeader>
          <PanelTitle kana="設定">ROUTER SETTINGS</PanelTitle>
          <Button tiny variant="primary" style={{ marginLeft: 'auto' }} onClick={onSave}>SAVE</Button>
        </PanelHeader>
        <Pad>
          <TextArea className="mono" spellCheck={false} placeholder="{ }" value={settingsJson} onChange={e => onSettingsJsonChange(e.target.value)} />
        </Pad>
      </Panel>
    </SettingsGrid>
  )
}
