import type { ReactNode } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Divider, Kbd, KouAmbience, Panel, PanelHeader, PanelTitle, lineColor, modelColor } from '../src'
import type { KouProvider } from '../src'

const providers: KouProvider[] = [
  { id: 'claude', provider: 'claude-code', name: 'Claude Code' },
  { id: 'codex', provider: 'codex', name: 'Codex' },
  { id: 'gemini', provider: 'gemini', name: 'Gemini' },
  { id: 'local', provider: 'local', name: 'Local' },
]

function Swatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="chip" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <i style={{ width: 12, height: 12, borderRadius: 4, background: value, display: 'inline-block' }} />
      <span>{label}</span>
      <span className="mut mono">{value}</span>
    </div>
  )
}

function ScaleRow({ token, value, children }: { token: string; value: string; children: ReactNode }) {
  return (
    <div className="sb-scale-row">
      <span className="mono sb-scale-name">{token}</span>
      <span className="mono sb-scale-val">{value}</span>
      <div>{children}</div>
    </div>
  )
}

const SPACING: Array<[string, string]> = [
  ['--space-1', '4px'], ['--space-2', '8px'], ['--space-3', '12px'], ['--space-4', '16px'],
  ['--space-5', '20px'], ['--space-6', '24px'], ['--space-7', '32px'], ['--space-8', '40px'],
  ['--space-9', '48px'], ['--space-10', '64px'], ['--gutter', '18px'], ['--gutter-lg', '26px'],
]
const RADII: Array<[string, string]> = [
  ['--radius-xs', '5px'], ['--radius-sm', '6px'], ['--radius-md', '9px'], ['--radius-lg', '12px'],
  ['--radius-xl', '14px'], ['--radius-2xl', '16px'], ['--radius-pill', '999px'],
]
const TYPE: Array<[string, string]> = [
  ['--text-2xs', '8.5px'], ['--text-xs', '9.5px'], ['--text-sm', '10.5px'], ['--text-base', '11.5px'],
  ['--text-md', '12.5px'], ['--text-lg', '13.5px'], ['--text-xl', '15.5px'], ['--text-2xl', '18px'],
  ['--text-3xl', '26px'],
]
const DURATIONS: Array<[string, string]> = [
  ['--dur-instant', '.08s'], ['--dur-fast', '.18s'], ['--dur-quick', '.2s'], ['--dur-base', '.25s'],
  ['--dur-mid', '.3s'], ['--dur-slow', '.35s'], ['--dur-slower', '.55s'], ['--dur-slowest', '.8s'],
]
const EASINGS: Array<[string, string]> = [
  ['--ease-spring', 'overshoot'], ['--ease-spring-soft', 'gentle'], ['--ease-expo', 'settle'],
]
const SHADOWS: Array<[string, string]> = [
  ['--shadow-card', 'card'], ['--shadow-pop', 'popover'], ['--shadow-modal', 'modal'], ['--shadow-toast', 'toast'],
]
const ZINDEX: Array<[string, string]> = [
  ['--z-header', '40'], ['--z-rail', '50'], ['--z-dropdown', '60'], ['--z-overlay', '90'],
  ['--z-grain', '900'], ['--z-toast', '920'], ['--z-fx', '940'], ['--z-cursor', '950'],
]

const meta = {
  title: 'Foundation/Tokens',
  parameters: {
    docs: {
      description: {
        component: 'Kou design tokens, provider colors, model colors, and page ambience.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const ColorTokens: Story = {
  render: () => (
    <div className="sb-kou-stack sb-kou-wide">
      <Panel>
        <PanelHeader><PanelTitle kana="色">CSS TOKENS</PanelTitle></PanelHeader>
        <div className="pad">
          <div className="sb-kou-row">
            {[
              ['paper', 'var(--paper)'],
              ['mut', 'var(--mut)'],
              ['shu', 'var(--shu)'],
              ['codex', 'var(--codex)'],
              ['claude', 'var(--claude)'],
              ['ok', 'var(--ok)'],
              ['warn', 'var(--warn)'],
              ['err', 'var(--err)'],
              ['violet', 'var(--violet)'],
            ].map(([label, value]) => <Swatch key={label} label={label} value={value} />)}
          </div>
        </div>
      </Panel>
      <Panel>
        <PanelHeader><PanelTitle kana="路線">PROVIDER COLORS</PanelTitle></PanelHeader>
        <div className="pad">
          <div className="sb-kou-row">
            {providers.map((provider, index) => (
              <Swatch key={provider.id} label={provider.name ?? provider.provider} value={lineColor(provider, index)} />
            ))}
          </div>
        </div>
      </Panel>
      <Panel>
        <PanelHeader><PanelTitle kana="車両">MODEL COLORS</PanelTitle></PanelHeader>
        <div className="pad">
          <div className="sb-kou-row">
            {['claude-sonnet-4-5', 'gpt-5-codex', 'o4-mini', 'local-model'].map(model => (
              <Swatch key={model} label={model} value={modelColor(model)} />
            ))}
          </div>
        </div>
      </Panel>
    </div>
  ),
}

export const Scales: Story = {
  render: () => (
    <div className="sb-kou-stack sb-kou-wide">
      <Panel>
        <PanelHeader><PanelTitle kana="間隔">SPACING · 4px rhythm</PanelTitle></PanelHeader>
        <div className="pad">
          {SPACING.map(([token, value]) => (
            <ScaleRow key={token} token={token} value={value}>
              <div className="sb-scale-bar" style={{ width: `var(${token})` }} />
            </ScaleRow>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader><PanelTitle kana="角">RADIUS</PanelTitle></PanelHeader>
        <div className="pad">
          {RADII.map(([token, value]) => (
            <ScaleRow key={token} token={token} value={value}>
              <div className="sb-radius-box" style={{ borderRadius: `var(${token})` }} />
            </ScaleRow>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader><PanelTitle kana="字">TYPE SCALE</PanelTitle></PanelHeader>
        <div className="pad">
          {TYPE.map(([token, value]) => (
            <ScaleRow key={token} token={token} value={value}>
              <span style={{ fontSize: `var(${token})` }}>Kou dispatch · 概況 · 0123</span>
            </ScaleRow>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader><PanelTitle kana="動">MOTION · durations &amp; easings</PanelTitle></PanelHeader>
        <div className="pad">
          {DURATIONS.map(([token, value]) => (
            <ScaleRow key={token} token={token} value={value}>
              <span className="mut" style={{ fontSize: 11 }}>duration token</span>
            </ScaleRow>
          ))}
          {EASINGS.map(([token, value]) => (
            <ScaleRow key={token} token={token} value={value}>
              <div className="sb-ease-track" title="hover to preview">
                <div className="sb-ease-dot" style={{ transitionTimingFunction: `var(${token})` }} />
              </div>
            </ScaleRow>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader><PanelTitle kana="影">ELEVATION</PanelTitle></PanelHeader>
        <div className="pad">
          {SHADOWS.map(([token, value]) => (
            <ScaleRow key={token} token={token} value={value}>
              <div className="sb-shadow-box" style={{ boxShadow: `var(${token})` }} />
            </ScaleRow>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader><PanelTitle kana="層">Z-INDEX LADDER</PanelTitle></PanelHeader>
        <div className="pad">
          {ZINDEX.map(([token, value]) => (
            <ScaleRow key={token} token={token} value={value}>
              <span className="mut" style={{ fontSize: 11 }}>stacking layer</span>
            </ScaleRow>
          ))}
        </div>
      </Panel>

      <Panel>
        <PanelHeader><PanelTitle kana="部品">NEW PRIMITIVES</PanelTitle></PanelHeader>
        <div className="pad">
          <div className="sb-kou-row">
            <Kbd>⌘</Kbd><Kbd>K</Kbd>
            <span className="mut" style={{ fontSize: 12 }}>command palette</span>
            <Kbd>Esc</Kbd>
            <span className="mut" style={{ fontSize: 12 }}>close</span>
          </div>
          <Divider />
          <span className="mut" style={{ fontSize: 12 }}>solid divider above · dashed below</span>
          <Divider subtle />
        </div>
      </Panel>
    </div>
  ),
}

export const AmbienceLayer: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <>
      <KouAmbience />
      <div className="sb-kou-stage">
        <Panel className="sb-kou-narrow">
          <PanelHeader><PanelTitle kana="空気">AMBIENCE</PanelTitle></PanelHeader>
          <div className="pad">
            <p className="mut">
              Aurora, embers, spotlight, cursor, panel glow, and motion-reduction guards.
            </p>
          </div>
        </Panel>
      </div>
    </>
  ),
}
