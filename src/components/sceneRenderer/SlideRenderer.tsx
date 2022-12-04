import { Component, createEffect, createSignal, JSX, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import Render from './Render';
import RenderNavigationBar from './RenderNavigationBar';
import TextLayer from './TextLayer';
import CharacterLayer from './CharacterLayer';
import BackGroundLayer from './BackGroundLayer';
import SlideTextHeader from './SlideTextHeader';
import SlideTextBody from './SlideTextBody';
import Character from './Character';
import { SlideText } from '../../models/slide/SlideText';
import SlideChoices from './slideChoices';
import type { SlideModel } from '../../models/slide/SlideModel';
import type { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import type { EndEvent } from '../../models/slide/EndEvent';
import { ChoicesModel } from '../../models/slide/ChoicesModel';
import SlideUtil from '../../utils/slide/slideUtil';
import { SlideCharacter } from '../../models/slide/SlideCharacter';

const SlideRendererClass = css`
  width: inherit;
  height: inherit;
  box-sizing: border-box;
  padding: 6px;
  display: flex;
  flex-direction: column;
`;

export type SlideRendererType = ParentProps & {
  slide: SlideModel | ChoicesEvent | EndEvent,
  onSlideClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
  onChoicesClick?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
  content?: JSX.Element
}

const [slideText, setSlideText]: Signal<SlideText> = createSignal({ speaker: "", text: "" });
const [characterList, setCharacterList]: Signal<Array<SlideCharacter>> = createSignal([
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

const handleSetSlide = (slide: SlideModel | ChoicesEvent | EndEvent) => {
  if (SlideUtil.isSlideModel(slide)) {
    setSlideText({ ...slide.slideText });
    setCharacterList({ ...slide.characterList });
    setBackGroundImage(slide.backGroundImage);
    setBackGroundMusic(slide.backGroundMusic);

  } else if (SlideUtil.isEndEvent(slide)) {
    // none

  } else {
    setChoicesList(slide.choicesList);
  }
}

const SlideRenderer: Component<SlideRendererType> = (props: SlideRendererType) => {
  createEffect(() => handleSetSlide(props.slide));

  return (
    <div
      class={SlideRendererClass}>
      <Render
        onSlideClick={props.onSlideClick}>
        <TextLayer>
          <SlideTextHeader speaker={slideText().speaker} />
          <SlideTextBody text={slideText().text} />
        </TextLayer>

        <CharacterLayer>
          <Character characterImage={characterList()[0].characterSrc} />
          <Character characterImage={characterList()[1].characterSrc} />
          <Character characterImage={characterList()[2].characterSrc} />
        </CharacterLayer>

        <BackGroundLayer
          backGroundImage={backGroundImage()}
          onSlideClick={props.onSlideClick} />
        <audio
          autoplay
          loop
          src={backGroundMusic()}
          style="display: hidden;">
        </audio>

        <SlideChoices
          choicesList={choicesList()}
          onClick={props.onChoicesClick} />

      </Render>

      <RenderNavigationBar />
    </div>
  );
};

export default SlideRenderer;
