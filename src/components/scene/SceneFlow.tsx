import { Component, createSignal, For, Match, Show, Signal, Switch } from 'solid-js';
import { createStore, Store } from "solid-js/store"; 
import styles from '../../assets/css/scene/scene.module.css';
import { SceneChild } from 'models/scene/SceneChild';
import { SceneEvent } from 'models/scene/SceneEvent';

const InitSceneChilds = (): SceneChild[] => ([
  {
    childId: 'SC00001',
    sceneEvent: [
      {
        sceneObject: {
          speaker: '？？？？？',
          textList: ['ちょっと、あんた！', 'せっかく私が声を掛けてあげてるんだからすぐに反応しなさいよ！']
        },
        sceneType: 'Text'
      },
      {
        sceneAction: 'ADD',
        sceneObject: {
          characterList: [
            "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
          ],
        },
        sceneType: 'Character'
      },
      {
        sceneAction: 'ADD',
        sceneObject: {
          backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
        },
        sceneType: 'Image'
      },
      {
        sceneAction: 'ADD',
        sceneObject: {
          backGroundMusic: "/src/assets/project/audio/background/2-0005684112.flac",
        },
        sceneType: 'Music'
      },
    ],
    isActive: false
  },
  {
    childId: 'SC00002',
    sceneEvent: [
      {
        sceneObject: {
          speaker: 'ニャー',
          textList: ['なになに、けいちゃん。', 'もしかして興奮しちゃったのかな？']
        },
        sceneType: 'Text'
      },
      {
        sceneAction: 'REMOVE',
        sceneObject: {
          characterList: [
            "/src/assets/project/image/character/星野・ニャー/シガレット喫煙背景なし.png"
          ],
        },
        sceneType: 'Character'
      },
      {
        sceneAction: 'CHANGE',
        sceneObject: {
          backGroundImage: "/src/assets/project/image/background/背景（和）.jpg",
        },
        sceneType: 'Image'
      },
    ],
    isActive: true
  }
])

const [sceneChilds, setSceneChilds]: Store<SceneChild[]> = createStore(InitSceneChilds());

const handleClickStage = (e: MouseEvent, arg: SceneChild) => {
  setSceneChilds(sceneChilds.map((child: SceneChild) => (
    child.childId !== arg.childId ? { ...child, isActive: false } : { ...arg, isActive: true }
  )))
}

const SceneFlow: Component = () => {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <div class={styles.flow_container}>
        <div class={styles.flow_line}></div>
        <For each={sceneChilds} fallback={<div>Loading...</div>}>
          {(child: SceneChild) => (
            <div class={styles.flow_item_stage}  data-stage-active={child.isActive} onClick={(e) => handleClickStage(e, child)}>
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
                            <Match when={events.sceneAction === 'ADD'}>
                              <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                            </Match>
                            <Match when={events.sceneAction === 'CHANGE'}>
                              <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                            </Match>
                            <Match when={events.sceneAction === 'REMOVE'}>
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
                            <Match when={events.sceneAction === 'ADD'}>
                              <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                            </Match>
                            <Match when={events.sceneAction === 'CHANGE'}>
                              <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                            </Match>
                            <Match when={events.sceneAction === 'REMOVE'}>
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
                                <Match when={events.sceneAction === 'ADD'}>
                                  <span class="material-symbols-outlined" data-action-type={'add'}>add</span>
                                </Match>
                                <Match when={events.sceneAction === 'CHANGE'}>
                                  <span class="material-symbols-outlined" data-action-type={'change'}>cached</span>
                                </Match>
                                <Match when={events.sceneAction === 'REMOVE'}>
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
              <Show when={child.isActive}>
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
