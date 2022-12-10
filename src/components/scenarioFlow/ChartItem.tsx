import { Component, ParentProps, } from 'solid-js';
import { css } from "solid-styled-components";
import { SlideModel } from '../../models/slide/SlideModel';
import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';
import SmallSceneCard from '../common/item/SmallSceneCard';

const ChartItemClass = css`
  max-width: 25rem;
  max-height: 15rem;
  `;

export type ChartItemType = ParentProps & {
  slide?: SlideModel | ChoicesEvent | EndEvent,
  onSlideUpdate?: (slide: SlideModel) => void
}

const ChartItem: Component<ChartItemType> = (props: ChartItemType) => {

  return (
    <div class={ChartItemClass}>
      <SmallSceneCard
        backGroundColor="#333333"
        onClick={() => { }}
        sceneImage="https://via.placeholder.com/110x65"
        sceneTitle={"タイトル"}
        sceneDetail={"ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら"} />
    </div>
  );
};

export default ChartItem;
