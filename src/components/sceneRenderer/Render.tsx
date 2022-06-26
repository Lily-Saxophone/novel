import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const RenderClass = css`
  position: relative;
  background-color: white;
  width: 100%;
  max-height: 92%;
  aspect-ratio: 16/9;
  margin:auto;
`;

export type RenderType = ParentProps & {
  onSceneClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
}

const Render: Component<RenderType> = (props: RenderType) => {
  return (
    <div class={RenderClass} onClick={props.onSceneClick}>
      {props.children}
    </div>
  );
};

export default Render;
