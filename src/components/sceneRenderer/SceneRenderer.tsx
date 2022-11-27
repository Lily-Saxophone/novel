import { Component, createEffect, createSignal, JSX, ParentProps, Signal } from 'solid-js';
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
import { ChoicesModel } from '../../models/scene/ChoicesModel';
import SceneUtil from '../../utils/scene/sceneUtil';
import { SceneCharacter } from '../../models/scene/SceneCharacter';

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

const [sceneText, setSceneText]: Signal<SceneText> = createSignal({ speaker: "", text: "" });
const [characterList, setCharacterList]: Signal<Array<SceneCharacter>> = createSignal([
  {
    characterName: '',
    characterSrc: '',
    characterEffect: '',
  },
  {
    characterName: '',
    characterSrc: '',
    characterEffect: '',
  },
  {
    characterName: '',
    characterSrc: '',
    characterEffect: '',
  },
]);
const [backGroundImage, setBackGroundImage]: Signal<string> = createSignal("");
const [backGroundMusic, setBackGroundMusic]: Signal<string> = createSignal("");
const [choicesList, setChoicesList]: Signal<Array<ChoicesModel>> = createSignal([]);

const handleSetScene = (scene: SceneModel | ChoicesEvent | EndEvent) => {
  if (SceneUtil.isSceneModel(scene)) {
    setSceneText({ ...scene.sceneText });
    setCharacterList({ ...scene.characterList });
    setBackGroundImage(scene.backGroundImage);
    setBackGroundMusic(scene.backGroundMusic);

  } else if (SceneUtil.isEndEvent(scene)) {
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
          <SceneTextBody text={sceneText().text} />
        </TextLayer>

        <CharacterLayer>
          <Character characterImage={characterList()[0].characterSrc} />
          <Character characterImage={characterList()[1].characterSrc} />
          <Character characterImage={characterList()[2].characterSrc} />
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
