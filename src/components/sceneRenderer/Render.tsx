import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import BackGroundLayer from './BackGroundLayer';
import TextLayer from './TextLayer';
import type { SceneText } from '../../models/scene/SceneText';
import CharacterLayer from './CharacterLayer';

const RenderClass = css`
position: relative;
  background-color: white;
  width: 100%;
  max-height: 92%;
  aspect-ratio: 16/9;
  margin:auto;
`;

export type RenderType = ParentProps & {
  backGroundImage: string,
  backGroundMusic: string,
  characterList: Array<string>,
  sceneText: SceneText
}

const Render: Component<RenderType> = (props: RenderType) => {
  return (
    <div class={RenderClass}>
      <TextLayer
        characterName={props.sceneText?.speaker}
        textList={props.sceneText?.textList}
      />
      <CharacterLayer characterList={props.characterList} />
      <BackGroundLayer backGroundImage={props.backGroundImage} />
      <audio
        autoplay
        loop
        src={props.backGroundMusic}
        style="display: hidden;">
      </audio>
    </div>
  );
};

export default Render;
