import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const BackGroundLayerClass = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 1;
  box-shadow:
    0 0 1px 1px rgba(0, 0, 0, .15),
    0 0 2px 2px rgba(0, 0, 0, .08),
    0 0 3px 3px rgba(0, 0, 0, .08);
`;

export type BackGroundLayerType = ParentProps & {
  backGroundImage?: string,
  content?: JSX.Element
}

const BackGroundLayer: Component<BackGroundLayerType> = (props: BackGroundLayerType) => {
  return (
    <img class={BackGroundLayerClass} src={props.backGroundImage} />
  );
};

export default BackGroundLayer;
