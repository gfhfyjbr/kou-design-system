import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AppShell,
  KouConnectAccountModal,
  KouDeparturesBoard,
  KouGateScreen,
  KouImportLineModal,
  KouKeysView,
  KouLogsView,
  KouModelsView,
  KouProvidersView,
  KouRail,
  KouSettingsView,
  KouSignals,
  KouStatsStrip,
  KouSwitchyard,
  KouTopBar,
  MainPane,
  OverviewGrid,
  SideStack,
  Views,
  ViewSection,
  lineColor,
} from '../src'
import type {
  KouAccount,
  KouAliasRow,
  KouApiKeyRow,
  KouBoardEvent,
  KouLogDetail,
  KouLogRow,
  KouModelInfo,
  KouPreset,
  KouProvider,
  KouProviderAccountAction,
  KouProviderSignal,
  KouViewName,
} from '../src'

const now = Date.now()

const providers: KouProvider[] = [
  {
    id: 'pc-claude',
    provider: 'claude-code',
    name: 'Claude Code',
    base_url: 'https://api.anthropic.com/v1',
    model_prefix: 'claude',
    priority: 10,
    enabled: true,
    default_model: 'claude-sonnet-4-5',
  },
  {
    id: 'pc-codex',
    provider: 'codex',
    name: 'Codex',
    base_url: 'https://chatgpt.com/backend-api/codex',
    model_prefix: 'codex',
    priority: 20,
    enabled: true,
    default_model: 'gpt-5-codex',
    rate_limited_until: new Date(now + 4 * 60_000).toISOString(),
  },
]

const accounts: Record<string, KouAccount[]> = {
  'pc-claude': [
    {
      id: 'acc-1',
      label: 'main',
      auth_mode: 'oauth',
      remote_email: 'kou@anthropic.dev',
      enabled: true,
      priority: 0,
      last_used_at: new Date(now - 42_000).toISOString(),
      expires_at: new Date(now + 50 * 60_000).toISOString(),
      has_refresh_token: true,
    },
    {
      id: 'acc-2',
      label: 'backup',
      auth_mode: 'oauth',
      remote_email: 'ops@anthropic.dev',
      enabled: true,
      priority: 1,
      last_used_at: new Date(now - 8 * 60_000).toISOString(),
      proxy_url: 'socks5://10.0.0.7:1080',
    },
  ],
  'pc-codex': [
    {
      id: 'acc-3',
      label: 'main',
      auth_mode: 'oauth',
      remote_email: 'kou@openai.dev',
      enabled: true,
      priority: 0,
      last_used_at: new Date(now - 12_000).toISOString(),
      rate_limited_until: new Date(now + 4 * 60_000).toISOString(),
      has_refresh_token: true,
    },
  ],
}

const models: KouModelInfo[] = [
  'claude-sonnet-4-5',
  'claude-opus-4-1',
  'gpt-5-codex',
  'gpt-5',
  'o4-mini',
].map(id => ({ id, owned_by: /claude/.test(id) ? 'claude-code' : 'codex' }))

const aliases: KouAliasRow[] = [
  { alias: 'fast', target: 'o4-mini' },
  { alias: 'smart', target: 'claude-opus-4-1' },
]

const keys: KouApiKeyRow[] = [
  {
    id: 'k1',
    name: 'cli',
    key_prefix: 'kou-3f8a',
    allowed_models: ['*'],
    is_active: true,
    usage_count: 18_234,
    last_used_at: new Date(now - 30_000).toISOString(),
    created_at: new Date(now - 21 * 86_400_000).toISOString(),
  },
  {
    id: 'k2',
    name: 'ci-bot',
    key_prefix: 'kou-9d21',
    allowed_models: ['claude-haiku-4-5'],
    is_active: true,
    usage_count: 902,
    last_used_at: new Date(now - 3_600_000).toISOString(),
    created_at: new Date(now - 9 * 86_400_000).toISOString(),
  },
]

const presets: KouPreset[] = [
  { id: 'codex', display_name: 'Codex OAuth', base_url: 'https://chatgpt.com/backend-api/codex' },
  { id: 'claude-oauth', display_name: 'Claude OAuth', base_url: 'https://api.anthropic.com/v1' },
]

const boardRows: KouBoardEvent[] = [
  { id: 'b1', time: '10:31', model: 'claude-sonnet-4-5', line: 'Claude Code', color: 'var(--claude)', status: 'ok', lat: '420ms' },
  { id: 'b2', time: '10:29', model: 'gpt-5-codex', line: 'Codex', color: 'var(--codex)', status: 'warn', lat: null },
  { id: 'b3', time: '10:27', model: 'o4-mini', line: 'Codex', color: 'var(--codex)', status: 'ok', lat: '280ms' },
]

const logs: KouLogRow[] = [
  {
    id: 'log-1',
    endpoint: 'messages',
    requested_model: 'claude/claude-sonnet-4-5',
    resolved_model: 'claude/claude-sonnet-4-5',
    provider_id: 'pc-claude',
    provider_account_id: 'acc-1',
    account_label: 'main',
    api_key_name: 'cli',
    status: 200,
    error: null,
    attempts: 1,
    is_stream: true,
    input_tokens: 45_223,
    output_tokens: 248,
    duration_ms: 4100,
    created_at: new Date(now - 47_000).toISOString(),
  },
  {
    id: 'log-2',
    endpoint: 'responses',
    requested_model: 'codex/gpt-5-codex',
    resolved_model: 'codex/gpt-5-codex',
    provider_id: 'pc-codex',
    provider_account_id: 'acc-3',
    account_label: 'main',
    api_key_name: 'ci-bot',
    status: 429,
    error: 'rate limit exceeded, retry after 42s',
    attempts: 2,
    is_stream: false,
    input_tokens: null,
    output_tokens: null,
    duration_ms: 620,
    created_at: new Date(now - 112_000).toISOString(),
  },
]

const detail: KouLogDetail = {
  log: {
    ...logs[0],
    client_body: JSON.stringify({
      model: logs[0].requested_model,
      stream: true,
      messages: [{ role: 'user', content: 'Explain the switchyard in one paragraph.' }],
    }),
  },
  upstream_requests: [
    {
      id: 'req-1',
      provider_id: 'pc-claude',
      provider_account_id: 'acc-1',
      model: 'claude-sonnet-4-5',
      endpoint: 'messages',
      sequence_no: 1,
      raw_body: JSON.stringify({ model: 'claude-sonnet-4-5', stream: true }),
      created_at: logs[0].created_at,
    },
  ],
  upstream_responses: [
    {
      id: 'resp-1',
      provider_id: 'pc-claude',
      provider_account_id: 'acc-1',
      model: 'claude-sonnet-4-5',
      endpoint: 'messages',
      sequence_no: 1,
      upstream_status: 200,
      raw_body: JSON.stringify({ id: 'msg_demo', usage: { input_tokens: 45_223, output_tokens: 248 } }),
      created_at: logs[0].created_at,
    },
  ],
}

function signal(provider: KouProvider): KouProviderSignal {
  if (provider.rate_limited_until && new Date(provider.rate_limited_until) > new Date()) {
    return { s: 'warn', note: 'rate limited · resets 04:00' }
  }
  return { s: 'ok', note: 'clear · 正常' }
}

const noop = () => {}

function ChromeDemo() {
  const [view, setView] = useState<KouViewName>('overview')
  return (
    <AppShell className="sb-kou-app">
      <KouRail view={view} mode="live" onNavigate={setView} />
      <MainPane>
        <KouTopBar view={view} mode="live" showAuthButton onSignOut={noop} />
        <Views>
          <ViewSection>
            <KouStatsStrip
              onNavigate={setView}
              tiles={[
                { label: 'LINES', kana: '路線', value: providers.length, accent: true, go: 'providers' },
                { label: 'ACCOUNTS', kana: '口座', value: Object.values(accounts).flat().length, go: 'providers' },
                { label: 'API KEYS', kana: '鍵', value: keys.length, go: 'keys' },
                { label: 'MODELS', kana: '車両', value: models.length, go: 'models' },
                { label: 'ALIASES', kana: '別名', value: aliases.length, go: 'models' },
              ]}
            />
          </ViewSection>
        </Views>
      </MainPane>
    </AppShell>
  )
}

const meta = {
  title: 'Kou Views/Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Chrome: Story = {
  render: () => <ChromeDemo />,
}

export const Overview: Story = {
  render: () => (
    <div className="sb-kou-stack sb-kou-wide">
      <KouSwitchyard
        providers={providers}
        accounts={accounts}
        authed
        demo={false}
        mode="live"
        onNavigate={noop}
        onFlashProvider={noop}
        onAddLine={noop}
        getSignal={signal}
      />
      <KouStatsStrip
        onNavigate={noop}
        tiles={[
          { label: 'LINES', kana: '路線', value: providers.length, accent: true, go: 'providers' },
          { label: 'ACCOUNTS', kana: '口座', value: Object.values(accounts).flat().length, go: 'providers' },
          { label: 'API KEYS', kana: '鍵', value: keys.length, go: 'keys' },
          { label: 'MODELS', kana: '車両', value: models.length, go: 'models' },
          { label: 'ALIASES', kana: '別名', value: aliases.length, go: 'models' },
        ]}
      />
      <OverviewGrid>
        <KouDeparturesBoard rows={boardRows} mode="live" animate />
        <SideStack>
          <KouSignals rows={providers.map((provider, index) => ({
            id: provider.id,
            name: provider.name ?? provider.provider,
            color: lineColor(provider, index),
            signal: signal(provider),
          }))} />
        </SideStack>
      </OverviewGrid>
    </div>
  ),
}

export const Providers: Story = {
  render: () => (
    <div className="sb-kou-wide">
      <KouProvidersView
        providers={providers}
        accounts={accounts}
        authed
        demo={false}
        flashProviderId="pc-codex"
        onImportPreset={noop}
        onConnect={noop}
        onAccountAction={(_action: KouProviderAccountAction) => {}}
        getSignal={signal}
      />
    </div>
  ),
}

export const KeysAndModels: Story = {
  render: () => (
    <div className="sb-kou-stack sb-kou-wide">
      <KouKeysView
        keys={keys}
        authed
        name="storybook"
        selectedModels={['gpt-5-codex']}
        modelOptions={models.map(model => ({ value: model.id, label: model.id }))}
        newKey={null}
        onNameChange={noop}
        onSelectedModelsChange={noop}
        onCreate={noop}
        onRevoke={noop}
        onCloseNewKey={noop}
        onCopyNewKey={noop}
      />
      <KouModelsView
        models={models}
        aliases={aliases}
        alias="smart"
        target="claude-opus-4-1"
        onAliasChange={noop}
        onTargetChange={noop}
        onAddAlias={noop}
      />
    </div>
  ),
}

export const Logs: Story = {
  render: () => (
    <div className="sb-kou-wide">
      <KouLogsView
        logs={logs}
        providers={providers}
        authed
        detail={null}
        onRefresh={noop}
        onClean={noop}
        onOpenLog={noop}
        onCloseDetail={noop}
      />
    </div>
  ),
}

export const LogPipeline: Story = {
  render: () => (
    <div className="sb-kou-wide">
      <KouLogsView
        logs={logs}
        providers={providers}
        authed
        detail={detail}
        onRefresh={noop}
        onClean={noop}
        onOpenLog={noop}
        onCloseDetail={noop}
      />
    </div>
  ),
}

export const Settings: Story = {
  render: () => (
    <div className="sb-kou-wide">
      <KouSettingsView
        demo={false}
        authed
        authStatus={{ auth_required: true, setup_complete: true }}
        settingsJson={JSON.stringify({ routing_strategy: 'priority', retry_max_attempts: 3 }, null, 2)}
        onSettingsJsonChange={noop}
        onSave={noop}
        onSignOut={noop}
      />
    </div>
  ),
}

export const AuthGate: Story = {
  render: () => <KouGateScreen error="" onSubmit={noop} />,
}

export const Modals: Story = {
  render: () => (
    <KouImportLineModal
      open
      selected="codex"
      available={presets}
      name=""
      prefix=""
      onPresetChange={noop}
      onNameChange={noop}
      onPrefixChange={noop}
      onClose={noop}
      onImport={noop}
    />
  ),
}

export const ConnectAccountModal: Story = {
  render: () => (
    <KouConnectAccountModal
      open
      authMode="oauth"
      label="main"
      redirect={null}
      defaultRedirect="http://localhost:1455/auth/callback"
      proxy=""
      code=""
      apiKey=""
      sessionActive
      onAuthModeChange={noop}
      onLabelChange={noop}
      onRedirectChange={noop}
      onProxyChange={noop}
      onCodeChange={noop}
      onApiKeyChange={noop}
      onClose={noop}
      onSubmit={noop}
    />
  ),
}
