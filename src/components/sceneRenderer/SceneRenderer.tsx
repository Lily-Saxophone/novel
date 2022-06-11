import { Component, JSX, JSXElement, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import Render from './Render';
import RenderNavigationBar from './RenderNavigationBar';
import type { SceneModel } from '../../models/SceneModel';

const SceneRendererClass = css`
  width: inherit;
  height: inherit;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  flex-direction: column;
`;

export type SceneRendererType = ParentProps & {
  scene: SceneModel,
  content?: JSX.Element
}

const SceneRenderer: Component<SceneRendererType> = (props: SceneRendererType) => {
  return (
    <div class={SceneRendererClass}>
      <Render
        backGroundImage={props.scene.backGroundImage}
        characterList={props.scene.characterList}
        sceneText={props.scene.sceneText}>

      </Render>
      <RenderNavigationBar />
    </div>
  );
};

export default SceneRenderer;