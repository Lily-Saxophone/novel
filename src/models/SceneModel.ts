import { SceneText } from './SceneText';

export type SceneModel = {
  backGroundImage: string,
  characterList: Array<Map<string, string>>,
  sceneText: SceneText
}