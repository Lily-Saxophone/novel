import { Component, createEffect, createSignal, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import FileSelector from './FileSelector';
import ImageBox from './ImageBox';

const DetailSlideClass = css`
  display:flex;
  justify-content: space-around;
  align-items: center;
`;

const LeftItemHeaderClass = css`
  font-size: 0.8rem;
  min-width: fit-content;
  text-align: center;
  font-weight: bold;
  `;

const RightItemHeaderClass = css`
  font-size: 0.8rem;
  min-width: 4rem;
  text-align: center;
  font-weight: bold;

  `;

const LeftFlexItemClass = css`
  display:flex;
  align-items: center;
  `;

const RightFlexItemClass = css`
  display:flex;
  flex-direction: column;
  flex-grow: 3;
  `;

const FlexRowClass = css`
  display:flex;
  width: calc(100% - 10px);
  height: calc(100% - 10px);
  align-items: center;
  padding: 2px 0 2px 10px;

  span {
    font-size: 0.8rem;
  }
`;

export type DetailSlideType = ParentProps & {
  backGroundName?: string,
  backGroundSrc: string,
  bgmSrc: string,
  motionSrc: string,
  seSrc: string
}

const DetailSlide: Component<DetailSlideType> = (props: DetailSlideType) => {
  return (
    <div class={DetailSlideClass}>
      <div class={LeftFlexItemClass}>
        <div class={LeftItemHeaderClass}>背景：</div>
        <ImageBox
          imageName={props.backGroundName}
          src={props.backGroundSrc}
        />
      </div>
      <div class={RightFlexItemClass}>
        <div class={FlexRowClass}>
          <div class={RightItemHeaderClass}>BGM</div>
          <span>：</span>
          <div style={'flex: 1;'}>
            <FileSelector default='音源なし' fileName={props.bgmSrc} />
          </div>
        </div>
        <div class={FlexRowClass}>
          <div class={RightItemHeaderClass}>モーション</div>
          <span>：</span>
          <div style={'flex: 1;'}>
            <FileSelector default='モーションなし' fileName={props.motionSrc} />
          </div>
        </div>
        <div class={FlexRowClass}>
          <div class={RightItemHeaderClass}>SE</div>
          <span>：</span>
          <div style={'flex: 1;'}>
            <FileSelector default='SEなし' fileName={props.seSrc} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSlide;
