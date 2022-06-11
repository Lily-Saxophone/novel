import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const CharacterLayerClass = css`

`;

export type CharacterLayerType = ParentProps & {
    foo?: string,
    content?: JSX.Element
}

const CharacterLayer: Component<CharacterLayerType> = (props: CharacterLayerType) => {
    return (
        <div class={CharacterLayerClass}>
            {props.children}
        </div>
    );
};

export default CharacterLayer;
