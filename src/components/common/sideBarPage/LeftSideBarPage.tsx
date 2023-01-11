import { Component, createMemo, createSignal, For, JSXElement, ParentProps, Signal } from 'solid-js';
import { onMount } from 'solid-js';
import { css } from "solid-styled-components";
import SideBar from './SideBar';
import SideBarPageBody from './SideBarPageBody';

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
  -ms-overflow-style: none;
  ::-webkit-scrollbar{
    display: none;
  }
`;

type sideBarPage = {
  title: string,
  contents: JSXElement
}

export type LeftSideBarPageType = ParentProps & {
  menuWidth?: number,
  itemList: Array<sideBarPage>
}

const LeftSideBarPage: Component<LeftSideBarPageType> = (props: LeftSideBarPageType) => {
  const itemList = createMemo(() => props.itemList)
  // メインコンテンツ
  const [contents, setContents]: Signal<JSXElement> = createSignal(itemList()[0]?.contents);

  // メニューバー幅(%)
  const menuWidth = props.menuWidth === undefined ? 17 : props.menuWidth;

  // メインコンテンツ幅(%)
  const contentsWidth = 100 - menuWidth;

  return (
    <div class={SideBarPageClass}>
      <SideBar width={menuWidth}>
        <For each={itemList()} fallback={<li></li>}>
          {(item, idx) => (
            <li classList={{ isSelected: idx() === 0 }} onClick={() => setContents(item.contents)}>
              <span>{item.title}</span>
            </li>
          )}
        </For>
      </SideBar>

      <SideBarPageBody width={contentsWidth}>
        {contents()}
      </SideBarPageBody>
    </div>
  );
};

export default LeftSideBarPage;
