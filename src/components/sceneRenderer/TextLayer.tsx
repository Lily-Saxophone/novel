import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import SceneTextBody from './SceneTextBody';
import SceneTextHeader from './SceneTextHeader';

const TextLayerClass = css`
  position: absolute;
  z-index: 20;
  background-color: #e5dfdc;
  border: solid 2px #514d48;
  border-radius: 8px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  width: 90%;
  height: 25%;
  margin: auto;
  margin-bottom: 6px;
`;

export type TextLayerType = ParentProps & {
  // some props
}

const TextLayer: Component<TextLayerType> = (props: TextLayerType) => {
  return (
    <div
      class={TextLayerClass}>
      {props.children}
    </div>
  );
};

export default TextLayer;
