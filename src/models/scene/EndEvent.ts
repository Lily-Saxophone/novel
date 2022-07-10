import type { SceneActions } from "./SceneActions";
import type { SceneController } from "./SceneController";
import type { SceneText } from "./SceneText";

export type EndEvent = {
  nextScenarioKey: string,
  nextScenarioName: string,
  nextSceneKey: string,
  nextSceneName: string
}