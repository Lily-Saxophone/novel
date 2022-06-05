import type { Component } from 'solid-js';
import Masonry from "solid-masonry";

import styles from '../../assets/css/scene/scene.module.css';
import Palette, { PalletType } from '../../components/palette/Palette';

const data: PalletType[] = [
  { title: "Motion",  content: <></>, width: "22.5vw", height: "45.5vh" },
  { title: "Main",    content: <></>, width: "50vw", height: "50vh" },
  { title: "Flow",    content: <></>, width: "25vw", height: "92vh" },
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
