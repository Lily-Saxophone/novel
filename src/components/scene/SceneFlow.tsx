import type { Component } from 'solid-js';
import PoppoIcon from '../../assets/image/Poppo.webp'
import styles from '../../assets/css/scene/scene.module.css';

const SceneFlow: Component = () => {
  return (
    <>
      <div class={styles.flow_container}>
        <div class={styles.flow_line}></div>

        {/* パネル1 */}
        <div class={styles.flow_item_stage}>
          {/* テキスト */}
          <div class={styles.flow_item_text}>
            <span>ぽんぬ、<br />ぽんぬぽんぬ、<br />ぽんぬぽんぬぽんぬ。</span>
          </div>

          {/* アセット1 */}
          <div class={styles.flow_item_asset}>
            <div class={styles.flow_item_action_btn}>
              <img src={PoppoIcon} alt="" />
            </div>
            <div class={styles.flow_item}>
              <div class={styles.flow_item_left}><img src={PoppoIcon} alt="" /></div>
              <div class={styles.flow_item_right}>ヤマモ - ギター立ち絵 -</div>
            </div>
          </div>
          
          {/* アセット2 */}
          <div class={styles.flow_item_asset}>
            <div class={styles.flow_item_action_btn}>
              <img src={PoppoIcon} alt="" />
            </div>
            <div class={styles.flow_item}>
              <div class={styles.flow_item_left}><img src={PoppoIcon} alt="" /></div>
              <div class={styles.flow_item_right}>ヤマモ - ギター立ち絵 -</div>
            </div>
          </div>
        </div>

        {/* パネル2 */}
        <div class={styles.flow_item_stage} data-stage-active={`true`}>
          {/* テキスト */}
          <div class={styles.flow_item_text}>
            <span>ぽんぬ、<br />ぽんぬぽんぬ、<br />ぽんぬぽんぬぽんぬ。</span>
          </div>

          {/* アセット1 */}
          <div class={styles.flow_item_asset}>
            <div class={styles.flow_item_action_btn}>
              <img src={PoppoIcon} alt="" />
            </div>
            <div class={styles.flow_item}>
              <div class={styles.flow_item_left}><img src={PoppoIcon} alt="" /></div>
              <div class={styles.flow_item_right}>ヤマモ - ギター立ち絵 -</div>
            </div>
          </div>
          
          {/* アセット2 */}
          <div class={styles.flow_item_asset}>
            <div class={styles.flow_item_action_btn}>
              <img src={PoppoIcon} alt="" />
            </div>
            <div class={styles.flow_item}>
              <div class={styles.flow_item_left}><img src={PoppoIcon} alt="" /></div>
              <div class={styles.flow_item_right}>ヤマモ - ギター立ち絵 -</div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default SceneFlow;
