import { Component, createEffect, For, Match, ParentProps, Show, Switch } from 'solid-js';
import { createStore, Store } from "solid-js/store"; 
import styles from '../../assets/css/scene/scene.module.css';
import type { SceneChild } from 'models/scene/SceneChild';
import type { SceneEvent } from 'models/scene/SceneEvent';
import { SceneList } from 'models/scene/SceneList';
import SceneUtil from '../../utils/scene/sceneUtil';

export type SceneFlowPropType = ParentProps & {
  onSceneIndexChange: (idx: number) => void,
  selectedSceneIndex: number,
  flowItems: SceneList
}

const [sceneChilds, setSceneChilds]: Store<SceneList> = createStore([]);

const handleChageScene = (items: SceneList) => {
  // シーンからFlow描写用の差分を生成
  setSceneChilds(SceneUtil.generateFlowDiff(items))
}

const SceneFlow: Component<SceneFlowPropType> = (props: SceneFlowPropType) => {
  createEffect(() => handleChageScene(props.flowItems));

  const handleClickStage = (e: MouseEvent, arg: SceneChild) => {
    const selectedIndex = sceneChilds.findIndex((x: SceneChild) => x.sceneIndex === arg.sceneIndex)
    props.onSceneIndexChange(selectedIndex)
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div class={styles.flow_container}>
        <div class={styles.flow_line}></div>
        <For each={sceneChilds} fallback={<div>Loading...</div>}>
          {(child: SceneChild) => (
            <div class={styles.flow_item_stage}  data-stage-active={child.sceneIndex === props.selectedSceneIndex} onClick={(e) => handleClickStage(e, child)}>
              
              <For each={child.sceneEvent} fallback={<div>Loading...</div>}>
                {(events: SceneEvent) => (
                  <Switch>
                    <Match when={events.sceneType === 'Text'}>
                      <div class={styles.flow_item_text}>
                        <span>
                        <For each={events.sceneObject.textList} fallback={<div>Loading...</div>}>
                          {(text) => (<>{text}<br /></>)}
                        </For>
                        </span>
                      </div>
                    </Match>
                    <Match when={events.sceneType === 'Image'}>
                      <div class={styles.flow_item_asset}>
                        <div class={styles.flow_item_action_btn}>
                          {/* <img src={PoppoIcon} alt="" /> */}
                          <Switch>
                            <Match when={events.sceneAction === 'add'}>
                              <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                            </Match>
                            <Match when={events.sceneAction === 'change'}>
                              <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                            </Match>
                            <Match when={events.sceneAction === 'remove'}>
                              <span class="material-symbols-outlined" data-action-type={'remove'}>remove</span>
                            </Match>
                          </Switch>
                        </div>
                        <div class={styles.flow_item}>
                          <div class={styles.flow_item_left}>
                            {/* <img src={PoppoIcon} alt="" /> */}
                            <span class="material-symbols-outlined">wallpaper</span>
                          </div>
                          <div class={styles.flow_item_right}>{events.sceneObject.backGroundImage?.split('/').slice(-1)[0]}</div>
                        </div>
                      </div>
                    </Match>
                    <Match when={events.sceneType === 'Music'}>
                      <div class={styles.flow_item_asset}>
                        <div class={styles.flow_item_action_btn}>
                          {/* <img src={PoppoIcon} alt="" /> */}
                          <Switch>
                            <Match when={events.sceneAction === 'add'}>
                              <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                            </Match>
                            <Match when={events.sceneAction === 'change'}>
                              <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                            </Match>
                            <Match when={events.sceneAction === 'remove'}>
                              <span class="material-symbols-outlined" data-action-type={'remove'}>remove</span>
                            </Match>
                          </Switch>
                        </div>
                        <div class={styles.flow_item}>
                          <div class={styles.flow_item_left}>
                            {/* <img src={PoppoIcon} alt="" /> */}
                            <span class="material-symbols-outlined">music_note</span>
                          </div>
                          <div class={styles.flow_item_right}>{events.sceneObject.backGroundMusic?.split('/').slice(-1)[0]}</div>
                        </div>
                      </div>
                    </Match>
                    <Match when={events.sceneType === 'Character'}>
                      <For each={events.sceneObject.characterList} fallback={<div>Loading...</div>}>
                        {(character: string) => (
                          <div class={styles.flow_item_asset}>
                            <div class={styles.flow_item_action_btn}>
                              {/* <img src={PoppoIcon} alt="" /> */}
                              <Switch>
                                <Match when={events.sceneAction === 'add'}>
                                  <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                                </Match>
                                <Match when={events.sceneAction === 'change'}>
                                  <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                                </Match>
                                <Match when={events.sceneAction === 'remove'}>
                                  <span class="material-symbols-outlined" data-action-type={'remove'}>remove</span>
                                </Match>
                              </Switch>
                            </div>
                            <div class={styles.flow_item}>
                              <div class={styles.flow_item_left}>
                                {/* <img src={PoppoIcon} alt="" /> */}
                                <span class="material-symbols-outlined">person</span>
                              </div>
                              <div class={styles.flow_item_right}>{character.split('/').slice(-1)[0]}</div>
                            </div>
                          </div>
                        )}
                      </For>
                    </Match>
                  </Switch>
                )}
              </For>
              <Show when={child.sceneIndex === props.selectedSceneIndex}>
                <div class={styles.flow_item_add_stage_btn}>
                  <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                </div>
              </Show>
            </div>
          )}
          </For>

      </div>
    </>
  );
};

export default SceneFlow;
