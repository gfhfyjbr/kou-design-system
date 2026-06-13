const LINE_FALLBACK = ['#8b7cf6', '#4f8ef7', '#ffb454', '#f56fa1', '#9ad24f']

export interface ColorProvider {
  id?: string | null
  provider?: string | null
  name?: string | null
}

export function lineColor(p: ColorProvider, i = 0): string {
  const k = `${p.provider || ''} ${p.name || ''} ${p.id || ''}`.toLowerCase()
  if (/claude|anthropic/.test(k)) return 'var(--claude)'
  if (/codex|openai|gpt/.test(k)) return 'var(--codex)'
  if (/gemini|google/.test(k)) return '#7aa2ff'
  return LINE_FALLBACK[i % LINE_FALLBACK.length]
}

export function lineCode(p: ColorProvider): string {
  const n = (p.name || p.provider || '??').replace(/[^a-zA-Z0-9 ]/g, ' ').trim()
  const w = n.split(/\s+/)
  return (w.length > 1 ? w[0][0] + w[1][0] : n.slice(0, 2)).toUpperCase()
}

export function modelColor(id: string): string {
  const k = (id || '').toLowerCase()
  if (/claude|anthropic/.test(k)) return 'var(--claude)'
  if (/codex|gpt|o\d|openai/.test(k)) return 'var(--codex)'
  return '#8b7cf6'
}
