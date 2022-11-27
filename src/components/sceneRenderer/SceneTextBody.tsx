import { Component, createEffect, createSignal, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const SceneTextBodyClass = css`
position: absolute;
  max-width: 90%;
  max-height: 87.5%;
  font-size: 1rem;
  margin-top: 3%;
  margin-left: 3%;
  color: #514d48;
  word-break: break-all;
  overflow: hidden;
  white-space: pre-wrap;
`;

const TextAnimationClass = css`
  border-right: 1px solid #514d48;
  animation: typing 1.5s steps(10),
    blink .5s steps(1) infinite alternate;

  @keyframes typing{
    0% { width: 0; }
  }

  @keyframes blink{
    50% { border-right-color: transparent; }
  }
`;

export type SceneTextBodyType = ParentProps & {
  text: string
}

const SceneTextBody: Component<SceneTextBodyType> = (props: SceneTextBodyType) => {
  // テキストレンダリングアニメーション30msごとに1文字ずつ表示）
  const [sceneText, setSceneText]: Signal<string> = createSignal(props.text);
  createEffect(() => {
    setSceneText("");
    const textList: string[] = props.text.replace(/\n$/, '').split(/(?!\n.)/);

    textList.forEach((letter: string, idx: number) => {
      setTimeout(() => {
        setSceneText(sceneText() + letter);
      }, 30 * idx)
    })
  })

  return (
    <div class={SceneTextBodyClass}>
      {sceneText()} <span></span>
    </div>
  );
};

export default SceneTextBody;
