import { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import { EndEvent } from '../../models/scene/EndEvent';
import { SceneModel } from '../../models/scene/SceneModel';
import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../../components/common/sideBarPage/LeftSideBarPage';
import BasicSettings from './BasicSettings';

const SceneDetailClass = css`
  width: 100%;
  height: calc(100% - 20px);
`;

export type SceneDetailType = ParentProps & {
  scene: SceneModel | ChoicesEvent | EndEvent,
  onSceneUpdate?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
}

const SceneDetail: Component<SceneDetailType> = (props: SceneDetailType) => {
  return (
    <div class={SceneDetailClass}>
      <LeftSideBarPage
        menuWidth={15}
        itemList={[
          {
            title: '基本設定',
            contents: <BasicSettings scene={props.scene} onSceneUpdate={props.onSceneUpdate} />
          },
        ]}
      />
    </div>
  );
};

export default SceneDetail;
