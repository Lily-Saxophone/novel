import { children, Component, ComponentProps, JSX } from 'solid-js';
import { css } from "solid-styled-components";


type Palette = ComponentProps<Component>;

const PaletteClass = css`
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background-color: #404040;

  box-shadow:
    0 0 2px 2px rgba(0, 0, 0, .2),
    0 0 3px 3px rgba(0, 0, 0, .1),
    0 0 4px 4px rgba(0, 0, 0, .1);
`;

const Palette: ComponentProps<any> = (props: ComponentProps<any>) => {
  return (
    <div class={PaletteClass}>
      {props.children}
    </div>
  );
};

export default Palette;
