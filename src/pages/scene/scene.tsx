import SceneRenderer from '../../components/sceneRenderer/SceneRenderer';
import { Component, createEffect, createSignal, JSX, Signal } from 'solid-js';
import Masonry from "solid-masonry";
import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';
import SceneFlow from '../../components/scene/SceneFlow';
import type { SceneModel } from '../../models/scene/SceneModel';
import { SceneList } from '../../models/scene/SceneList';
import { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import { EndEvent } from '../../models/scene/EndEvent';
import SceneUtil from '../../utils/scene/sceneUtil'
import { ScenarioList } from '../../models/scenario/ScenarioList';
import _ from 'lodash';

// ストーリー（物語全体）
const story: ScenarioList = {
  scenarioList: [
    {
      scenarioKey: "first",
      scenario: [
        {
          sceneKey: "a",
          // シーン１（初期読み込み）
          scene: [
            {
              backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
              backGroundMusic: "ponnu.wav",
              characterList: [
                "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
              ],
              sceneText: {
                speaker: "？？？？？",
                textList: [
                  "ちょっと、あんた！",
                  "せっかく私が声を掛けてあげてるんだからすぐに反応しなさいよ！"
                ]
              }
            },
            {
              backGroundImage: "/src/assets/project/image/character/星野・ニャー/風呂絵.png",
              backGroundMusic: "",
              // backGroundMusic: "/src/assets/project/audio/background/2-0005684112.flac",
              characterList: [],
              sceneText: {
                speaker: "ニャー",
                textList: [
                  "なになに、けいちゃん。",
                  "もしかして興奮しちゃったのかな？"
                ]
              }
            },
            {
              choicesList: [["b", "シナリオsecond、scene未選択ルート"], ["c", "シナリオsecond、シーンbルート"], ["b", "ダイナミック琉球"]]
            }
          ]
        },

        // シーン２（選択肢１、３）
        {
          sceneKey: "b",
          scene: [
            {
              backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
              backGroundMusic: "",
              characterList: [
                "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
              ],
              sceneText: {
                speaker: "？？？？？",
                textList: [
                  "シナリオsecond、シーン未選択ルートへ遷移します"
                ]
              }
            },
            {
              nextScenario: "second",
              nextScene: ""
            }
          ]
        },

        // シーン３（選択肢２、４）
        {
          sceneKey: "c",
          scene: [
            {
              backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
              backGroundMusic: "",
              characterList: [
                "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
              ],
              sceneText: {
                speaker: "？？？？？",
                textList: [
                  "シナリオsecond、シーンbルートへ遷移します"
                ]
              }
            },
            {
              nextScenario: "second",
              nextScene: "b"
            }
          ]
        }
      ]
    },
    // シナリオ２
    {
      scenarioKey: "second",
      scenario: [
        {
          sceneKey: "a",
          scene: [
            {
              backGroundImage: "/src/assets/project/image/character/星野・ニャー/風呂絵.png",
              backGroundMusic: "",
              characterList: [
                ""
              ],
              sceneText: {
                speaker: "？？？？？",
                textList: [
                  "シナリオsecond、シーンaです"
                ]
              }
            },
            {
              nextScenario: "first",
              nextScene: "a"
            }
          ]
        },
        {
          sceneKey: "b",
          scene: [
            {
              backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
              backGroundMusic: "",
              characterList: [
                "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
              ],
              sceneText: {
                speaker: "？？？？？",
                textList: [
                  "シナリオsecond、シーンbです"
                ]
              }
            },
            {
              nextScenario: "first",
              nextScene: "b"
            }
          ]
        }
      ]
    }
  ]
}


// シナリオ
let scenario = story.scenarioList[0].scenario;

let idx: number = 0;

// シーン
const [sceneList, setSceneList]: Signal<SceneList> = createSignal(scenario[0]);

// １コマ
const [scene, setScene]: Signal<SceneModel | ChoicesEvent | EndEvent> = createSignal(sceneList().scene[0]);

// シーンからFlow描写用の差分を生成
const sceneChilds = SceneUtil.generateFlowDiff(sceneList())
console.log(sceneChilds)
const isSceneModel = (obj: any): obj is SceneModel =>
  typeof obj === "object"
  && obj !== null
  && typeof (obj as SceneModel).backGroundImage === "string"
  && typeof (obj as SceneModel).backGroundMusic === "string";

const isEndEvent = (obj: any): obj is EndEvent =>
  typeof obj === "object"
  && obj !== null
  && typeof (obj as EndEvent).nextScenario === "string";

const handleSetScene = () => {
  if (sceneList().scene.length > (idx + 1)) {
    idx++;
  } else {
    idx = 0;
    console.log('click2')
  }

  setScene(sceneList().scene[idx]);

  if (isEndEvent(scene())) {
    nextScenario((scene() as EndEvent).nextScenario, (scene() as EndEvent).nextScene);
    console.log('click3')

  }
  console.log(idx);
  setScene(sceneList().scene[idx]);
}

// 選択肢クリック時イベント（選択肢のキーから該当のシーンへ遷移）
const handleChoicesClick = (event: any) => {
  let wkSceneList = getSceneList((event.currentTarget as HTMLDivElement).dataset.key);
  if (wkSceneList !== undefined) {
    idx = 0;
    setSceneList(wkSceneList);
    setScene({ choicesList: [] });
    setScene(sceneList().scene[idx]);
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

const handleSceneIndexChange = (index: number) => {
  setSceneIndex(index)
  idx = index;
  setScene(sceneList().scene[idx]);
}

const [sceneIndex, setSceneIndex]: Signal<number> = createSignal(0);

const [data, setData]: Signal<PalletType[]> = createSignal([
  { title: "Motion", content: <></>, width: "calc(22.5vw - 10px)", height: "calc(46.5vh - 10px - 13px)" },
  { title: "Main", content: <SceneRenderer scene={scene()} onSceneClick={handleSetScene} onChoicesClick={handleChoicesClick} />, width: "calc(51vw - 10px)", height: "calc(58vh - 10px  - 13px)" },
  { title: "Flow", content: <SceneFlow onSceneIndexChange={handleSceneIndexChange} selectedSceneIndex={sceneIndex()} flowItems={sceneChilds} />, width: "calc(25vw - 10px)", height: "calc(93vh - 13px)" },
  { title: "Media", content: <></>, width: "calc(22.5vw - 10px)", height: "46.5vh" },
  { title: "Mitei", content: <></>, width: "calc(51vw - 10px)", height: "35vh" },
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
        <Palette width={item.width} height={item.height}>
          {item.content}
        </Palette>
      )}
    </Masonry>
  );
};

export default Scene;
