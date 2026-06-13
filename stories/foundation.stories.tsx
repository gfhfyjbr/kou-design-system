import type { Meta, StoryObj } from '@storybook/react-vite'
import { KouAmbience, Panel, PanelHeader, PanelTitle, lineColor, modelColor } from '../src'
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
