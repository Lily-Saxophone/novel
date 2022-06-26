import { Component, For, JSX, ParentProps, Show } from 'solid-js';
import { css } from "solid-styled-components";

const SceneChoicesClass = css`
  width: 100%;
  height: 100%;
  z-index: 60;
  position: absolute;
  `;

const ChoicesContainerClass = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 62;
  `;

const ChoicesItemClass = css`
  box-sizing: border-box;
  background-color: #e5dfdc;
  border: solid 2px #514d48;
  color: #514d48;
  border-radius: 8px;
  width: 100%;
  height: fit-content;
  font-size: 1.4rem;
  margin: 0.5rem;
  padding: 0 1rem;
  `;

const backGroundClass = css`
  position: absolute;
  background-color: rgba(0,0,0,0.4);
  width: 100%;
  height: 100%;
  z-index: 61;
`;

export type SceneChoicesType = ParentProps & {
  choicesList: Map<string, string>
  onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
}

const SceneChoices: Component<SceneChoicesType> = (props: SceneChoicesType) => {
  return (
    <Show
      when={props.choicesList.size !== 0}
      fallback={() => <></>}>

      <div class={SceneChoicesClass}>
        <div class={ChoicesContainerClass}>
          <For each={Array.from(props.choicesList)} fallback={<div>Loading Failed.</div>}>
            {(item) => (
              <div class={ChoicesItemClass} data-key={item[0]} onClick={props.onClick}>
                {item[1]}
              </div>
            )}
          </For>
        </div>
        <div class={backGroundClass} onClick={() => { return false }}></div>
      </div>
    </Show>
  );
};

export default SceneChoices;
