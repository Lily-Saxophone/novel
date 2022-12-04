import type { SlideActions } from "./SlideActions";
import type { SlideController } from "./SlideController";
import type { SlideText } from "./SlideText";

export type SlideEvent = {
  slideAction?: SlideActions,
  slideObject: SlideController | SlideText,
  slideType: 'Image' | 'Music' | 'Character' | 'Text'
}
