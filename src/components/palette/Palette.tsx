import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

export type PalletType = ParentProps & {
  title?: string,
  content?: JSX.Element,
  width: number | string,
  height: number | string
}

const PaletteClass = css`
  top: 0;
  border-radius: 6px;
  background-color: #404040;
  overflow-y: auto;
  box-shadow:
    0 0 2px 2px rgba(0, 0, 0, .2),
    0 0 3px 3px rgba(0, 0, 0, .1),
    0 0 4px 4px rgba(0, 0, 0, .1);
`;

const Palette: Component<PalletType> = (props: PalletType) => {

  return (
    <div class={PaletteClass} style={`width: ${props.width}; height: ${props.height}; min-height: ${props.height}; max-height: ${props.height};`}>
      {props.children}
    </div>
  );
};

export default Palette;
