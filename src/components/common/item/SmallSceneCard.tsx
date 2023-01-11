import { Component, createEffect, createRenderEffect, createSignal, For, JSX, JSXElement, onMount, ParentProps, Setter, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const SmallSceneCardClass = (props: { backGroundColor: string, width: string, height: string }) => css`
  background-color: ${props.backGroundColor};
  min-width: ${props.width};
  max-width: ${props.width};
  min-height: ${props.height};
  max-height: ${props.height};
  display: flex;
  justify-content: space-around;
  padding: 7px;
  border-radius: 5px;

  .scene_thumbnail {
    width: 35%;
    min-width: 35%;
    height: 100%;

    img {
      width: 100%;
      border-radius: 6px;
      border: solid 1.3px #555555;
      box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
    }
  }

  .scene_description {
    width: 65%;
    height: calc(100% - 7px);
    padding: 7px;
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
      <div class='scene_thumbnail'>
        <img src={props.sceneImage} alt="" />
      </div>
      <div class='scene_description'>
        <div class='scene_title'>{props.sceneTitle}</div>
        <div class='scene_detail'>{props.sceneDetail}</div>
      </div>
    </div>
  );
};

export default SmallSceneCard;
