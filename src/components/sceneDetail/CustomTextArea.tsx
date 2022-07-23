import { Component, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const TextAreaClass = css`
  object-fit: contain;
	width: calc(100% - 10px);
  height: calc(7.5vh - 10px);
  padding: 5px;
  background-color: #737373;
  border-radius: 5px;
  border: none;
  font-size: 0.8rem;
  white-space: pre-wrap;

  // TextAreaのCSSリセット
  -moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-image: none;
	color: inherit;
	font-family: inherit;
  resize: none;

  &:hover {
    transition: 0.3s;
    box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
  }

  &:focus {
    outline: none;
    border: none;
    box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
  }
`;

export type CustomTextAreaType = ParentProps & {
  // some props
}

const CustomTextArea: Component<CustomTextAreaType> = (props: CustomTextAreaType) => {
  return (
    <textarea class={TextAreaClass}>
      {props.children}
    </textarea>
  );
};

export default CustomTextArea;
