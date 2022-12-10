import { ChoicesEvent } from "./ChoicesEvent";
import { EndEvent } from "./EndEvent";
import { SlideModel } from "./SlideModel";

export type Scene = {
  sceneKey: string,
  sceneTitle: string,
  slide: Array<SlideModel | ChoicesEvent | EndEvent>
}