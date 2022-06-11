import type { Component } from 'solid-js';
import PoppoIcon from '../../assets/image/Poppo.webp'
import styles from '../../assets/css/scene/scene.module.css';

const SceneFlow: Component = () => {
  return (
    <>
      <div class={styles.flow_item_asset}>
        <div class={styles.flow_item_action_btn}>
          <img src={PoppoIcon} alt="" />
        </div>
        <div class={styles.flow_item}>
          <div class={styles.flow_item_left}><img src={PoppoIcon} alt="" /></div>
          <div class={styles.flow_item_right}>ヤマモ - ギター立ち絵 -</div>
        </div>
      </div>
    </>
  );
};

export default SceneFlow;
