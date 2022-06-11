declare module SceneModule {
  export interface SceneText {
    characterName: string,
    textList: Array<string>
  }

  export interface Scene {
    backGroundImage: string,
    characterList: Array<Map<string, string>>,
    textList: SceneText
  }
}