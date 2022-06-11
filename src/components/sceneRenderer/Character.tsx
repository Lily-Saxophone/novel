import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const CharacterClass = css`

`;

export type CharacterType = ParentProps & {
    foo?: string,
    content?: JSX.Element
}

const Character: Component<CharacterType> = (props: CharacterType) => {
    return (
        <div class={CharacterClass}>
            {props.children}
        </div>
    );
};

export default Character;
