import { Component, createEffect, createSignal, JSX, JSXElement, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import Render from './Render';
import RenderNavigationBar from './RenderNavigationBar';
import type { SceneModel } from '../../models/scene/SceneModel';
import TextLayer from './TextLayer';
import CharacterLayer from './CharacterLayer';
import BackGroundLayer from './BackGroundLayer';
import SceneTextHeader from './SceneTextHeader';
import SceneTextBody from './SceneTextBody';
import Character from './Character';
import { SceneText } from '../../models/scene/SceneText';

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
  onClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
  content?: JSX.Element
}

const [sceneText, setSceneText]: Signal<SceneText> = createSignal({ speaker: "", textList: [] });
const [characterList, setCharacterList]: Signal<Array<string>> = createSignal([]);
const [backGroundImage, setBackGroundImage]: Signal<string> = createSignal("");
const [backGroundMusic, setBackGroundMusic]: Signal<string> = createSignal("");

const handleSetScene = (scene: SceneModel) => {
  setSceneText(scene.sceneText);
  setCharacterList(scene.characterList);
  setBackGroundImage(scene.backGroundImage);
  setBackGroundMusic(scene.backGroundMusic);
}

const SceneRenderer: Component<SceneRendererType> = (props: SceneRendererType) => {
  createEffect(() => handleSetScene(props.scene));

  return (
    <div
      class={SceneRendererClass}
      onClick={props.onClick}>
      <Render>
        <TextLayer>
          <SceneTextHeader speaker={sceneText().speaker} />
          <SceneTextBody textList={sceneText().textList} />
        </TextLayer>

        <CharacterLayer>
          <Character characterImage={characterList()[0]} />
          <Character characterImage={characterList()[1]} />
          <Character characterImage={characterList()[2]} />
        </CharacterLayer>

        <BackGroundLayer backGroundImage={backGroundImage()} />
        <audio
          autoplay
          loop
          src={backGroundMusic()}
          style="display: hidden;">
        </audio>

      </Render>
      <RenderNavigationBar />
    </div>
  );
};

export default SceneRenderer;
