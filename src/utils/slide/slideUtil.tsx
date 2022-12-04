import type { SlideModel } from '../../models/slide/SlideModel';
import type { SlideChild } from '../../models/slide/SlideChild';
import type { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import type { EndEvent } from '../../models/slide/EndEvent';
import type { SlideEvent } from '../../models/slide/SlideEvent';
import type { Scene } from  '../../models/slide/Scene';
import _ from 'lodash';

type SlideUtilType = {
    generateFlowDiff: (arg: Scene) => SlideChild[],
    isSlideModel: (obj: any) => obj is SlideModel,
    isChoicesEvent: (obj: any) => obj is ChoicesEvent,
    isEndEvent: (obj: any) => obj is EndEvent
}

//
const SlideUtil: SlideUtilType = {
    isSlideModel: (obj: any): obj is SlideModel =>
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as SlideModel).backGroundImage === 'string'
        && typeof (obj as SlideModel).backGroundMusic === 'string',

    isChoicesEvent: (obj: any): obj is ChoicesEvent =>
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as ChoicesEvent).choicesList === 'object'
        && Array.isArray((obj as ChoicesEvent).choicesList),

    isEndEvent: (obj: any): obj is EndEvent =>
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as EndEvent).nextScenarioKey === 'string'
        && typeof (obj as EndEvent).nextSlideKey === 'string',
    
    generateFlowDiff: (scenario: Scene): SlideChild[] => {

        const slideChilds: SlideChild[] = []
        _.forEach(scenario.slide, (s: SlideModel | ChoicesEvent | EndEvent, index: number) => {
            if (SlideUtil.isSlideModel(s)) {
                const slideEvents: SlideEvent[] = []
                const base: SlideModel = (index !== 0 ? scenario.slide[index - 1] : {}) as SlideModel

                if (s.backGroundImage !== base.backGroundImage) {
                    const slideEvent: SlideEvent = {} as SlideEvent
                    slideEvent.slideType = 'Image'
                    if (_.isEmpty(base.backGroundImage) && !_.isEmpty(s.backGroundImage)) {
                        slideEvent.slideAction = 'add'
                        slideEvent.slideObject = { backGroundImage: s.backGroundImage }
                        slideEvents.push(slideEvent)
                    } else if (!_.isEmpty(base.backGroundImage) && !_.isEmpty(s.backGroundImage)) {
                        slideEvent.slideAction = 'change'
                        slideEvent.slideObject = { backGroundImage: s.backGroundImage }
                        slideEvents.push(slideEvent)
                    } else if (!_.isEmpty(base.backGroundImage) && _.isEmpty(s.backGroundImage)) {
                        slideEvent.slideAction = 'remove'
                        slideEvent.slideObject = { backGroundImage: base.backGroundImage }
                        slideEvents.push(slideEvent)
                    }
                }
                
                if (s.backGroundMusic !== base.backGroundMusic) {
                    const slideEvent: SlideEvent = {} as SlideEvent
                    slideEvent.slideType = 'Music'
                    if (_.isEmpty(base.backGroundMusic) && !_.isEmpty(s.backGroundMusic)) {
                        slideEvent.slideAction = 'add'
                        slideEvent.slideObject = { backGroundMusic: s.backGroundMusic }
                        slideEvents.push(slideEvent)
                    } else if (!_.isEmpty(base.backGroundMusic) && !_.isEmpty(s.backGroundMusic)) {
                        slideEvent.slideAction = 'change'
                        slideEvent.slideObject = { backGroundMusic: s.backGroundMusic }
                        slideEvents.push(slideEvent)
                    } else if (!_.isEmpty(base.backGroundMusic) && _.isEmpty(s.backGroundMusic)) {
                        slideEvent.slideAction = 'remove'
                        slideEvent.slideObject = { backGroundMusic: base.backGroundMusic }
                        slideEvents.push(slideEvent)
                    }
                }

                if (s.characterList !== base.characterList) {
                    if (_.isEmpty(s.characterList)) {
                        _.forEach(base.characterList, (character: string) => {
                        const slideEvent: SlideEvent = {} as SlideEvent
                        slideEvent.slideObject = { characterList: [ character ] }
                        slideEvent.slideType = 'Character'
                        slideEvent.slideAction = 'remove'
                        slideEvents.push(slideEvent)
                        })
                    } else {
                        _.forEach(s.characterList, (character: string) => {
                            const slideEvent: SlideEvent = {} as SlideEvent
                            slideEvent.slideType = 'Character'
                            if (_.isEmpty(base.characterList) || base.characterList?.findIndex((c: string) => c === character) === -1) {
                                slideEvent.slideAction = 'add'
                                slideEvent.slideObject = { characterList: s.characterList }
                            }
                            else {
                                slideEvent.slideAction = 'remove'
                                slideEvent.slideObject = { characterList: base.characterList }
                            }

                            slideEvents.push(slideEvent)
                        })
                    }
                }

                if (!_.isEmpty(s.slideText)) {
                    const slideEvent: SlideEvent = {} as SlideEvent
                    slideEvent.slideObject = s.slideText
                    slideEvent.slideType = 'Text'

                    slideEvents.push(slideEvent)
                }
                
                const sortedEvents = _.orderBy(slideEvents, ['slideAction', 'slideType'], ['desc', 'asc'])
                slideChilds.push({ childIndex: index, childEvent: sortedEvents, childType: 'Slide' })
            } else if (SlideUtil.isChoicesEvent(s)) {
                const choicesEvent: ChoicesEvent = { choicesList: s.choicesList } 
                slideChilds.push({ childIndex: index, childEvent: choicesEvent, childType: 'Choices' })
            } else if (SlideUtil.isEndEvent(s)) {
                slideChilds.push({ childIndex: index, childEvent: s, childType: 'End' })
            }
        })

        return slideChilds
    }
}

export default SlideUtil