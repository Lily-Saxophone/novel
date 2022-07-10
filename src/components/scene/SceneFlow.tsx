import { Accessor, Component, createEffect, For, Match, ParentProps, Show, Switch } from 'solid-js';
import { createStore, Store } from "solid-js/store"; 
import styles from '../../assets/css/scene/scene.module.css';
import type { SceneChild } from 'models/scene/SceneChild';
import type { SceneEvent } from 'models/scene/SceneEvent';
import { SceneList } from 'models/scene/SceneList';
import SceneUtil from '../../utils/scene/sceneUtil';
import { ChoicesModel } from 'models/scene/ChoicesModel';

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

const handleSceneIndexChange = (index: number) => {
  // 選択した要素を中央にスクロール
  const container = document.getElementById("js-flow_container");
  const target = container?.querySelectorAll("[data-stage-active]")[index];
  target?.scrollIntoView({behavior: 'smooth', block: 'center'});
}

const SceneFlow: Component<SceneFlowPropType> = (props: SceneFlowPropType) => {
  createEffect(() => handleChageScene(props.flowItems));
  createEffect(() => handleSceneIndexChange(props.selectedSceneIndex));

  const handleClickStage = (e: MouseEvent, arg: SceneChild) => {
    const selectedIndex = sceneChilds.findIndex((x: SceneChild) => x.childIndex === arg.childIndex)
    props.onSceneIndexChange(selectedIndex);
    handleSceneIndexChange(selectedIndex);
  }

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div class={styles.flow_container} id="js-flow_container">
        <div class={styles.flow_line}></div>
        {[...Array(1)].map(() => (<div class={styles.flow_item_stage_dummy}></div>))}

        <For each={sceneChilds} fallback={<div>Loading...</div>}>
        {(child: SceneChild) => (
          <div class={styles.flow_item_stage}
                data-stage-type={child.childType}
                data-stage-active={child.childIndex === props.selectedSceneIndex}
                onClick={(e) => handleClickStage(e, child)}>
            <Switch>
              <Match when={child.childType === 'Scene'}>
                <For each={child.childEvent} fallback={<div>Loading...</div>}>
                {(events: SceneEvent) => (
                  <Switch>
                    <Match when={events.sceneType === 'Text'}>
                      <div class={styles.flow_item_text}>
                        <label>{events.sceneObject.speaker}</label>
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
                            <span class="material-symbols-outlined">wallpaper</span>
                          </div>
                          <div class={styles.flow_item_right}>{events.sceneObject.backGroundImage?.split('/').slice(-1)[0]}</div>
                        </div>
                      </div>
                    </Match>
                    <Match when={events.sceneType === 'Music'}>
                      <div class={styles.flow_item_asset}>
                        <div class={styles.flow_item_action_btn}>
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
              </Match>
              <Match when={child.childType === 'Choices' && SceneUtil.isChoicesEvent(child.childEvent)}>
                <For each={child.childEvent.choicesList} fallback={<div>Loading...</div>}>
                {(choice: ChoicesModel, index: Accessor<number>) => (
                  <>
                    <div class={styles.flow_item_text}>
                      <label>{`選択肢${index() + 1}`}</label>
                      <span>
                        {choice.choicesLabal}
                      </span>
                    </div>
                    <div class={styles.flow_item_asset}>
                      <div class={styles.flow_item_action_btn}>
                        <div class={styles.flow_item_choice_border}></div>
                      </div>
                      <div class={styles.flow_item}>
                        <div class={styles.flow_item_left}>
                          <span class="material-symbols-outlined">import_contacts</span>
                        </div>
                        <div class={styles.flow_item_right}>
                          {`ルート： ${choice.choiceSceneName}`}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                </For>
              </Match>
              <Match when={child.childType === 'End' && SceneUtil.isEndEvent(child.childEvent)}>
                <div class={styles.flow_item_asset}>
                  <div class={styles.flow_item_action_btn}>
                    <span class="material-symbols-outlined" data-action-type={'forward'}>arrow_forward</span>
                  </div>
                  <div class={styles.flow_item}>
                    <div class={styles.flow_item_left}>
                      <span class="material-symbols-outlined">import_contacts</span>
                    </div>
                    <div class={styles.flow_item_right}>
                      {`シナリオ： ${child.childEvent.nextScenarioName} / ${child.childEvent.nextSceneName}`}
                    </div>
                  </div>
                </div>
              </Match>
            </Switch>
          </div>
        )}
        </For>
        {[...Array(2)].map(() => (<div class={styles.flow_item_stage_dummy}></div>))}
      </div>
    </>
  );
};

export default SceneFlow;
