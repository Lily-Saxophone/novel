import type { SceneModel } from '../../models/scene/SceneModel';
import type { SceneChild } from '../../models/scene/SceneChild';
import type { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import type { EndEvent } from '../../models/scene/EndEvent';
import type { SceneEvent } from '../../models/scene/SceneEvent';
import type { SceneList } from  '../../models/scene/SceneList';
import _ from 'lodash';

type SceneUtilType = {
    generateFlowDiff: (arg: SceneList) => SceneChild[],
    isSceneModel: (obj: any) => obj is SceneModel,
    isChoicesEvent: (obj: any) => obj is ChoicesEvent,
    isEndEvent: (obj: any) => obj is EndEvent
}

//
const SceneUtil: SceneUtilType = {
    isSceneModel: (obj: any): obj is SceneModel =>
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as SceneModel).backGroundImage === 'string'
        && typeof (obj as SceneModel).backGroundMusic === 'string',

    isChoicesEvent: (obj: any): obj is ChoicesEvent =>
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as ChoicesEvent).choicesList === 'object'
        && Array.isArray((obj as ChoicesEvent).choicesList),

    isEndEvent: (obj: any): obj is EndEvent =>
        typeof obj === 'object'
        && obj !== null
        && typeof (obj as EndEvent).nextScenarioKey === 'string'
        && typeof (obj as EndEvent).nextSceneKey === 'string',
    
    generateFlowDiff: (scenario: SceneList): SceneChild[] => {

        const sceneChilds: SceneChild[] = []
        _.forEach(scenario.scene, (s: SceneModel | ChoicesEvent | EndEvent, index: number) => {
            if (SceneUtil.isSceneModel(s)) {
                const sceneEvents: SceneEvent[] = []
                const base: SceneModel = (index !== 0 ? scenario.scene[index - 1] : {}) as SceneModel

                if (s.backGroundImage !== base.backGroundImage) {
                    const sceneEvent: SceneEvent = {} as SceneEvent
                    sceneEvent.sceneType = 'Image'
                    if (_.isEmpty(base.backGroundImage) && !_.isEmpty(s.backGroundImage)) {
                        sceneEvent.sceneAction = 'add'
                        sceneEvent.sceneObject = { backGroundImage: s.backGroundImage }
                        sceneEvents.push(sceneEvent)
                    } else if (!_.isEmpty(base.backGroundImage) && !_.isEmpty(s.backGroundImage)) {
                        sceneEvent.sceneAction = 'change'
                        sceneEvent.sceneObject = { backGroundImage: s.backGroundImage }
                        sceneEvents.push(sceneEvent)
                    } else if (!_.isEmpty(base.backGroundImage) && _.isEmpty(s.backGroundImage)) {
                        sceneEvent.sceneAction = 'remove'
                        sceneEvent.sceneObject = { backGroundImage: base.backGroundImage }
                        sceneEvents.push(sceneEvent)
                    }
                }
                
                if (s.backGroundMusic !== base.backGroundMusic) {
                    const sceneEvent: SceneEvent = {} as SceneEvent
                    sceneEvent.sceneType = 'Music'
                    if (_.isEmpty(base.backGroundMusic) && !_.isEmpty(s.backGroundMusic)) {
                        sceneEvent.sceneAction = 'add'
                        sceneEvent.sceneObject = { backGroundMusic: s.backGroundMusic }
                        sceneEvents.push(sceneEvent)
                    } else if (!_.isEmpty(base.backGroundMusic) && !_.isEmpty(s.backGroundMusic)) {
                        sceneEvent.sceneAction = 'change'
                        sceneEvent.sceneObject = { backGroundMusic: s.backGroundMusic }
                        sceneEvents.push(sceneEvent)
                    } else if (!_.isEmpty(base.backGroundMusic) && _.isEmpty(s.backGroundMusic)) {
                        sceneEvent.sceneAction = 'remove'
                        sceneEvent.sceneObject = { backGroundMusic: base.backGroundMusic }
                        sceneEvents.push(sceneEvent)
                    }
                }

                if (s.characterList !== base.characterList) {
                    if (_.isEmpty(s.characterList)) {
                        _.forEach(base.characterList, (character: string) => {
                        const sceneEvent: SceneEvent = {} as SceneEvent
                        sceneEvent.sceneObject = { characterList: [ character ] }
                        sceneEvent.sceneType = 'Character'
                        sceneEvent.sceneAction = 'remove'
                        sceneEvents.push(sceneEvent)
                        })
                    } else {
                        _.forEach(s.characterList, (character: string) => {
                            const sceneEvent: SceneEvent = {} as SceneEvent
                            sceneEvent.sceneType = 'Character'
                            if (_.isEmpty(base.characterList) || base.characterList?.findIndex((c: string) => c === character) === -1) {
                                sceneEvent.sceneAction = 'add'
                                sceneEvent.sceneObject = { characterList: s.characterList }
                            }
                            else {
                                sceneEvent.sceneAction = 'remove'
                                sceneEvent.sceneObject = { characterList: base.characterList }
                            }

                            sceneEvents.push(sceneEvent)
                        })
                    }
                }

                if (!_.isEmpty(s.sceneText)) {
                    const sceneEvent: SceneEvent = {} as SceneEvent
                    sceneEvent.sceneObject = s.sceneText
                    sceneEvent.sceneType = 'Text'

                    sceneEvents.push(sceneEvent)
                }
                
                const sortedEvents = _.orderBy(sceneEvents, ['sceneAction', 'sceneType'], ['desc', 'asc'])
                sceneChilds.push({ childIndex: index, childEvent: sortedEvents, childType: 'Scene' })
            } else if (SceneUtil.isChoicesEvent(s)) {
                const choicesEvent: ChoicesEvent = { choicesList: s.choicesList } 
                sceneChilds.push({ childIndex: index, childEvent: choicesEvent, childType: 'Choices' })
            } else if (SceneUtil.isEndEvent(s)) {
                sceneChilds.push({ childIndex: index, childEvent: s, childType: 'End' })
            }
        })

        return sceneChilds
    }
}

export default SceneUtil