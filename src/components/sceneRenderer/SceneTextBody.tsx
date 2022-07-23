import { Component, ParentProps } from 'solid-js';
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

export type SceneTextBodyType = ParentProps & {
  text: string
}

const SceneTextBody: Component<SceneTextBodyType> = (props: SceneTextBodyType) => {
  return (
    <div class={SceneTextBodyClass}>
      {props.text}
    </div>
  );
};

export default SceneTextBody;
