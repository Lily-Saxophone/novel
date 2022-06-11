import { Accessor, children, Component, createEffect, JSX, ParentProps } from 'solid-js';
import { ResolvedChildren } from 'solid-js/types/reactive/signal';
import { css } from "solid-styled-components";

export type PalletType = ParentProps & {
  title?: string,
  content: JSX.Element,
  width: number | string,
  height: number | string
}

const PaletteClass = css`
  top: 0;
  border-radius: 6px;
  background-color: #404040;

  box-shadow:
    0 0 2px 2px rgba(0, 0, 0, .2),
    0 0 3px 3px rgba(0, 0, 0, .1),
    0 0 4px 4px rgba(0, 0, 0, .1);
`;

const Palette: Component<PalletType> = (props: PalletType) => {
  const child: Accessor<any> = children(() => props.children);
  createEffect(() => child()?.forEach(element => {
    element.style.width = props.width;
    element.style.height = props.height;
    element.style.minWidth = props.width;
    element.style.minHeight = props.height;
  }));
  return (
    <div class={PaletteClass} style={`width: ${props.width}; height: ${props.height}; min-height: ${props.height}; max-height: ${props.height};`}>
      {child()}
    </div>
  );
};

export default Palette;
