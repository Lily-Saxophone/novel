import { SceneEvent } from "./SceneEvent";

export type SceneChild = {
  sceneEvent: Array<SceneEvent>,
  isActive?: boolean
}
