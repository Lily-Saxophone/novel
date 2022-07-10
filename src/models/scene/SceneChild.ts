import { ChoicesEvent } from "./ChoicesEvent";
import { EndEvent } from "./EndEvent";
import { SceneEvent } from "./SceneEvent";

export type SceneChild = {
  childIndex: number,
  childEvent: Array<SceneEvent> | ChoicesEvent | EndEvent,
  childType: 'Scene' | 'Choices' | 'End'
}