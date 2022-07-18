import { Component, JSX, ParentProps, Show } from 'solid-js';
import { css } from "solid-styled-components";

export type PalletType = ParentProps & {
  headerContent?: { left?: JSX.Element, title?: string, right?: JSX.Element }
  content?: JSX.Element,
  width: number | string,
  height: number | string
}

const PaletteClass = css`
  top: 0;
  border-radius: 6px;
  background-color: #404040;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow:
    0 0 2px 2px rgba(0, 0, 0, .2),
    0 0 3px 3px rgba(0, 0, 0, .1),
    0 0 4px 4px rgba(0, 0, 0, .1);

  .palette_header {
    width: 100%;
    height: 20px;
    background-color: #333333;
    box-shadow: 3px 0 4px 2px rgb(0 0 0 / 50%);
    display: flex;
    font-size: 1rem;

    .left_content {
      width: 25%;
    }

    .palette_title {
      width: 50%;
      text-align: center;
      line-height: 20px;
    }

    .right_content {
      width: 25%;
    }
  }
`;

const Palette: Component<PalletType> = (props: PalletType) => {

  return (
    <div class={PaletteClass} style={`width: ${props.width}; height: ${props.height}; min-height: ${props.height}; max-height: ${props.height};`}>
      <Show when={props.headerContent !== undefined}>
        <div class='palette_header'>
          <div class='left_content'>{props.headerContent?.left}</div>
          <div class='palette_title'>{props.headerContent?.title}</div>
          <div class='right_content'>{props.headerContent?.right}</div>
        </div>
      </Show>
      {props.children}
    </div>
  );
};

export default Palette;
