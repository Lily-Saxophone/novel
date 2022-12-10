import _ from 'lodash';
import { Story } from '../../models/scenario/Story';

type ScenarioFlowList = {
    fromScenarioKey: string,
    fromSceneKey: string,
    fromSceneTitle: string,
    fromSceneDetail: string,
    fromSceneImage: string,
    toScenarioKey: string,
    toSceneKey: string,
}

type ScenarioType = {
    generateScenarioFlowList: (args: Story) => ScenarioFlowList[]
}

//
const Scenario: ScenarioType = {
    generateScenarioFlowList: (): ScenarioFlowList[] => {
        return {} as ScenarioFlowList[]
    }

}

export default Scenario