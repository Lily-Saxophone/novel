import SceneRenderer from '../../components/sceneRenderer/SceneRenderer';
import { Component, createSignal, Signal } from 'solid-js';
import Masonry from "solid-masonry";
import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';
import SceneFlow from '../../components/sceneFlow/SceneFlow';
import type { SceneModel } from '../../models/scene/SceneModel';
import { SceneList } from '../../models/scene/SceneList';
import { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import { EndEvent } from '../../models/scene/EndEvent';
import { ScenarioList } from '../../models/scenario/ScenarioList';
import SceneUtil from '../../utils/scene/sceneUtil';
import _ from 'lodash';
import SceneDetail from '../../components/sceneDetail/SceneDetail';
import SceneScenario from '../../components/sceneScenario/SceneScenario';
import SceneMedia from '../../components/sceneMedia/SceneMedia';
import FlowHeaderRightContent from '../../components/sceneFlow/FlowHeaderRightContent';
import storyJson from '../../assets/project/json/xxx.json'

// ストーリー（物語全体）
const story: ScenarioList = storyJson

// シナリオ
let scenario = story.scenarioList[0].scenario;

let idx: number = 0;

// シーン
const [sceneList, setSceneList]: Signal<SceneList> = createSignal(scenario[0]);

// １コマ
const [scene, setScene]: Signal<SceneModel | ChoicesEvent | EndEvent> = createSignal(sceneList().scene[0]);

const [sceneIndex, setSceneIndex]: Signal<number> = createSignal(0)

const handleSceneIndexChange = (index?: number) => {
  if (index !== undefined) {
    setSceneIndex(index)
    idx = index;
  } else {
    idx += sceneList().scene.length > (idx + 1) ? 1 : 0
  }
  setScene(sceneList().scene[idx]);
}

const handleSetScene = () => {
  idx += sceneList().scene.length > (idx + 1) ? 1 : 0

  setScene(sceneList().scene[idx]);

  // console.log(!SceneUtil.isChoicesEvent(scene()))
  // console.log(!_.isEmpty((scene() as ChoicesEvent).choicesList))
  // if (!SceneUtil.isChoicesEvent(scene())) {
  //   if (!_.isEmpty((scene() as ChoicesEvent).choicesList)) {
  //     setScene({ choicesList: [] });
  //     setScene(sceneList().scene[idx]);
  //   }
  // }

  if (SceneUtil.isEndEvent(scene())) {
    nextScenario((scene() as EndEvent).nextScenarioKey, (scene() as EndEvent).nextSceneKey);
  }

  handleSceneIndexChange(idx)
}

// 選択肢クリック時イベント（選択肢のキーから該当のシーンへ遷移）
const handleChoicesClick = (event: any) => {
  let wkSceneList = getSceneList((event.currentTarget as HTMLDivElement).dataset.key);
  if (wkSceneList !== undefined) {
    idx = 0;
    setSceneList(wkSceneList);
    setScene({ choicesList: [] });
    setScene(sceneList().scene[idx]);

    handleSceneIndexChange(idx)
  }
}

// keyからシーン取得
const getSceneList = (sceneKey: string | undefined): SceneList | undefined => {
  if (sceneKey !== "") {
    return scenario.find(element => element.sceneKey === sceneKey);
  } else {
    return scenario[0];
  }
}

// 次のシナリオへ遷移
const nextScenario = (scenarioKey: string, sceneKey: string) => {
  let wkScenario: SceneList[] | undefined = story.scenarioList.find(element => element.scenarioKey === scenarioKey)?.scenario;
  if (wkScenario !== undefined) {
    scenario = wkScenario;

    let wkSceneList = getSceneList(sceneKey);
    if (wkSceneList !== undefined) {
      idx = 0;
      setSceneList(wkSceneList);
      setScene(sceneList().scene[idx]);
    }
  }
}

// Detail用イベントハンドラー
const DetailChange = (item: SceneModel) => {
  setScene({ ...item })
}

const [data, setData]: Signal<PalletType[]> = createSignal([
  {
    headerContent: { title: 'Scenario' },
    content: <SceneScenario />,
    width: "calc(22.5vw - 10px)",
    height: "calc(46.5vh - 10px - 13px)"
  },
  {
    content: <SceneRenderer scene={scene()} onSceneClick={handleSetScene} onChoicesClick={handleChoicesClick} />,
    width: "calc(51vw - 10px)",
    height: "calc(58vh - 10px  - 13px)"
  },
  {
    headerContent: { title: 'Flow', right: <FlowHeaderRightContent /> },
    content: <SceneFlow onSceneIndexChange={handleSceneIndexChange} selectedSceneIndex={sceneIndex()} flowItems={sceneList()} />,
    width: "calc(25vw - 10px)",
    height: "calc(93vh - 13px)"
  },
  {
    headerContent: { title: 'Media' },
    content: <SceneMedia />,
    width: "calc(22.5vw - 10px)",
    height: "46.5vh"
  },
  {
    headerContent: { title: 'Detail' },
    content: <SceneDetail
      scene={scene()}
      onSceneUpdate={DetailChange}
    />,
    width: "calc(51vw - 10px)",
    height: "35vh"
  }
]);

const Scene: Component = () => {

  return (
    <Masonry
      breakpointCols={{ default: 3 }}
      className={styles.my_masonry_grid}
      columnClassName={styles.my_masonry_grid_column}
      each={data()}
    >
      {(item: PalletType) => (
        <Palette width={item.width} height={item.height} headerContent={item.headerContent}>
          {item.content}
        </Palette>
      )}
    </Masonry>
  );
};

export default Scene;
