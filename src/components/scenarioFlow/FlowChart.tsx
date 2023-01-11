import ChartNode from '../../components/common/item/ChartNode';
import { Component, createSignal, For, onMount, ParentProps, Show, Signal, } from 'solid-js';
import { css } from "solid-styled-components";
import { FlowEdge, FlowNode } from './ScenarioFlow';
import SmallSceneCard from '../../components/common/item/SmallSceneCard';
import ChartEdge from '../../components/common/item/ChartEdge';

const FlowChartClass = css`
  padding: 30px;
  width: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: scroll;
  `;

const ChartItemClass = css`
  width: fit-content;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem 3rem;
  `;

const ItemWrapperClass = css`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 1rem;
  `;

const DummyClass = css`
  width: 400px;
  height: 100px;
  `;

export type FlowChartType = ParentProps & {
  edges: FlowEdge[],
  nodes: FlowNode[],
}

export type EdgeRefType = {
  id: number,
  ref: any
}

export type CoordinateType = {
  x: number,
  y: number,
}

export type NodeType = {
  source: CoordinateType,
  target: CoordinateType,
}

const getCoordinate = (ref: any, position: string): CoordinateType => {
  let x = 0;
  let y = 0;
  let rect = ref.getBoundingClientRect();

  switch (position) {
    case "top":
      x = rect.left + (rect.width / 2);
      y = rect.top;
      break;
    case "left":
      x = rect.left;
      y = rect.top + (rect.height / 2);
      break;
    case "bottom":
      x = rect.left + (rect.width / 2);
      y = rect.bottom;
      break;
    case "right":
      x = rect.right;
      y = rect.top + (rect.height / 2);
      break;
    default:
  }

  return { x: x, y: y }
}

const createNodes = (flowNodes: FlowNode[], refs: EdgeRefType[]): NodeType[] => {
  let nodes: NodeType[] = [];

  flowNodes.forEach(el => {
    let sourceCoordinate: CoordinateType = { x: 0, y: 0 };
    let targetCoordinate: CoordinateType = { x: 0, y: 0 };

    let sourceRef = refs.find(item => item.id === el.sourceId)?.ref;
    if (sourceRef !== undefined) {
      sourceCoordinate = getCoordinate(sourceRef, el.sourcePosition);
    }

    let targetRef = refs.find(item => item.id === el.targetId)?.ref;
    if (targetRef !== undefined) {
      targetCoordinate = getCoordinate(targetRef, el.targetPosition);
    }

    if (sourceRef !== undefined && targetRef !== undefined) {
      nodes.push({ source: sourceCoordinate, target: targetCoordinate })
    }
  })

  return nodes
}

const FlowChart: Component<FlowChartType> = (props: FlowChartType) => {

  const [nodes, setNodes]: Signal<NodeType[]> = createSignal([]);
  let wkRefs: EdgeRefType[] = new Array();

  onMount(() => {
    setNodes(createNodes(props.nodes, wkRefs));
  })

  return (
    <div class={FlowChartClass}>
      <For each={props.edges} fallback={<div>Loading...</div>}>
        {(item) =>
          <div class={ChartItemClass}>
            <div class={ItemWrapperClass}>
              <Show when={item.fromSlide.length !== 0} fallback={<div class={DummyClass}></div>}>
                <For each={item.fromSlide} fallback={<div>Loading...</div>}>
                  {(item) =>
                    <ChartEdge
                      ref={(el: HTMLDivElement) => wkRefs.push({ id: item.id, ref: el })}>
                      <SmallSceneCard
                        backGroundColor="#333333"
                        width="400px"
                        height="100px"
                        scenarioTitle={item.scenarioTitle}
                        sceneImage={item.sceneImage}
                        sceneTitle={item.sceneTitle}
                        sceneDetail={item.sceneDetail} />
                    </ChartEdge>
                  }
                </For>
              </Show>
            </div>
            <div class={ItemWrapperClass}>
              <ChartEdge
                ref={(el: HTMLDivElement) => wkRefs.push({ id: item.toSlide.id, ref: el })}>

                <SmallSceneCard
                  backGroundColor="#333333"
                  width="400px"
                  height="100px"
                  sceneImage={item.toSlide.sceneImage}
                  sceneTitle={item.toSlide.sceneTitle}
                  sceneDetail={item.toSlide.sceneDetail} />
              </ChartEdge>
            </div>
            <div class={ItemWrapperClass}>
              <div class={DummyClass}></div>
            </div>
          </div>
        }
      </For>
      <For each={nodes()} fallback={<></>}>
        {(item) =>
          <ChartNode
            sourceCoordinate={[item.source.x, item.source.y]}
            targetCoordinate={[item.target.x, item.target.y]}
          />
        }
      </For>
    </div>
  );
};

export default FlowChart;
