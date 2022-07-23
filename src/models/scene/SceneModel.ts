import { SceneCharacter } from "./SceneCharacter";
import { SceneText } from "./SceneText";

export type SceneModel = {
  backGroundImage: string,
  backGroundMusic: string,
  characterList: Array<SceneCharacter>,
  sceneText: SceneText,
}