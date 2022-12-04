import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const SlideTextHeaderClass = css`
  position: absolute;
  display: table;
  background-color: purple;
  border-radius: 13px;
  left: 4%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  width: 36%;
  height: 25%;
  margin: auto;
  font-size: 1rem;
  text-indent: 1rem;
  vertical-align: middle;
  color: #efefef;

  background-color: #514d48;
  background-image: repeating-linear-gradient(315deg, transparent, transparent 4px, rgba(89,85,79,.5) 4px, rgba(89,85,79,.5) 8px);
`;

export type SlideTextHeaderType = ParentProps & {
  speaker: string
}

const SlideTextHeader: Component<SlideTextHeaderType> = (props: SlideTextHeaderType) => {
  return (
    <div class={SlideTextHeaderClass}>
      <span style={'display: table-cell; vertical-align: middle'}>{props.speaker}</span>
    </div>
  );
};

export default SlideTextHeader;
