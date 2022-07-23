import { Component, createEffect, createSignal, ParentProps, Show, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';

const ImageBoxClass = css`
  position: relative;
  overflow: hidden;
  min-width: calc(16rem / 2.2);
  min-height: calc(9rem / 2.2);
  max-width: calc(16rem / 2.2);
  max-height: calc(9rem / 2.2);
  border-radius: 5px;
  border: solid 1px #cccccc;
  transition-duration: 0.3s;

  &:hover {
    background-color: #4d4d4d;
  }
  `;

const ImageClass = css`
  max-width: 100%;
  object-fit: cover;
  object-position: 0 50%;
`;

const CharacterNameClass = css`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60%;
  max-height: 0.8rem;
  font-size: 0.5rem;
  border-radius: 3px 0 0 0;
  padding-inline-start: 5px;
  text-overflow: ellipsis;
  object-position: 50%;
  background-color: rgba(115, 115, 115, .7);
`;

const PlusButtonClass = css`
  width:28%;
  display: block;
  margin: auto;
  transform: translateY(calc(9rem / 2.2 / 2 - 50%));
  -webkit-transform: translateY(calc(9rem / 2.2 / 2 - 50%));
  -ms-transform: translateY(calc(9rem / 2.2 / 2 - 50%));
`;

export type ImageBoxType = ParentProps & {
  imageName?: string,
  src: string
}

const ImageBox: Component<ImageBoxType> = (props: ImageBoxType) => {
  return (

    <Show
      when={props.src !== '' && 'a' !== undefined}
      // キャラクターなし
      fallback={
        <div class={ImageBoxClass}>
          <img class={PlusButtonClass} src='/src/assets/image/PlusButton_outline.svg' />
        </div>
      }
    >
      {/* キャラクターあり */}
      <div class={ImageBoxClass}>
        <Show when={props.src !== '' && 'a' !== undefined} fallback={<></>} >
          <div class={CharacterNameClass}>{props.imageName}</div>
        </Show>
        <div class={CharacterNameClass}>{props.imageName}</div>
        <img class={ImageClass} src={props.src} />
      </div>
    </Show>
  );
};

export default ImageBox;
