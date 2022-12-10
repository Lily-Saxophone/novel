import SlideRenderer from '../../components/sceneRenderer/SlideRenderer';
import { Component, createSignal, Signal } from 'solid-js';
import Masonry from "solid-masonry";
import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';
import SceneFlow from '../../components/sceneFlow/SceneFlow';
import type { SlideModel } from '../../models/slide/SlideModel';
import { Scene } from '../../models/slide/Scene';
import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';
import { Story } from '../../models/scenario/ScenarioList';
import SlideUtil from '../../utils/slide/slideUtil';
import _ from 'lodash';
import SceneSlide from '../../components/sceneSlide/SceneSlide';
import SceneScenario from '../../components/sceneScenario/SceneScenario';
import SceneMedia from '../../components/sceneMedia/SceneMedia';
import FlowHeaderRightContent from '../../components/sceneFlow/FlowHeaderRightContent';
import storyJson from '../../assets/project/json/xxx.json'

// ストーリー（物語全体）
const story: Story = storyJson

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

  // console.log(!SlideUtil.isChoicesEvent(slide()))
  // console.log(!_.isEmpty((slide() as ChoicesEvent).choicesList))
  // if (!SlideUtil.isChoicesEvent(slide())) {
  //   if (!_.isEmpty((slide() as ChoicesEvent).choicesList)) {
  //     setSlide({ choicesList: [] });
  //     setSlide(slide().slide[idx]);
  //   }
  // }

  if (SlideUtil.isEndEvent(slide())) {
    nextScenario((slide() as EndEvent).nextScenarioKey, (slide() as EndEvent).nextSlideKey);
  }

  handleSlideIndexChange(idx)
}

// 選択肢クリック時イベント（選択肢のキーから該当のシーンへ遷移）
const handleChoicesClick = (event: any) => {
  let wkScene = getScene((event.currentTarget as HTMLDivElement).dataset.key);
  if (wkScene !== undefined) {
    idx = 0;
    setScene(wkScene);
    setSlide({ choicesList: [] });
    setSlide(scene().slide[idx]);

    handleSlideIndexChange(idx)
  }
}

// keyからシーン取得
const getScene = (slideKey: string | undefined): Scene | undefined => {
  if (slideKey !== "") {
    return scenario.find(element => element.slideKey === slideKey);
  } else {
    return scenario[0];
  }
}

// 次のシナリオへ遷移
const nextScenario = (scenarioKey: string, slideKey: string) => {
  let wkScenario: Scene[] | undefined = story.story.find(element => element.scenarioKey === scenarioKey)?.scenario;
  if (wkScenario !== undefined) {
    scenario = wkScenario;

    let wkScene = getScene(slideKey);
    if (wkScene !== undefined) {
      idx = 0;
      setScene(wkScene);
      setSlide(scene().slide[idx]);
    }
  }
}

// Detail用イベントハンドラー
const DetailChange = (item: SlideModel) => {
  setSlide({ ...item })
}

const [data, setData]: Signal<PalletType[]> = createSignal([
  {
    headerContent: { title: 'Scenario' },
    content: <SceneScenario />,
    width: "calc(22.5vw - 10px)",
    height: "calc(46.5vh - 10px - 13px)"
  },
  {
    content: <SlideRenderer slide={slide()} onSlideClick={handleSetSlide} onChoicesClick={handleChoicesClick} />,
    width: "calc(51vw - 10px)",
    height: "calc(58vh - 10px  - 13px)"
  },
  {
    headerContent: { title: 'Flow', right: <FlowHeaderRightContent /> },
    content: <SceneFlow onSlideIndexChange={handleSlideIndexChange} selectedSlideIndex={slideIndex()} flowItems={slide()} />,
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
    content: <SceneSlide
      slide={slide()}
      onSlideUpdate={DetailChange}
    />,
    width: "calc(51vw - 10px)",
    height: "35vh"
  }
]);

const SceneX: Component = () => {

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

export default SceneX;
