import { Component, For, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import Character from './Character';

const CharacterLayerClass = css`
  z-index: 10;
  position: absolute;
  max-width: 100%;
  max-height: 100%;
  bottom: 0;
  display: flex;
  justify-content: space-between;
`;

export type CharacterLayerType = ParentProps & {
  characterList: Array<string>,
  content?: JSX.Element
}

const CharacterLayer: Component<CharacterLayerType> = (props: CharacterLayerType) => {
  return (
    <div class={CharacterLayerClass}>
      <Character characterImage={props.characterList[0]} />
      <Character characterImage={props.characterList[1]} />
      <Character characterImage={props.characterList[2]} />
    </div>
  );
};

export default CharacterLayer;
