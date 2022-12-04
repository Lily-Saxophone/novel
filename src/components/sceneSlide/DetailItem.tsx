import { Component, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";

const SettingsItemClass = css`
  margin: 5px;
  height: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ItemHeaderClass = css`
  display: inline;
  text-align: center;
  height: fit-content;
  min-width: 5.5rem;
  font-size: 0.8rem;
  font-weight: bold;
`;

const ItemBodyClass = css`
  flex-grow: 5;
  height: fit-content;
  min-height: 8vh;
  padding-left: 1vw;
  border-left: solid 1px #cccccc;
`;

export type DetailItemType = ParentProps & {
  title: string
}

const DetailItem: Component<DetailItemType> = (props: DetailItemType) => {
  return (
    <div class={SettingsItemClass}>
      <div class={ItemHeaderClass}>{props.title}</div>
      <div class={ItemBodyClass}>
        {props.children}
      </div>
    </div>
  );
};

export default DetailItem;
