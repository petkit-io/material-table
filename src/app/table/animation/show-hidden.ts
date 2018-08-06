import {
  config
} from './config';

import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata
} from '@angular/animations';

export enum ShowHiddenAnimationState {
  SHOW = 'show',
  HIDDEN = 'hidden',
}

export const showHiddenAnimation: AnimationTriggerMetadata = trigger(
  'showHidden', [
    state(ShowHiddenAnimationState.SHOW, style({ opacity: 1 })),
    state(ShowHiddenAnimationState.HIDDEN, style({ opacity: 0 })),
    transition(
      `${ShowHiddenAnimationState.SHOW} <=> ${ShowHiddenAnimationState.HIDDEN}`, [animate(config.timing)]
    )
  ]
);
