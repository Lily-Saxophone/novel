import { Component, createEffect, createSignal, JSX, JSXElement, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import Render from './Render';
import RenderNavigationBar from './RenderNavigationBar';
import TextLayer from './TextLayer';
import CharacterLayer from './CharacterLayer';
import BackGroundLayer from './BackGroundLayer';
import SceneTextHeader from './SceneTextHeader';
import SceneTextBody from './SceneTextBody';
import Character from './Character';
import { SceneText } from '../../models/scene/SceneText';
import SceneChoices from './sceneChoices';
import type { SceneModel } from '../../models/scene/SceneModel';
import type { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import type { EndEvent } from '../../models/scene/EndEvent';
import { Portal } from 'solid-js/web';

const SceneRendererClass = css`
  width: inherit;
  height: inherit;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  flex-direction: column;
`;

export type SceneRendererType = ParentProps & {
  scene: SceneModel | ChoicesEvent | EndEvent,
  onSceneClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
  onChoicesClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
  content?: JSX.Element
}

const [sceneText, setSceneText]: Signal<SceneText> = createSignal({ speaker: "", textList: [] });
const [characterList, setCharacterList]: Signal<Array<string>> = createSignal([]);
const [backGroundImage, setBackGroundImage]: Signal<string> = createSignal("");
const [backGroundMusic, setBackGroundMusic]: Signal<string> = createSignal("");
const [choicesList, setChoicesList]: Signal<Map<string, string>> = createSignal(new Map([]));

const isSceneModel = (obj: any): obj is SceneModel =>
  typeof obj === "object"
  && obj !== null
  && typeof (obj as SceneModel).backGroundImage === "string"
  && typeof (obj as SceneModel).backGroundMusic === "string";

const isEndEvent = (obj: any): obj is EndEvent =>
  typeof obj === "object"
  && obj !== null
  && typeof (obj as EndEvent).nextScenario === "string";

const handleSetScene = (scene: SceneModel | ChoicesEvent | EndEvent) => {
  if (isSceneModel(scene)) {
    setSceneText(scene.sceneText);
    setCharacterList(scene.characterList);
    setBackGroundImage(scene.backGroundImage);
    setBackGroundMusic(scene.backGroundMusic);

  } else if (isEndEvent(scene)) {
    // none

  } else {
    setChoicesList(scene.choicesList);
  }
}

const SceneRenderer: Component<SceneRendererType> = (props: SceneRendererType) => {
  createEffect(() => handleSetScene(props.scene));

  return (
    <div
      class={SceneRendererClass}>
      <Render
        onSceneClick={props.onSceneClick}>
        <TextLayer>
          <SceneTextHeader speaker={sceneText().speaker} />
          <SceneTextBody textList={sceneText().textList} />
        </TextLayer>

        <CharacterLayer>
          <Character characterImage={characterList()[0]} />
          <Character characterImage={characterList()[1]} />
          <Character characterImage={characterList()[2]} />
        </CharacterLayer>

        <BackGroundLayer
          backGroundImage={backGroundImage()}
          onSceneClick={props.onSceneClick} />
        <audio
          autoplay
          loop
          src={backGroundMusic()}
          style="display: hidden;">
        </audio>

        <SceneChoices
          choicesList={choicesList()}
          onClick={props.onChoicesClick} />

      </Render>

      <RenderNavigationBar />
    </div>
  );
};

export default SceneRenderer;
