import { Component, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const TextAreaClass = css`
  object-fit: contain;
  height: calc(7.5vh - 10px);
  padding: 5px;
  background-color: #737373;
  border-radius: 5px;
  border: none;
  font-size: 0.8rem;

  &:hover {
    transition: 0.3s;
    box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
  }

  &:focus {
    outline: none;
    box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
  }
`;

export type CustomTextAreaType = ParentProps & {
  // some props
}

const CustomTextArea: Component<CustomTextAreaType> = (props: CustomTextAreaType) => {
  return (
    <div class={TextAreaClass} contenteditable={true}>
      {props.children}
    </div>
  );
};

export default CustomTextArea;
