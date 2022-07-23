import { Component, createEffect, createSignal, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../../components/common/sideBarPage/LeftSideBarPage';
import BasicSettings from './BasicSettings';

const SceneDetailClass = css`
  width: 100%;
  height: calc(100% - 20px);
`;

export type SceneDetailType = ParentProps & {

}

const SceneDetail: Component<SceneDetailType> = (props: SceneDetailType) => {
  return (
    <div class={SceneDetailClass}>
      <LeftSideBarPage
        menuWidth={15}
        itemList={[
          {
            title: '基本設定',
            contents: <BasicSettings />
          },
        ]}
      />
    </div>
  );
};

export default SceneDetail;
