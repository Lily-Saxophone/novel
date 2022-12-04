import { Component, ParentProps, } from 'solid-js';
import { css } from "solid-styled-components";
import DetailSlide from './DetailSlide';
import DetailItem from './DetailItem';
import DetailText from './DetailText';
import DetailCharacter from './DetailCharacter';
import { SlideModel } from '../../models/slide/SlideModel';
import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';

const BasicSettingsClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  `;

export type BasicSettingsType = ParentProps & {
  slide: SlideModel | ChoicesEvent | EndEvent,
  onSlideUpdate: (slide: SlideModel) => void
}

const BasicSettings: Component<BasicSettingsType> = (props: BasicSettingsType) => {
  const updateSlide = (text: string | null) => {
    let slide: SlideModel = props.slide as SlideModel;
    if (text !== null) {
      slide.slideText.text = text;
      props.onSlideUpdate(slide);
    }
  }

  return (
    <div class={BasicSettingsClass}>
      <DetailItem title='テキスト'>
        <DetailText
          slideText={{ ...(props.slide as SlideModel)?.slideText }.text}
          onSlideUpdate={updateSlide}
        />
      </DetailItem>
      <DetailItem title='キャラクター'>
        <DetailCharacter characterList={(props.slide as SlideModel).characterList} />
      </DetailItem>
      <DetailItem title='シーン'>
        <DetailSlide
          backGroundName=''
          backGroundSrc={(props.slide as SlideModel).backGroundImage}
          bgmSrc={(props.slide as SlideModel).backGroundMusic}
          motionSrc='effect/slide/切り替えアニメーション１'
          seSrc=''
        />
      </DetailItem>
    </div>
  );
};

export default BasicSettings;
