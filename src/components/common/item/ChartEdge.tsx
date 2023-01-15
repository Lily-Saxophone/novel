import { Component, createEffect, createRenderEffect, createSignal, For, JSX, JSXElement, onMount, ParentProps, Setter, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const ChartEdgeClass = css`
  min-width: fit-content;
  min-height: fit-content;
`;

export type ChartEdgeType = ParentProps & {
  ref?: HTMLDivElement | ((el: HTMLDivElement) => void) | undefined,
}

const ChartEdge: Component<ChartEdgeType> = (props: ChartEdgeType) => {
  return (
    <div ref={props.ref} class={ChartEdgeClass}>
      {props.children}
    </div>
  );
};

export default ChartEdge;
