import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';
import { SlideModel } from '../../models/slide/SlideModel';
import { Component, Match, ParentProps, Switch } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';
import BasicSettings from './BasicSettings';
import SlideUtil from '../../utils/slide/slideUtil';

const SceneSlideClass = css`
  width: 100%;
  height: calc(100% - 20px);
`;

export type SceneSlideType = ParentProps & {
  slide: SlideModel | ChoicesEvent | EndEvent,
  onSlideUpdate: (slide: SlideModel) => void
}

const SceneSlide: Component<SceneSlideType> = (props: SceneSlideType) => {

  return (
    <div class={SceneSlideClass}>
      <LeftSideBarPage
        menuWidth={15}
        itemList={[
          {
            title: '基本設定',
            contents: (
              <Switch fallback={<>error</>}>
                <Match when={SlideUtil.isSlideModel(props.slide)}>
                  <BasicSettings slide={props.slide} onSlideUpdate={props.onSlideUpdate} />
                </Match>
                <Match when={SlideUtil.isChoicesEvent(props.slide)}>
                  <div>シーンイベント</div>
                </Match>
                <Match when={SlideUtil.isEndEvent(props.slide)}>
                  <div>エンドイベント</div>
                </Match>
              </Switch>)
          },
        ]}
      />
    </div>
  );
};

export default SceneSlide;
