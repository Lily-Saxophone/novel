import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const RenderNavigationBarClass = css`
  position: relative;
  width: 100%;
  height:8%;
  margin:auto 0 0 0;
`;

const VolumeNavClass = css`
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 3rem;
`;

const PlayNavClass = css`
  position: absolute;
  width: fit-content;
  height: fit-content;
  left: 50%;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
`;

export type RenderNavigationBarType = ParentProps & {
  foo?: string,
  content?: JSX.Element
}

const RenderNavigationBar: Component<RenderNavigationBarType> = (props: RenderNavigationBarType) => {
  return (
    <div class={RenderNavigationBarClass}>
      <div class={VolumeNavClass}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <span class="material-symbols-outlined">
          volume_up
        </span>
      </div>
      <div class={PlayNavClass}>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <span class="material-symbols-outlined" style='margin: 0 5px;'>
          fast_rewind
        </span>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <span class="material-symbols-outlined" style='margin: 0 5px;'>
          replay
        </span>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <span class="material-symbols-outlined" style='margin: 0 5px;'>
          stop
        </span >
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <span class="material-symbols-outlined" style='color: green; margin: 0 5px;'>
          play_arrow
        </span>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <span class="material-symbols-outlined" style='margin: 0 5px;'>
          fast_forward
        </span>
      </div>

    </div>
  );
};

export default RenderNavigationBar;
