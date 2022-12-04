import { ChoicesEvent } from "./ChoicesEvent";
import { EndEvent } from "./EndEvent";
import { SlideEvent } from "./SlideEvent";

export type SlideChild = {
  childIndex: number,
  childEvent: Array<SlideEvent> | ChoicesEvent | EndEvent,
  childType: 'Slide' | 'Choices' | 'End'
}