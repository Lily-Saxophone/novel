import { Component, For, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import FileSelector from './FileSelector';
import ImageBox from './ImageBox';

const ImageBoxContainerClass = css`
  display:flex;
  justify-content: space-around;
`;

type characterType = {
  characterName: string,
  characterSrc: string,
  characterEffect: string,
}

export type DetailCharacterType = ParentProps & {
  characterList: characterType[]
}

const DetailCharacter: Component<DetailCharacterType> = (props: DetailCharacterType) => {
  return (
    <div class={ImageBoxContainerClass}>
      <For each={props.characterList} fallback={<>error</>}>
        {(item: characterType) => (
          <div>
            <ImageBox
              imageName={item.characterName}
              src={item.characterSrc}
            />
            <div style='margin: 5px 5px 0 5px;'>
              <FileSelector default='エフェクトなし' fileName={item.characterEffect} />
            </div>
          </div>
        )}
      </For>
    </div>
  );
};

export default DetailCharacter;
