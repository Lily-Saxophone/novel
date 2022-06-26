import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const CharacterClass = css`
  min-width: 0;
  object-fit: contain;
`;

export type CharacterType = ParentProps & {
  characterImage: string,
  content?: JSX.Element
}

const Character: Component<CharacterType> = (props: CharacterType) => {
  return (
    <img
      class={CharacterClass}
      src={props.characterImage} />
  );
};

export default Character;
