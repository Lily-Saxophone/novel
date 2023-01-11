import ScenarioFlow from '../../components/scenarioFlow/ScenarioFlow';
import { Component, createSignal, Signal } from 'solid-js';
import Masonry from "solid-masonry";
import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';
import type { SlideModel } from '../../models/slide/SlideModel';
import { Scene } from '../../models/slide/Scene';
import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';
import { Story } from '../../models/scenario/Story';
import SlideUtil from '../../utils/slide/slideUtil';
import _ from 'lodash';
import SceneScenario from '../../components/sceneScenario/SceneScenario';
import storyJson from '../../assets/project/json/xxx.json'

// ストーリー（物語全体）
const story: Story = storyJson as Story

// シナリオ（第X章）
let scenario = story.story[0].scenario;

let idx: number = 0;

// シーン
const [scene, setScene]: Signal<Scene> = createSignal(scenario[0]);

// １コマ
const [slide, setSlide]: Signal<SlideModel | ChoicesEvent | EndEvent> = createSignal(scene().slide[0]);

const [slideIndex, setSlideIndex]: Signal<number> = createSignal(0)

const handleSlideIndexChange = (index?: number) => {
  if (index !== undefined) {
    setSlideIndex(index)
    idx = index;
  } else {
    idx += scene().slide.length > (idx + 1) ? 1 : 0
  }
  setSlide(scene().slide[idx]);
}

const handleSetSlide = () => {
  idx += scene().slide.length > (idx + 1) ? 1 : 0
  setSlide(scene().slide[idx]);

  if (SlideUtil.isEndEvent(slide())) {
    nextScenario((slide() as EndEvent).nextScenarioKey, (slide() as EndEvent).nextSceneKey);
  }

  handleSlideIndexChange(idx)
}

// 選択肢クリック時イベント（選択肢のキーから該当のシナリオ・シーンへ遷移）
const handleChoicesClick = (event: any) => {
  setSlide({ choicesList: [] });
  nextScenario((event.currentTarget as HTMLDivElement).dataset.scenario, (event.currentTarget as HTMLDivElement).dataset.scene);
}

// keyからシーン取得
const getScene = (sceneKey: string | undefined): Scene | undefined => {
  if (sceneKey !== "") {
    return scenario.find((element: { sceneKey: string | undefined }) => element.sceneKey === sceneKey);
  } else {
    return scenario[0];
  }
}

// 次のシナリオへ遷移
const nextScenario = (scenarioKey: string | undefined, sceneKey: string | undefined) => {
  let wkScenario: Scene[] | undefined = story.story.find(element => element.scenarioKey === scenarioKey)?.scenario;
  if (wkScenario !== undefined) {
    scenario = wkScenario;

    let wkScene = getScene(sceneKey);
    if (wkScene !== undefined) {
      idx = 0;
      setScene(wkScene);
      setSlide(scene().slide[idx]);
    }
  }
}

const ScenarioPage: Component = () => {

  const [data, setData]: Signal<PalletType[]> = createSignal([
    {
      headerContent: { title: 'Flow Chart' },
      content: <ScenarioFlow slide={slide()} onSlideUpdate={handleSetSlide} />,
      width: "calc(76vw - 15px)",
      height: "calc(93vh - 18px)"
    },
    {
      headerContent: { title: 'Scenario' },
      content: <SceneScenario />,
      width: "calc(22.5vw - 15px)",
      height: "calc(93vh - 18px)"
    }
  ]);

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

export default ScenarioPage;
