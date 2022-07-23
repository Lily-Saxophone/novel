import { Component, createEffect, createSignal, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const FileSelectorClass = css`
  display: flex;
  justify-content: space-between;
  max-width: calc(100% - 10px);
  max-height: calc(1rem + 5px);
  margin: 0 5px 5px 5px;
  overflow: hidden;
  border-bottom: solid 1px #cccccc;
  cursor: default;
  transition-duration: 0.3s;

  &:hover {
    background-color: #4d4d4d;
  }
  span {
    width: 90%;
    line-height: 180%;
    font-size: 0.7rem;
    text-overflow: ellipsis;
    padding-inline-start: 5px;
  }
`;

const FileIconClass = css`
  right: 0;
  width: 0.9rem;
`;

export type FileSelectorType = ParentProps & {
  default: string,
  fileName: string
}

const FileSelector: Component<FileSelectorType> = (props: FileSelectorType) => {
  return (
    <div class={FileSelectorClass}>
      <span>
        {props.fileName === '' || props.fileName === undefined ? props.default : props.fileName}
      </span>
      <img class={FileIconClass} src={'/src/assets/image/FileIcon.svg'} />
    </div>
  );
};

export default FileSelector;
