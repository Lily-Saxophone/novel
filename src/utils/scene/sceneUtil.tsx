import type { SceneModel } from '../../models/scene/SceneModel';
import type { SceneChild } from '../../models/scene/SceneChild';
import type { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import type { EndEvent } from '../../models/scene/EndEvent';
import type { SceneEvent } from "../../models/scene/SceneEvent";
import type { SceneList } from  "../../models/scene/SceneList";
import _ from 'lodash';

type SceneUtilType = {
    generateFlowDiff: (arg: SceneList) => SceneChild[]
}

//
const SceneUtil: SceneUtilType = {
    
    generateFlowDiff: (scenario: SceneList): SceneChild[] => {
        const isSceneModel = (obj: any): obj is SceneModel =>
            typeof obj === "object"
            && obj !== null
            && typeof (obj as SceneModel).backGroundImage === "string"
            && typeof (obj as SceneModel).backGroundMusic === "string";

        const sceneChilds: SceneChild[] = []
        _.forEach(scenario.scene, (s: SceneModel | ChoicesEvent | EndEvent, index: number) => {
            if (isSceneModel(s)) {
                const sceneEvents: SceneEvent[] = []
                const base: SceneModel = (index !== 0 ? scenario.scene[index - 1] : {}) as SceneModel

                if (s.backGroundImage !== base.backGroundImage) {
                    const sceneEvent: SceneEvent = {} as SceneEvent
                    sceneEvent.sceneObject = { backGroundImage: s.backGroundImage }
                    sceneEvent.sceneType = 'Image'
                    if (_.isEmpty(base.backGroundImage) && !_.isEmpty(s.backGroundImage))
                        sceneEvent.sceneAction = 'add'
                    else if (!_.isEmpty(base.backGroundImage) && !_.isEmpty(s.backGroundImage))
                        sceneEvent.sceneAction = 'change'
                    else if (!_.isEmpty(base.backGroundImage) && _.isEmpty(s.backGroundImage)) 
                        sceneEvent.sceneAction = 'remove'

                    sceneEvents.push(sceneEvent)
                }
                
                if (s.backGroundMusic !== base.backGroundMusic) {
                    const sceneEvent: SceneEvent = {} as SceneEvent
                    sceneEvent.sceneObject = { backGroundMusic: s.backGroundMusic }
                    sceneEvent.sceneType = 'Music'
                    if (_.isEmpty(base.backGroundMusic) && !_.isEmpty(s.backGroundMusic))
                        sceneEvent.sceneAction = 'add'
                    else if (!_.isEmpty(base.backGroundMusic) && !_.isEmpty(s.backGroundMusic))
                        sceneEvent.sceneAction = 'change'
                    else if (!_.isEmpty(base.backGroundMusic) && _.isEmpty(s.backGroundMusic)) 
                        sceneEvent.sceneAction = 'remove'
                        
                    sceneEvents.push(sceneEvent)
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
                        sceneEvent.sceneObject = { characterList: s.characterList }
                        sceneEvent.sceneType = 'Character'
                        if (_.isEmpty(base.characterList) || base.characterList?.findIndex((c: string) => c === character) === -1)
                            sceneEvent.sceneAction = 'add'
                        else
                            sceneEvent.sceneAction = 'remove'
                            
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
                sceneChilds.push({ sceneIndex: index, sceneEvent: sortedEvents })
            }
        })
        return sceneChilds
    }

}

export default SceneUtil