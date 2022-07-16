import { Component, For, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const SceneDetailClass = css`
  width: 100%;
  height: 100%;
`;

const SideBarPageClass = css`
  display: flex;
  justify-content: flex-start;
  background-color: green;
  width: 100%;
  height: 100%;
  font-size: 1rem;
  left: 0;
  color: #514d48;
  word-break: break-all;
  overflow: hidden;
  `;

const SideBarClass = css`
  width: 25%;
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

    :hover {
      transition: 0.5s;
      background-color: #4d4d4d;
    }
  }

  li {
    text-align: center;
    color: #cccccc;
    max-width: 100%;
    padding: 0.8rem 1rem;
    border-bottom: solid 0.5px #cccccc;
  }
  `;

const SideBarPageBoddyClass = css`
  z-index: 10;
  padding: 1vw;
  width: 75%;
  height: 100%;
  color: #cccccc;
  background-color: #404040;

`;

export type SceneDetailType = ParentProps & {

}

const SceneDetail: Component<SceneDetailType> = (props: SceneDetailType) => {
  return (
    <div class={SceneDetailClass}>
      <div class={SideBarPageClass}>
        <div class={SideBarClass}>
          <ul>
            <li>メニュー1</li>
            <li>メニュー2</li>
            <li>メニュー3</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
            <li>メニュー4</li>
          </ul>
        </div>
        <div class={SideBarPageBoddyClass}>
          メインコンテンツ
        </div>

      </div>
      {/* <For each={props.textList} fallback={<div>Loading...</div>}>
        {(item) => (
          <>
            {item}<br />
          </>
        )}
      </For> */}
    </div>
  );
};

export default SceneDetail;
