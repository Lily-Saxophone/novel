import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';
import { SlideModel } from '../../models/slide/SlideModel';
import { Component, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';
import FlowChart from './FlowChart';

const ScenarioFlowClass = css`
  width: 100%;
  height: calc(100% - 20px);
`;

export type ScenarioFlowType = ParentProps & {
  slide: SlideModel | ChoicesEvent | EndEvent,
  onSlideUpdate: (slide: SlideModel) => void
}

const ScenarioFlow: Component<ScenarioFlowType> = (props: ScenarioFlowType) => {

  return (
    <div class={ScenarioFlowClass}>
      <LeftSideBarPage
        menuWidth={15}
        itemList={[
          {
            title: '第１章',
            contents: (
              <FlowChart />
            )
          },
          {
            title: '第２章',
            contents: (
              <>aaaaaaa</>
            )
          },
          {
            title: 'エンディング用',
            contents: (
              <></>
            )
          },
          {
            title: '日常(汎用)',
            contents: (
              <></>
            )
          },
        ]}
      />
    </div>
  );
};

export default ScenarioFlow;
