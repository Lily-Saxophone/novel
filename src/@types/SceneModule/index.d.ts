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

  export type SceneChild = {
    childId: string,
    sceneEvent: Array<SceneEvent>,
    isActive?: boolean
  }

  export type SceneEvent = {
    sceneAction?: SceneActions,
    sceneObject: SceneController | SceneText,
    sceneType: 'Image' | 'Music' | 'Character' | 'Text'
  }

  export type SceneActions = string

  export type SceneController = {
    backGroundImage?: string,
    backGroundMusic?: string,
    characterList?: Array<string>,
  }
}