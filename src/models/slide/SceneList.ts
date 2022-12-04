import { ChoicesEvent } from "./ChoicesEvent";
import { EndEvent } from "./EndEvent";
import { SlideModel } from "./SlideModel";

export type Scene = {
  slideKey: string,
  slide: Array<SlideModel | ChoicesEvent | EndEvent>
}