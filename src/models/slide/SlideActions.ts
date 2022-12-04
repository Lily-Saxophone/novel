const Actions = {
  ADD: 'add',
  CHANGE: 'change',
  REMOVE: 'remove',
} as const;

export type SlideActions = typeof Actions[keyof typeof Actions];