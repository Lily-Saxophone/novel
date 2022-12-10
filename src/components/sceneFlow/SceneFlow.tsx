import { Accessor, Component, createEffect, For, Match, ParentProps, Show, Switch } from 'solid-js';
import { createStore, Store } from "solid-js/store";
import styles from '../../assets/css/scene/scene.module.css';
import type { SlideChild } from '../../models/slide/SlideChild';
import type { SlideEvent } from '../../models/slide/SlideEvent';
import { Scene } from '../../models/slide/Scene';
import SlideUtil from '../../utils/slide/slideUtil';
import { ChoicesModel } from '../../models/slide/ChoicesModel';
import { SlideCharacter } from '../../models/slide/SlideCharacter';
import { useStory } from '../../providers/storyProvider';

export type SceneFlowPropType = ParentProps & {
  onSlideIndexChange: (idx: number) => void,
  selectedSlideIndex: number,
  flowItems: Scene
}

const [slideChilds, setSlideChilds]: Store<Scene> = createStore([]);

const handleChageSlide = (items: Scene) => {
  // シーンからFlow描写用の差分を生成
  setSlideChilds(SlideUtil.generateFlowDiff(items))
}

const handleSlideIndexChange = (index: number) => {
  // 選択した要素を中央にスクロール
  const container = document.getElementById("js-flow_container");
  const target = container?.querySelectorAll("[data-stage-active]")[index];
  target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


const SceneFlow: Component<SceneFlowPropType> = (props: SceneFlowPropType) => {
  createEffect(() => handleChageSlide(props.flowItems));
  createEffect(() => handleSlideIndexChange(props.selectedSlideIndex));

  const handleClickStage = (e: MouseEvent, arg: SlideChild) => {
    console.log("aaa", slideChilds)
    const selectedIndex = slideChilds.findIndex((x: SlideChild) => x.childIndex === arg.childIndex)
    props.onSlideIndexChange(selectedIndex);
    handleSlideIndexChange(selectedIndex);
  }

  // const [ stroy, { increment, decrement } ] = useStory()
  // const aaa = useStory()
  // console.log(aaa)
  return (
    <>
      <div class={styles.flow_container} id="js-flow_container">
        <div class={styles.flow_line}></div>
        {[...Array(1)].map(() => (<div class={styles.flow_item_stage_dummy}></div>))}

        <For each={slideChilds} fallback={<div>Loading...</div>}>
          {(child: SlideChild) => (
            <div class={styles.flow_item_stage}
              data-stage-type={child.childType}
              data-stage-active={child.childIndex === props.selectedSlideIndex}
              onClick={(e) => handleClickStage(e, child)}>
              <Switch>
                <Match when={child.childType === 'Slide'}>
                  <For each={child.childEvent} fallback={<div>Loading...</div>}>
                    {(events: SlideEvent) => (
                      <Switch>
                        <Match when={events.slideType === 'Text'}>
                          <div class={styles.flow_item_text} onClick={() => { }}>
                            <label>{events.slideObject.speaker}</label>
                            <span>{events.slideObject.text}</span>
                          </div>
                        </Match>
                        <Match when={events.slideType === 'Image'}>
                          <div class={styles.flow_item_asset}>
                            <div class={styles.flow_item_action_btn}>
                              <Switch>
                                <Match when={events.slideAction === 'add'}>
                                  <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                                </Match>
                                <Match when={events.slideAction === 'change'}>
                                  <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                                </Match>
                                <Match when={events.slideAction === 'remove'}>
                                  <span class="material-symbols-outlined" data-action-type={'remove'}>remove</span>
                                </Match>
                              </Switch>
                            </div>
                            <div class={styles.flow_item}>
                              <div class={styles.flow_item_left}>
                                <span class="material-symbols-outlined" data-slide-type={events.slideType}>wallpaper</span>
                              </div>
                              <div class={styles.flow_item_right}>{events.slideObject.backGroundImage?.split('/').slice(-1)[0]}</div>
                            </div>
                          </div>
                        </Match>
                        <Match when={events.slideType === 'Music'}>
                          <div class={styles.flow_item_asset}>
                            <div class={styles.flow_item_action_btn}>
                              <Switch>
                                <Match when={events.slideAction === 'add'}>
                                  <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                                </Match>
                                <Match when={events.slideAction === 'change'}>
                                  <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                                </Match>
                                <Match when={events.slideAction === 'remove'}>
                                  <span class="material-symbols-outlined" data-action-type={'remove'}>remove</span>
                                </Match>
                              </Switch>
                            </div>
                            <div class={styles.flow_item}>
                              <div class={styles.flow_item_left}>
                                <span class="material-symbols-outlined" data-slide-type={events.slideType}>music_note</span>
                              </div>
                              <div class={styles.flow_item_right}>{events.slideObject.backGroundMusic?.split('/').slice(-1)[0]}</div>
                            </div>
                          </div>
                        </Match>
                        <Match when={events.slideType === 'Character'}>
                          <For each={events.slideObject.characterList} fallback={<div>Loading...</div>}>
                            {(character: SlideCharacter) => (
                              <Show when={character.characterName !== ""}>
                                <div class={styles.flow_item_asset}>
                                  <div class={styles.flow_item_action_btn}>
                                    <Switch>
                                      <Match when={events.slideAction === 'add'}>
                                        <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                                      </Match>
                                      <Match when={events.slideAction === 'change'}>
                                        <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                                      </Match>
                                      <Match when={events.slideAction === 'remove'}>
                                        <span class="material-symbols-outlined" data-action-type={'remove'}>remove</span>
                                      </Match>
                                    </Switch>
                                  </div>
                                  <div class={styles.flow_item}>
                                    <div class={styles.flow_item_left}>
                                      <span class="material-symbols-outlined" data-slide-type={events.slideType}>person</span>
                                    </div>
                                    <div class={styles.flow_item_right}>{character.characterSrc.split('/').slice(-1)[0]}</div>
                                  </div>
                                </div>
                              </Show>
                            )}
                          </For>
                        </Match>
                      </Switch>
                    )}
                  </For>
                </Match>
                <Match when={child.childType === 'Choices' && SlideUtil.isChoicesEvent(child.childEvent)}>
                  <For each={child.childEvent.choicesList} fallback={<div>Loading...</div>}>
                    {(choice: ChoicesModel, index: Accessor<number>) => (
                      <>
                        <div class={styles.flow_item_text}>
                          <label>{`選択肢${index() + 1}`}</label>
                          <span>
                            {choice.choicesLabel}
                          </span>
                        </div>
                        <div class={styles.flow_item_asset}>
                          <div class={styles.flow_item_action_btn}>
                            <div class={styles.flow_item_choice_border}></div>
                          </div>
                          <div class={styles.flow_item}>
                            <div class={styles.flow_item_left}>
                              <span class="material-symbols-outlined" data-slide-type={child.childType}>
                                import_contacts
                              </span>
                            </div>
                            <div class={styles.flow_item_right}>
                              {`ルート： ${choice.nextSceneTitle}`}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </For>
                </Match>
                <Match when={child.childType === 'End' && SlideUtil.isEndEvent(child.childEvent)}>
                  <div class={styles.flow_item_asset}>
                    <div class={styles.flow_item_action_btn}>
                      <span class="material-symbols-outlined" data-action-type={'forward'}>arrow_forward</span>
                    </div>
                    <div class={styles.flow_item}>
                      <div class={styles.flow_item_left}>
                        <span class="material-symbols-outlined" data-slide-type={child.childType}>
                          import_contacts
                        </span>
                      </div>
                      <div class={styles.flow_item_right}>
                        {`シナリオ： ${child.childEvent.nextScenarioTitle} / ${child.childEvent.nextSceneTitle}`}
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
