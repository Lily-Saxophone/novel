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
  // some props
}

const CharacterLayer: Component<CharacterLayerType> = (props: CharacterLayerType) => {
  return (
    <div class={CharacterLayerClass}>
      {props.children}
    </div>
  );
};

export default CharacterLayer;
