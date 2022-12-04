import type { SlideActions } from "./SlideActions";
import type { SlideController } from "./SlideController";
import type { SlideText } from "./SlideText";

export type EndEvent = {
  nextScenarioKey: string,
  nextScenarioName: string,
  nextSlideKey: string,
  nextSlideName: string
}