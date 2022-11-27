import { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import { EndEvent } from '../../models/scene/EndEvent';
import { SceneModel } from '../../models/scene/SceneModel';
import { Component, Match, ParentProps, Switch } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../../components/common/sideBarPage/LeftSideBarPage';
import BasicSettings from './BasicSettings';
import SceneUtil from '../../utils/scene/sceneUtil';

const SceneDetailClass = css`
  width: 100%;
  height: calc(100% - 20px);
`;

export type SceneDetailType = ParentProps & {
  scene: SceneModel | ChoicesEvent | EndEvent,
  onSceneUpdate: (scene: SceneModel) => void
}

const SceneDetail: Component<SceneDetailType> = (props: SceneDetailType) => {

  return (
    <div class={SceneDetailClass}>
      <LeftSideBarPage
        menuWidth={15}
        itemList={[
          {
            title: '基本設定',
            contents: (
              <Switch fallback={<>error</>}>
                <Match when={SceneUtil.isSceneModel(props.scene)}>
                  <BasicSettings scene={props.scene} onSceneUpdate={props.onSceneUpdate} />
                </Match>
                <Match when={SceneUtil.isChoicesEvent(props.scene)}>
                  <div>シーンイベント</div>
                </Match>
                <Match when={SceneUtil.isEndEvent(props.scene)}>
                  <div>エンドイベント</div>
                </Match>
              </Switch>)
          },
        ]}
      />
    </div>
  );
};

export default SceneDetail;
