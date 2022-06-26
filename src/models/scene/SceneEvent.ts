import type { SceneActions } from "./SceneActions";
import type { SceneController } from "./SceneController";
import type { SceneText } from "./SceneText";

export type SceneEvent = {
  sceneAction: SceneActions,
  sceneObject: SceneController | SceneText
}
