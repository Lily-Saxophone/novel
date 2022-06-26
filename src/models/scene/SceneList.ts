import { ChoicesEvent } from "./ChoicesEvent";
import { EndEvent } from "./EndEvent";
import { SceneModel } from "./SceneModel";


export type SceneList = {
  sceneList: Array<SceneModel | ChoicesEvent | EndEvent>
}