import { Component, createEffect, createMemo, createSignal, For, JSX, JSXElement, onMount, ParentProps, Setter, Signal } from 'solid-js';
import { css } from "solid-styled-components";

export type ChartNodeType = ParentProps & {
  sourceCoordinate: [x: number, y: number],
  targetCoordinate: [x: number, y: number],
}

const ChartNodeClass = (props: { position: [number, number], width: number, height: number }) => css`
  top: ${(props.position[1] - 2) + "px"};
  left: ${props.position[0] + "px"};
  position: absolute;
  margin: 0;
  padding: 0;
  min-width: "4px";
  width: ${props.width + "px"};
  min-height: 4px;
  height: ${(props.height + 4) + "px"};
  `;

const SourceNodeClass = (props: { width: number, positionY: number }) => css`
  position: absolute;
  min-width: ${props.width + "px"};
  min-height: 4px;
  ${props.positionY <= 0 ? "top" : "bottom"}: 0;
  left: 0;
  background: gray;
  `;

const TargetNodeClass = (props: { width: number, positionY: number }) => css`
  position: absolute;
  min-width: ${props.width + "px"};
  min-height: 4px;
  ${props.positionY <= 0 ? "bottom" : "top"}: 0;
  right: 0;
  background: gray;
  `;

const NodeConnectorClass = (props: { position: [number, number], width: number, height: number }) => css`
  position: absolute;
  top: ${(props.width === 0 ? 2 : 0) + "px"};
  left: ${(props.width / 2 - 2) + "px"};
  min-width: 4px;
  min-height: ${(props.width === 0 ? props.height : props.height + 4) + "px"};
  background: gray;
  `;

const getChartNodeProperty = (
  props: {
    sourceCoordinate: [x: number, y: number],
    targetCoordinate: [x: number, y: number]
  }): { position: [number, number], width: number, height: number } => {

  let positionX = props.sourceCoordinate[0] <= props.targetCoordinate[0] ? props.sourceCoordinate[0] : props.targetCoordinate[0]
  let positionY = props.sourceCoordinate[1] <= props.targetCoordinate[1] ? props.sourceCoordinate[1] : props.targetCoordinate[1]
  let width = Math.abs(props.sourceCoordinate[0] - props.targetCoordinate[0])
  let height = Math.abs(props.sourceCoordinate[1] - props.targetCoordinate[1])
  return { position: [positionX, positionY], width: width, height: height }
}

const getSourceNodeProperty = (
  props: {
    sourceCoordinate: [x: number, y: number],
    targetCoordinate: [x: number, y: number]
  }): { width: number, positionY: number } => {

  let width = Math.abs(props.sourceCoordinate[0] - props.targetCoordinate[0]) / 2
  let positionY = props.sourceCoordinate[1] - props.targetCoordinate[1]
  return { width, positionY }
}

const getTargetNodeProperty = (
  props: {
    sourceCoordinate: [x: number, y: number],
    targetCoordinate: [x: number, y: number]
  }): { width: number, positionY: number } => {

  let width = Math.abs(props.sourceCoordinate[0] - props.targetCoordinate[0]) / 2
  let positionY = props.sourceCoordinate[1] - props.targetCoordinate[1]
  return { width, positionY }
}

const getNodeConnectorProperty = (
  props: {
    sourceCoordinate: [x: number, y: number],
    targetCoordinate: [x: number, y: number]
  }): { position: [number, number], width: number, height: number } => {

  let positionX = props.sourceCoordinate[0] <= props.targetCoordinate[0] ? props.sourceCoordinate[0] : props.targetCoordinate[0]
  let positionY = props.sourceCoordinate[1] <= props.targetCoordinate[1] ? props.sourceCoordinate[1] : props.targetCoordinate[1]
  let width = Math.abs(props.sourceCoordinate[0] - props.targetCoordinate[0])
  let height = Math.abs(props.sourceCoordinate[1] - props.targetCoordinate[1])
  return { position: [positionX, positionY], width: width, height: height }
}

const ChartNode: Component<ChartNodeType> = (props: ChartNodeType) => {
  const parentProps = createMemo(() => props)
  return (
    <div class={ChartNodeClass(getChartNodeProperty(parentProps()))}>
      <div class={SourceNodeClass(getSourceNodeProperty(parentProps()))}></div>
      <div class={NodeConnectorClass(getNodeConnectorProperty(parentProps()))}></div>
      <div class={TargetNodeClass(getTargetNodeProperty(parentProps()))}></div>
    </div>
  );
};

export default ChartNode;
