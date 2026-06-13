export type KouMode = 'connecting' | 'live' | 'demo'

export type KouViewName = 'overview' | 'providers' | 'keys' | 'models' | 'logs' | 'settings'

export interface KouViewMeta {
  t: string
  k: string
}

export const KOU_VIEW_META: Record<KouViewName, KouViewMeta> = {
  overview: { t: 'Overview', k: '概況' },
  providers: { t: 'Lines', k: '路線' },
  keys: { t: 'API Keys', k: '鍵' },
  models: { t: 'Models', k: '車両' },
  logs: { t: 'Request Logs', k: '記録' },
  settings: { t: 'Settings', k: '設定' },
}

export interface KouProvider {
  id: string
  provider: string
  name?: string | null
  base_url?: string | null
  model_prefix?: string | null
  priority?: number | null
  enabled?: boolean
  default_model?: string | null
  rate_limited_until?: string | null
  last_error?: string | null
  last_error_type?: string | null
  last_error_at?: string | null
}

export interface KouAccount {
  id: string
  label?: string | null
  auth_mode?: string
  remote_email?: string | null
  enabled: boolean
  priority?: number | null
  last_used_at?: string | null
  expires_at?: string | null
  rate_limited_until?: string | null
  circuit_open_until?: string | null
  has_refresh_token?: boolean
  proxy_url?: string | null
  last_error?: string | null
  last_error_type?: string | null
  updated_at?: string | null
}

export interface KouModelInfo {
  id: string
  owned_by?: string
}

export interface KouAliasRow {
  alias: string
  target: string
}

export interface KouApiKeyRow {
  id: string
  name: string
  key_prefix: string
  allowed_models?: string[]
  is_active?: boolean
  usage_count?: number
  last_used_at?: string | null
  created_at?: string | null
}

export interface KouAuthStatus {
  auth_required: boolean
  setup_complete: boolean
}

export interface KouPreset {
  id: string
  display_name: string
  base_url: string
}

export interface KouLogRow {
  id: string
  endpoint: string
  requested_model: string
  resolved_model: string
  provider_id?: string | null
  provider_account_id?: string | null
  account_label?: string | null
  api_key_name?: string | null
  status: number
  error?: string | null
  attempts: number
  is_stream: boolean
  input_tokens?: number | null
  output_tokens?: number | null
  cache_read_tokens?: number | null
  cost_usd?: number | null
  duration_ms: number
  client_body?: string | null
  created_at: string
}

export interface KouLogUpstreamRequest {
  id: string
  provider_id: string
  provider_account_id?: string | null
  model: string
  endpoint: string
  sequence_no: number
  raw_body: string
  created_at: string
}

export interface KouLogUpstreamResponse extends KouLogUpstreamRequest {
  upstream_status: number
}

export interface KouLogDetail {
  log: KouLogRow
  upstream_requests: KouLogUpstreamRequest[]
  upstream_responses: KouLogUpstreamResponse[]
}

export type KouSignalState = 'ok' | 'warn' | 'err' | 'off'

export interface KouProviderSignal {
  s: KouSignalState
  note: string
}

export interface KouBoardEvent {
  id: string
  time: string
  model: string
  line: string
  color: string
  status: 'ok' | 'warn' | 'err'
  lat: string | null
}

export type KouProviderAccountAction = 'refresh' | 'disable' | 'enable' | 'proxy' | 'delete'

export interface KouDropdownOption {
  value: string
  label: string
  hint?: string
}
