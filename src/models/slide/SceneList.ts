import { ChoicesEvent } from "./ChoicesEvent";
import { EndEvent } from "./EndEvent";
import { SlideModel } from "./SlideModel";

export type SceneList = {
  slideKey: string,
  slide: Array<SlideModel | ChoicesEvent | EndEvent>
}