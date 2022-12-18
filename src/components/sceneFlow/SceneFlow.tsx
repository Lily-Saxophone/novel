import { Accessor, Component, createEffect, For, Match, ParentProps, Switch } from 'solid-js';
import { createStore, Store } from "solid-js/store";
import styles from '../../assets/css/scene/scene.module.css';
import { Scene } from '../../models/slide/Scene';
import SlideUtil from '../../utils/slide/slideUtil';
import { ChoicesModel } from '../../models/slide/ChoicesModel';
import ImageBox from '../../components/sceneSlide/ImageBox';
import { EndEvent } from '../../models/slide/EndEvent';
import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { SlideModel } from '../../models/slide/SlideModel';

export type SceneFlowPropType = ParentProps & {
  onSlideIndexChange: (idx: number) => void,
  selectedSlideIndex: number,
  flowItems: Scene
}

const [ slideChilds, setSlideChilds ]: Store<Scene> = createStore([]);

const handleChageSlide = (items: Scene) => {
  // シーンからFlow描写用の差分を生成
  setSlideChilds(items.slide)
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

  const handleClickStage = (e: MouseEvent) => {
    console.log("aaa", props.flowItems)
    // const selectedIndex = slideChilds.slide.findIndex((x: SlideChild) => x.childIndex === arg.childIndex)
    const selectedIndex: number = Number((e.target as HTMLElement)?.getAttribute("data-stage-index")) ?? 0;
    props.onSlideIndexChange(selectedIndex);
    handleSlideIndexChange(selectedIndex);
  }

  return (
    <>
      <div class={styles.flow_container} id="js-flow_container">
        <div class={styles.flow_line}></div>
        {[...Array(1)].map(() => (<div class={styles.flow_item_stage_dummy}></div>))}

        <For each={slideChilds} fallback={<div>Loading...</div>}>
          {(child: SlideModel | ChoicesEvent | EndEvent, index: Accessor<number>) => (
              <Switch>
                <Match when={SlideUtil.isSlideModel(child)}>
                  <div class={styles.flow_item_stage}
                    style={`background-image: url("${child.backGroundImage}")`}
                    data-stage-type={"Slide"}
                    data-stage-active={index() === props.selectedSlideIndex}
                    data-stage-index={index()}
                    onClick={(e) => handleClickStage(e)}>
                      <div class={styles.flow_item_chara_image}>
                        <ImageBox
                          imageName={child.characterList[1].characterName}
                          src={child.characterList[1].characterSrc}
                          width={12}
                          height={12}
                          defaultView={<></>}
                        />
                      </div>
                      <div class={styles.flow_item_text} onClick={() => { }}>
                        {/* <label>{child.slideText.speaker}</label> */}
                        <span>{child.slideText.text}</span>
                      </div>
                  </div>
                </Match>
                <Match when={SlideUtil.isChoicesEvent(child)}>
                <div class={styles.flow_item_stage}
                    style={`background-image: url("${child.backGroundImage}")`}
                    data-stage-type={"Choices"}
                    data-stage-active={index() === props.selectedSlideIndex}
                    data-stage-index={index()}
                    onClick={(e) => handleClickStage(e)}>
                  <For each={child.choicesList} fallback={<div>Loading...</div>}>
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
                              <span class="material-symbols-outlined" data-slide-type={"Choices"}>
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
                  </div>
                </Match>
                <Match when={SlideUtil.isEndEvent(child)}>
                <div class={styles.flow_item_stage}
                    style={`background-image: url("${child.backGroundImage}")`}
                    data-stage-type={"End"}
                    data-stage-active={index() === props.selectedSlideIndex}
                    data-stage-index={index()}
                    onClick={(e) => handleClickStage(e)}>
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
                </div>
                </Match>
              </Switch>
          )}
        </For>
        {[...Array(2)].map(() => (<div class={styles.flow_item_stage_dummy}></div>))}
      </div>
    </>
  );
};

export default SceneFlow;
