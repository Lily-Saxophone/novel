import { Component, createEffect, createSignal, For, JSX, JSXElement, onMount, ParentProps, Setter, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const SideBarClass = css`
  height: 100%;
  background-color: #333333;
  z-index: 11;
  box-shadow:
  2px 0 2px 2px rgba(0, 0, 0, .15),
  3px 0 3px 3px rgba(0, 0, 0, .08),
  4px 0 4px 4px rgba(0, 0, 0, .05);

  ul {
    list-style: none;
    padding-inline-start: 0;
    margin: 0;
    overflow-y: scroll;
    max-height: 100%;
    cursor: default;

    :hover {
      transition: 0.5s;
      background-color: #4d4d4d;
    }

  }

  .isSelected {
    background-color: #4d4d4d;
  }

  li {
    text-align: center;
    color: #cccccc;
    max-width: 100%;
    height: fit-content;

    span {
      display: block;
      max-width: 85%;
      margin: auto;
      height: 100%;
      padding: 0.8rem 0;
      border-bottom: solid 0.5px #cccccc;
    }
  }
`;

export type SideBarType = ParentProps & {
  width?: number
}

const SideBar: Component<SideBarType> = (props: SideBarType) => {
  // メニューバー選択状態の判定
  const changeMenuItem = (event: MouseEvent & { target: Element; }) => {
    const ul = event?.target?.parentElement?.parentNode;
    const li = ul?.querySelectorAll("li");
    console.log(ul)

    li?.forEach((element) => {
      if (element === event.target.parentElement) {
        console.log(element)
        element.classList.toggle('isSelected', true);
      } else {
        element.classList.toggle('isSelected', false);
      }
    })
  }

  const width = props.width === undefined ? 17 : props.width;

  return (
    <div class={SideBarClass} style={'width:' + width + '%'}>
      <ul>
        {props.children}
      </ul>
    </div>
  );
};

export default SideBar;
