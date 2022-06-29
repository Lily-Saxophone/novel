import { ChoicesEvent } from "./ChoicesEvent";
import { EndEvent } from "./EndEvent";
import { SceneModel } from "./SceneModel";


export type SceneList = {
  sceneKey: string,
  scene: Array<SceneModel | ChoicesEvent | EndEvent>
}