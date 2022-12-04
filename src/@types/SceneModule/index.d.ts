declare module SlideModule {
  export interface SlideText {
    characterName: string,
    textList: Array<string>
  }

  export interface Slide {
    backGroundImage: string,
    characterList: Array<Map<string, string>>,
    textList: SlideText
  }

  export type SlideChild = {
    childId: string,
    slideEvent: Array<SlideEvent>,
    isActive?: boolean
  }

  export type SlideEvent = {
    slideAction?: SlideActions,
    slideObject: SlideController | SlideText,
    slideType: 'Image' | 'Music' | 'Character' | 'Text'
  }

  export type SlideActions = string

  export type SlideController = {
    backGroundImage?: string,
    backGroundMusic?: string,
    characterList?: Array<string>,
  }
}