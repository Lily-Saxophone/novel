import SceneRenderer from '../../components/sceneRenderer/SceneRenderer';
import { Component, createEffect, createSignal, JSX, Signal } from 'solid-js';
import Masonry from "solid-masonry";

import styles from '../../assets/css/scene/scene.module.css';

import Palette, { PalletType } from '../../components/palette/Palette';
import SceneFlow from '../../components/scene/SceneFlow';
import type { SceneModel } from '../../models/scene/SceneModel';
import { SceneChild } from '../../models/scene/SceneChild';
import { SceneList } from '../../models/scene/SceneList';
import { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import { EndEvent } from '../../models/scene/EndEvent';

// // 差分で更新してくパターン
// const sceneList: Array<SceneChild> = [
//   {
//     sceneEvent: [
//       {
//         sceneAction: "add",
//         sceneObject: {
//           backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
//           characterList: [
//             "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
//           ]
//         }
//       },
//       {
//         sceneAction: 'next',
//         sceneObject: {
//           speaker: "？？？？？",
//           textList: [
//             "ちょっと、あんた！",
//             "せっかく私が声を掛けてあげてるんだからすぐに反応しなさいよ！"
//           ]
//         }
//       },
//     ]
//   },
// ]

// 毎シーン全ての情報を保存しておくパターン
const scenario: SceneList = {
  sceneList: [
    {
      backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
      backGroundMusic: "",
      // backGroundMusic: "/src/assets/project/audio/background/2-0005684112.flac",
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
      choicesList: new Map([["シナリオA", "木村が好き"], ["シナリオC", "木村が変態"], ["シナリオC", "ダイナミック琉球"]])
    },
    {
      nextScenario: ""
    }
  ]
}

let idx: number = 0;
const [scene, setScene]: Signal<SceneModel | ChoicesEvent | EndEvent> = createSignal(scenario.sceneList[idx]);
const handleSetScene = () => {
  console.log(scenario.sceneList.length);
  if (scenario.sceneList.length > (idx + 1)) {
    idx++;
  } else {
    idx = 0;
  }
  console.log(idx);
  setScene(scenario.sceneList[idx]);
}

const handleChoicesClick = (event: any) => {
  console.log((event.currentTarget as HTMLDivElement).dataset);
  setScene({ choicesList: new Map<string, string>([]) });
}



const [data, setData]: Signal<PalletType[]> = createSignal([
  { title: "Motion", content: <></>, width: "calc(22.5vw - 10px)", height: "calc(46.5vh - 10px - 13px)" },
  { title: "Main", content: <SceneRenderer scene={scene()} onSceneClick={handleSetScene} onChoicesClick={handleChoicesClick} />, width: "calc(51vw - 10px)", height: "calc(58vh - 10px  - 13px)" },
  { title: "Flow", content: <SceneFlow />, width: "calc(25vw - 10px)", height: "calc(93vh - 13px)" },
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
