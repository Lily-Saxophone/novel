import { Component, createEffect, createRenderEffect, createSignal, For, JSX, JSXElement, onMount, ParentProps, Setter, Show, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const SmallSceneCardClass = (props: { backGroundColor: string, width: string, height: string }) => css`
  background-color: ${props.backGroundColor};
  width: fit-content;
  height: fit-content;
  padding: 7px;
  border-radius: 5px;

  .scenarioTitle {
    border-bottom: solid 1px #cccccc;
    margin-bottom: 5px;
  }

  .flexContainer {
    min-width: calc(${props.width} - 14px);
    max-width: calc(${props.width} - 14px);
    min-height: calc(${props.height} - 14px);
    max-height: calc(${props.height} - 14px);
    display: flex;
    justify-content: space-around;
  }

  .scene_thumbnail {
    width: calc(35% - 14px);
    min-width: calc(35% - 14px);
    height: calc(100% - 14px);

    img {
      width: 100%;
      border-radius: 6px;
      border: solid 1.3px #555555;
      box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
    }
  }

  .scene_description {
    width: 65%;
    height: 100%;
    margin-left: 7px;

    .scene_title {
      width: 100%;
      max-width: 9rem;
      font-size: .75rem;
      font-weight: bold;
      margin-bottom: 3px;
      text-overflow: ellipsis;
      white-space : nowrap;
      overflow: hidden;
    }

    .scene_detail {
      width: 100%;
      max-height: 100%;
      font-size: .6rem;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: normal;
    }
  }
`;

export type SmallSceneCardType = ParentProps & {
  scenarioTitle?: string,
  sceneTitle?: string,
  sceneDetail?: string,
  sceneImage?: string,
  backGroundColor: string,
  onClick?: () => void,
  width: string,
  height: string
}

const SmallSceneCard: Component<SmallSceneCardType> = (props: SmallSceneCardType) => {
  return (
    <div class={SmallSceneCardClass({ ...props })} onClick={props?.onClick}>
      <Show when={props?.scenarioTitle !== undefined && props?.scenarioTitle !== ""} fallback={<></>}>
        <div class='scenarioTitle'>
          {props?.scenarioTitle}
        </div>
      </Show>

      <div class='flexContainer'>
        <div class='scene_thumbnail'>
          <img src={props.sceneImage} alt="" />
        </div>
        <div class='scene_description'>
          <div class='scene_title'>{props.sceneTitle}</div>
          <div class='scene_detail'>{props.sceneDetail}</div>
        </div>
      </div>
    </div>
  );
};

export default SmallSceneCard;
