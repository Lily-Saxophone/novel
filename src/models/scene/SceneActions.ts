const Actions = {
  NEXT: 'next',
  PREVIOUS: 'previous',
  ADD: 'add',
  CHANGE: 'change',
  REMOVE: 'remove',
} as const;

export type SceneActions = typeof Actions[keyof typeof Actions];