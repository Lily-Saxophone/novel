import SideBarPageBody from '../../components/common/sideBarPage/SideBarPageBody';
import { Component, createEffect, createSignal, For, JSX, JSXElement, onMount, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../../components/common/sideBarPage/LeftSideBarPage';

const SceneDetailClass = css`
  width: 100%;
  height: 100%;
`;

export type SceneDetailType = ParentProps & {

}

const SceneDetail: Component<SceneDetailType> = (props: SceneDetailType) => {
  return (
    <div class={SceneDetailClass}>
      <LeftSideBarPage
        menuWidth={17}
        itemList={[
          {
            title: 'メニュー１',
            contents: <div>コンテンツ１</div>
          },
          {
            title: 'メニュー2',
            contents: <div>コンテンツ２</div>
          },
          {
            title: 'メニュー3',
            contents: <div>コンテンツ３</div>
          },
          {
            title: 'メニュー4',
            contents: <div>コンテンツ４</div>
          },
          {
            title: 'メニュー5',
            contents: <div>コンテンツ５</div>
          },
        ]}
      />
    </div>
  );
};

export default SceneDetail;
