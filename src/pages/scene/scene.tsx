import type { Component, JSX } from 'solid-js';
import Masonry from "solid-masonry";

import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';

const flow: JSX.Element = (
  <>
    <div>
      
    </div>
  </>
)

const data: PalletType[] = [
  { title: "Motion",  content: <></>, width: "22.5vw", height: "calc(45.5vh - 13px)" },
  { title: "Main",    content: <></>, width: "50vw", height: "calc(50vh - 13px)" },
  { title: "Flow",    content: flow, width: "25vw", height: "calc(91vh + 10px - 13px)" },
  { title: "Media",   content: <></>, width: "22.5vw", height: "45.5vh" },
  { title: "Mitei",   content: <></>, width: "50vw", height: "41vh" },
];

const Scene: Component = () => {
  return (
    <Masonry
      breakpointCols={{ default: 3 }}
      className={styles.my_masonry_grid}
      columnClassName={styles.my_masonry_grid_column}
      each={data}
    >
      {(item: PalletType) => (
        <Palette width={item.width} height={item.height}>
          {item.title}
        </Palette>
      )}
    </Masonry>
  );
};

export default Scene;
