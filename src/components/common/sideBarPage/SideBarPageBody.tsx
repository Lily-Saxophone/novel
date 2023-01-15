import { Component, For, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const SideBarPageBodyClass = css`
  position: relative;
  z-index: 10;
  height: 100%;
  color: #cccccc;
  background-color: #404040;
  overflow-y: auto;
`;

export type SideBarPageBodyType = ParentProps & {
  width?: number
}

const SideBarPageBody: Component<SideBarPageBodyType> = (props: SideBarPageBodyType) => {
  return (
    <div class={SideBarPageBodyClass} style={`width:${props.width}%;`}>
      {props.children}
    </div>
  );
};

export default SideBarPageBody;
