import { Component, For, JSX, ParentProps } from 'solid-js';
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
`;

export type SceneTextBodyType = ParentProps & {
  textList: Array<string>
}

const SceneTextBody: Component<SceneTextBodyType> = (props: SceneTextBodyType) => {
  return (
    <div class={SceneTextBodyClass}>
      <For each={props.textList} fallback={<div>Loading...</div>}>
        {(item, index) => (
          <>
            {item}<br />
          </>
        )}
      </For>
    </div>
  );
};

export default SceneTextBody;
