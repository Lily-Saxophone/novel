import { Component, createEffect, createSignal, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const SlideTextBodyClass = css`
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

export type SlideTextBodyType = ParentProps & {
  text: string
}

const SlideTextBody: Component<SlideTextBodyType> = (props: SlideTextBodyType) => {
  // テキストレンダリングアニメーション30msごとに1文字ずつ表示）
  const [slideText, setSlideText]: Signal<string> = createSignal(props.text);
  createEffect(() => {
    setSlideText("");
    const textList: string[] = props.text.replace(/\n$/, '').split(/(?!\n.)/);

    textList.forEach((letter: string, idx: number) => {
      setTimeout(() => {
        setSlideText(slideText() + letter);
      }, 30 * idx)
    })
  })

  return (
    <div class={SlideTextBodyClass}>
      {slideText()} <span></span>
    </div>
  );
};

export default SlideTextBody;
