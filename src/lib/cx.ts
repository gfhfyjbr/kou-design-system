/** Join class names, dropping falsey values. The kit's one class composer —
 *  every component routes its class string through this instead of hand-rolling
 *  `[...].filter(Boolean).join(' ')`. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}
