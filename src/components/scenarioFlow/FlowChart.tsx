import { Component, ParentProps, } from 'solid-js';
import { css } from "solid-styled-components";
import { SlideModel } from '../../models/slide/SlideModel';
import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';
import ChartItem from './ChartItem';

const FlowChartClass = css`
padding: 30px;
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: scroll;
  `;

export type FlowChartType = ParentProps & {
  slide?: SlideModel | ChoicesEvent | EndEvent,
  onSlideUpdate?: (slide: SlideModel) => void
}

const FlowChart: Component<FlowChartType> = (props: FlowChartType) => {

  return (
    <div class={FlowChartClass}>
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
      <ChartItem />
    </div>
  );
};

export default FlowChart;
