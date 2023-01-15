import { CoordinateType } from '../../../components/scenarioFlow/FlowChart';
import { Component, createEffect, createMemo, createSignal, For, JSX, JSXElement, onMount, ParentProps, Setter, Signal } from 'solid-js';
import { css } from "solid-styled-components";

export type ChartNodeType = ParentProps & {
  sourceCoordinate: CoordinateType,
  targetCoordinate: CoordinateType,
}

type NodePropertyType = {
  x: number,
  y: number,
  width: number,
  height: number,
  verticalMode: boolean,
}

const ChartNodeClass = (nodeProperty: NodePropertyType) => css`
  top: ${nodeProperty.y + "px"};
  left: ${nodeProperty.x + "px"};
  position: absolute;
  margin: 0;
  padding: 0;
  min-width: ${nodeProperty.width === 0 ? "0px" : "4px"};
  width: ${nodeProperty.width + "px"};
  min-height: 4px;
  height: ${(nodeProperty.height) + "px"};
  `;

const SourceNodeClass = (nodeProperty: NodePropertyType) => css`
  position: absolute;
  min-width: ${Math.abs(nodeProperty.width) + "px"};
  min-height: ${Math.abs(nodeProperty.height) + "px"};
  ${nodeProperty.height <= 0 ? "top" : "bottom"}: 0;
  left: ${nodeProperty.y + "px"};
  background: gray;
  `;

const TargetNodeClass = (nodeProperty: NodePropertyType) => css`
  position: absolute;
  min-width: ${Math.abs(nodeProperty.width) + "px"};
  min-height: ${Math.abs(nodeProperty.height) + "px"};
  ${nodeProperty.height <= 0 ? "bottom" : "top"}: 0;
  left: ${nodeProperty.y + "px"};
  background: gray;
  `;

const NodeConnectorClass = (nodeProperty: NodePropertyType) => css`
  position: absolute;
  top: ${nodeProperty.x + "px"};
  left: ${nodeProperty.y + "px"};
  min-width: ${Math.abs(nodeProperty.width) + "px"};
  min-height: ${Math.abs(nodeProperty.height) + "px"};
  background: gray;
  `;

const getChartNodeProperty = (nodeProperty: NodePropertyType): NodePropertyType => {
  let wkNodeProperty = Object.assign({}, nodeProperty);
  wkNodeProperty.x = nodeProperty.verticalMode ? nodeProperty.x - 2 : nodeProperty.x;
  wkNodeProperty.y = nodeProperty.verticalMode ? nodeProperty.y : nodeProperty.y - 2;
  wkNodeProperty.width = nodeProperty.verticalMode ? Math.abs(nodeProperty.width) + 4 : Math.abs(nodeProperty.width);
  wkNodeProperty.height = nodeProperty.verticalMode ? Math.abs(nodeProperty.height) : Math.abs(nodeProperty.height) + 4;

  return wkNodeProperty
}

const getSourceNodeProperty = (nodeProperty: NodePropertyType): NodePropertyType => {
  let wkNodeProperty = Object.assign({}, nodeProperty);

  if (wkNodeProperty.verticalMode) {
    wkNodeProperty.y = (wkNodeProperty.width <= 0 ? 0 : Math.abs(wkNodeProperty.width));
    wkNodeProperty.width = (wkNodeProperty.width <= 0 ? -1 : 1) * 4;
    wkNodeProperty.height = wkNodeProperty.height / 2;
  } else {
    wkNodeProperty.y = 0;
    wkNodeProperty.width = wkNodeProperty.width / 2;
    wkNodeProperty.height = (wkNodeProperty.height <= 0 ? -1 : 1) * 4;
  }

  return wkNodeProperty
}

const getTargetNodeProperty = (nodeProperty: NodePropertyType): NodePropertyType => {
  let wkNodeProperty = Object.assign({}, nodeProperty);

  if (wkNodeProperty.verticalMode) {
    wkNodeProperty.y = (wkNodeProperty.width >= 0 ? 0 : Math.abs(wkNodeProperty.width));
    wkNodeProperty.width = (wkNodeProperty.width <= 0 ? -1 : 1) * 4;
    wkNodeProperty.height = wkNodeProperty.height / 2;
  } else {
    wkNodeProperty.y = Math.abs(wkNodeProperty.width) / 2;
    wkNodeProperty.width = wkNodeProperty.width / 2;
    wkNodeProperty.height = (wkNodeProperty.height <= 0 ? -1 : 1) * 4;
  }

  return wkNodeProperty
}

const getNodeConnectorProperty = (nodeProperty: NodePropertyType): NodePropertyType => {
  let wkNodeProperty = Object.assign({}, nodeProperty);

  if (wkNodeProperty.verticalMode) {
    wkNodeProperty.x = Math.abs(wkNodeProperty.height) / 2;
    wkNodeProperty.y = 0;
    wkNodeProperty.width = Math.abs(wkNodeProperty.width) + 4;
    wkNodeProperty.height = 4;
  } else {
    wkNodeProperty.x = 0;
    wkNodeProperty.y = Math.abs(wkNodeProperty.width) / 2;
    wkNodeProperty.width = 4;
    wkNodeProperty.height = Math.abs(wkNodeProperty.height) === 0 ? Math.abs(wkNodeProperty.height) : Math.abs(wkNodeProperty.height) + 4;
  }

  return wkNodeProperty
}


const ChartNode: Component<ChartNodeType> = (props: ChartNodeType) => {
  const parentProps = createMemo(() => props)

  let verticalMode = false;
  let wkPositionX = props.sourceCoordinate.x <= props.targetCoordinate.x ? props.sourceCoordinate.x : props.targetCoordinate.x
  let wkPositionY = props.sourceCoordinate.y <= props.targetCoordinate.y ? props.sourceCoordinate.y : props.targetCoordinate.y
  let wkWidth = props.sourceCoordinate.x - props.targetCoordinate.x;
  let wkHeight = props.sourceCoordinate.y - props.targetCoordinate.y;


  if (["top", "bottom"].includes(parentProps().sourceCoordinate.position)
    && ["top", "bottom"].includes(parentProps().targetCoordinate.position)) {
    verticalMode = true;
  }

  const coordinate: NodePropertyType = { x: wkPositionX, y: wkPositionY, width: wkWidth, height: wkHeight, verticalMode: verticalMode }

  onMount(() => {
  })
  return (
    <div class={ChartNodeClass(getChartNodeProperty(coordinate))}>
      <div class={SourceNodeClass(getSourceNodeProperty(coordinate))}></div>
      <div class={NodeConnectorClass(getNodeConnectorProperty(coordinate))}></div>
      <div class={TargetNodeClass(getTargetNodeProperty(coordinate))}></div>
    </div>
  );
};

export default ChartNode;
