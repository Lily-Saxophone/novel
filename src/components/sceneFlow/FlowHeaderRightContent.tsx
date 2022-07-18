import { Component, ParentProps, } from 'solid-js';
import { css } from 'solid-styled-components';

export type FlowHeaderRightContentPropType = ParentProps & {

}

const FlowHeaderRightContentClass = css`
  display: flex;
  justify-content: end;
  margin-right: 7px;

  span {
    font-size: 1.2rem;
    margin: 1px;
  }
`

const FlowHeaderRightContent: Component<FlowHeaderRightContentPropType> = (props: FlowHeaderRightContentPropType) => {
  return (
    <div class={FlowHeaderRightContentClass}>
      <span class="material-symbols-outlined">vertical_align_top</span>
      <span class="material-symbols-outlined">vertical_align_bottom</span>
    </div>
  );
};

export default FlowHeaderRightContent;
