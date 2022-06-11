import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import BackGroundLayer from './BackGroundLayer';
import TextLayer from './TextLayer';
import type { SceneText } from '../../models/SceneText';
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
  backGroundImage?: string,
  characterList: Array<string>,
  sceneText: SceneText
}

const Render: Component<RenderType> = (props: RenderType) => {
  return (
    <div class={RenderClass}>
      <TextLayer
        characterName={props.sceneText.characterName}
        textList={props.sceneText.textList}
      />
      <CharacterLayer characterList={props.characterList} />
      <BackGroundLayer backGroundImage={props.backGroundImage} />
    </div>
  );
};

export default Render;
