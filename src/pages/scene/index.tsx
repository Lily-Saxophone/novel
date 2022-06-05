import type { Component } from 'solid-js';

import styles from '../../assets/css/scene/index.module.css';

const Scene: Component = () => {
  return (
    <div class={styles.grid_container}>
      <div class={styles.grid_item_motion}></div>
      <div class={styles.grid_item_media}></div>
      <div class={styles.grid_item_main}></div>
      <div class={styles.grid_item_mitei}></div>
      <div class={styles.grid_item_flow}></div>
    </div>
  );
};

export default Scene;
