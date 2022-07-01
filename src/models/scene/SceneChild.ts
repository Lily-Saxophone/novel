import { SceneEvent } from "./SceneEvent";

export type SceneChild = {
  sceneIndex: number,
  sceneEvent: Array<SceneEvent>,
  isActive?: boolean
}
