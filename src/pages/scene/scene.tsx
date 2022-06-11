import SceneRenderer from '../../components/sceneRenderer/SceneRenderer';
import { Component, createEffect, createSignal, Signal } from 'solid-js';
import Masonry from "solid-masonry";

import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';
import type { SceneModel } from '../../models/SceneModel';
import SceneFlow from '../../components/scene/SceneFlow';

const sceneList: Array<SceneModel> = [
  {
    backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
    characterList: [
      "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
    ],
    sceneText: {
      characterName: "？？？？？",
      textList: [
        "ちょっと、あんた！",
        "せっかく私が声を掛けてあげてるんだからすぐに反応しなさいよ！"
      ]
    }
  },
  {
    backGroundImage: "/src/assets/project/image/character/星野・ニャー/風呂絵.png",
    characterList: [],
    sceneText: {
      characterName: "ニャー",
      textList: [
        "なになに、けいちゃん。",
        "もしかして興奮しちゃったのかな？"
      ]
    }
  }
]

const idx: number = 0;
const [scene, setScene]: Signal<SceneModel> = createSignal(sceneList[idx]);
const handleSetScene = () => {
  console.log('click!')
  let nextIndex = idx === 0 ? 1 : 0;
  setScene(sceneList[nextIndex]);
  console.log(scene);
}



const [data, setData]: Signal<PalletType[]> = createSignal([
  { title: "Motion", content: <></>, width: "22.5vw", height: "calc(45.5vh - 10px - 13px)" },
  { title: "Main", content: <SceneRenderer scene={scene()} onClick={handleSetScene} />, width: "50vw", height: "calc(50vh - 10px  - 13px)" },
  { title: "Flow", content: <SceneFlow />, width: "25vw", height: "calc(91vh - 13px)" },
  { title: "Media", content: <></>, width: "22.5vw", height: "45.5vh" },
  { title: "Mitei", content: <></>, width: "50vw", height: "41vh" },
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
