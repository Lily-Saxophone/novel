import SceneRenderer from '../../components/sceneRenderer/SceneRenderer';
import { Component, createEffect, createSignal, Signal } from 'solid-js';
import Masonry from "solid-masonry";

import styles from '../../assets/css/scene/scene.module.css';

import Palette, { PalletType } from '../../components/palette/Palette';
import SceneFlow from '../../components/scene/SceneFlow';
import type { SceneModel } from '../../models/scene/SceneModel';
import { SceneChild } from '../../models/scene/SceneChild';

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
const sceneList: Array<SceneModel> = [
  {
    backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
    // backGroundMusic: "",
    backGroundMusic: "/src/assets/project/audio/background/2-0005684112.flac",
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
    // backGroundMusic: "",
    backGroundMusic: "/src/assets/project/audio/background/2-0005684112.flac",
    characterList: [],
    sceneText: {
      speaker: "ニャー",
      textList: [
        "なになに、けいちゃん。",
        "もしかして興奮しちゃったのかな？"
      ]
    }
  }
]

let idx: number = 0;
const [scene, setScene]: Signal<SceneModel> = createSignal(sceneList[idx]);
const handleSetScene = () => {
  idx = idx === 0 ? 1 : 0;
  setScene(sceneList[idx]);
}



const [data, setData]: Signal<PalletType[]> = createSignal([
  { title: "Motion", content: <></>, width: "calc(22.5vw - 10px)", height: "calc(46.5vh - 10px - 13px)" },
  { title: "Main", content: <SceneRenderer scene={scene()} onClick={handleSetScene} />, width: "calc(51vw - 10px)", height: "calc(58vh - 10px  - 13px)" },
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
