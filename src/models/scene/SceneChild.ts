import { SceneEvent } from "./SceneEvent";

export type SceneChild = {
  childId: string,
  sceneEvent: Array<SceneEvent>,
  isActive?: boolean
}
