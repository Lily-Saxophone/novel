import ChartNode from '../../components/common/item/ChartNode';
import { Component, createSignal, For, Match, onMount, ParentProps, Show, Signal, Switch, } from 'solid-js';
import { css } from "solid-styled-components";
import { ChoicesCard, FlowEdge, FlowNode } from './ScenarioFlow';
import SmallSceneCard from '../../components/common/item/SmallSceneCard';
import ChartEdge from '../../components/common/item/ChartEdge';

const FlowChartClass = css`
  padding: 30px;
  width: calc(100% - 60px);
  position: relative;
  overflow: scroll;
  `;

const FlowChartContainerClass = css`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  `;

const ChartItemClass = css`
  width: fit-content;
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  gap: 1rem 3rem;
  `;

const ItemWrapperClass = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  row-gap: 1rem;
  `;

const ChoicesCardClass = css`
  width: 350px;
  height: 30px;
  background-color: #737373ef;
  border-radius: 6px;
  font-family: 'ヒラギノ角ゴ ProN W3';
  font-size: .8rem;
  padding: 1px 0;
  position: relative;

  label {
    position: absolute;
    top: -8px;
    left: 8px;
    width: 20%;
    border-radius: 6px;
    display: block;
    background-color: #404040;
    text-align: center;
    font-size: .7rem;
    border: solid 1.2px #94a1a0;
  }

  span {
    margin: .7em 1em .4em 1em;
    padding-left: 5px;
    display: block;
  }
  `;

const ChoicesContainerClass = css`
  width: fit-content;
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  margin-bottom: 1rem;
  gap: 1rem 3rem;

  .flex-container {
    display: flex;
    flex-direction: column;
    gap: 2rem 0;
  }
  `;

const DummyClass = css`
  width: calc(350px - 14px);
  height: calc(80px - 14px);
  padding: 7px;
  `;

const ShadowClass = css`
  width: fit-content;
  border-radius: 5px;
  box-shadow:
    0 0 2px 2px rgba(20, 20, 20, .2),
    0 0 3px 3px rgba(20, 20, 20, .1),
    0 0 4px 4px rgba(20, 20, 20, .1),
    0 0 6px 6px rgba(20, 20, 20, .1);
`;
const PlusButtonClass = css`
  width:50px;
  height: 50px;
  display: block;
  margin: auto;
`;

export type FlowChartType = ParentProps & {
  edges: Array<FlowEdge | ChoicesCard[]>,
  nodes: FlowNode[],
}

export type EdgeRefType = {
  id: number,
  ref: HTMLDivElement
}

export type CoordinateType = {
  x: number,
  y: number,
  position: string,
}

export type NodeType = {
  source: CoordinateType,
  target: CoordinateType,
}

const getCoordinate = (ref: any, position: string, parentRef: any): CoordinateType => {
  let x = 0;
  let y = 0;
  let rect = ref.getBoundingClientRect();
  let parentRect = parentRef.getBoundingClientRect();

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

  return { x: x - parentRect.left, y: y - parentRect.top, position }
}

const createNodes = (flowNodes: FlowNode[], refs: EdgeRefType[], parentRef: any): NodeType[] => {
  let nodes: NodeType[] = [];

  flowNodes.forEach(el => {
    let sourceCoordinate: CoordinateType = { x: 0, y: 0, position: "top" };
    let targetCoordinate: CoordinateType = { x: 0, y: 0, position: "top" };

    let sourceRef = refs.find(item => item.id === el.sourceId)?.ref;
    if (sourceRef !== undefined) {
      sourceCoordinate = getCoordinate(sourceRef, el.sourcePosition, parentRef);
    }

    let targetRef = refs.find(item => item.id === el.targetId)?.ref;
    if (targetRef !== undefined) {
      targetCoordinate = getCoordinate(targetRef, el.targetPosition, parentRef);
    }

    if (sourceRef !== undefined && targetRef !== undefined) {
      nodes.push({ source: sourceCoordinate, target: targetCoordinate })
    }
  })

  return nodes
}

let parentRef: HTMLDivElement;
let scrollRef: HTMLDivElement;

const FlowChart: Component<FlowChartType> = (props: FlowChartType) => {

  const [nodes, setNodes]: Signal<NodeType[]> = createSignal([]);
  let wkRefs: EdgeRefType[] = new Array();

  onMount(() => {
    setNodes(createNodes(props.nodes, wkRefs, parentRef));
    parentRef.scrollTo(
      (scrollRef.getBoundingClientRect().width / 2)
      - (parentRef.getBoundingClientRect().width / 2)
      - (parentRef.getBoundingClientRect().left)
      + 30 // Padding分
      , 0);
  })

  return (
    <div ref={parentRef} class={FlowChartClass}>
      <div ref={scrollRef} class={FlowChartContainerClass}>
        <For each={props.edges} fallback={<div>Loading...</div>}>
          {(item) =>
            <Switch fallback={<div>Not Found</div>}>
              <Match when={'toSlide' in item}>
                <div class={ChartItemClass}>
                  <div class={ItemWrapperClass}>
                    <Show when={(item as FlowEdge).fromSlide.length !== 0} fallback={<div class={DummyClass}></div>}>
                      <For each={(item as FlowEdge).fromSlide} fallback={<div>Loading...</div>}>
                        {(item) =>
                          <ChartEdge
                            ref={(el: HTMLDivElement) => wkRefs.push({ id: item.id, ref: el })}>
                            <div class={ShadowClass}>
                              <SmallSceneCard
                                backGroundColor="#4f4f4f"
                                width="350px"
                                height="80px"
                                scenarioTitle={item.scenarioTitle}
                                sceneImage={item.sceneImage}
                                sceneTitle={item.sceneTitle}
                                sceneDetail={item.sceneDetail} />
                            </div>
                          </ChartEdge>
                        }
                      </For>
                    </Show>
                  </div>
                  <div class={ItemWrapperClass}>
                    <ChartEdge
                      ref={(el: HTMLDivElement) => wkRefs.push({ id: (item as FlowEdge).toSlide.id, ref: el })}>
                      <div class={ShadowClass}>
                        <SmallSceneCard
                          backGroundColor="#333333"
                          width="350px"
                          height="80px"
                          sceneImage={(item as FlowEdge).toSlide.sceneImage}
                          sceneTitle={(item as FlowEdge).toSlide.sceneTitle}
                          sceneDetail={(item as FlowEdge).toSlide.sceneDetail} />
                      </div>
                    </ChartEdge>
                  </div>
                  <div class={ItemWrapperClass}>
                    <div class={DummyClass}></div>
                  </div>
                </div>
              </Match>
              <Match when={'choicesLabel' in (item as ChoicesCard[])[0]}>
                <div class={ChoicesContainerClass}>
                  <For each={(item as ChoicesCard[])} fallback={<div>Loading...</div>}>
                    {(item, index) =>
                      <div class='flex-container'>
                        <ChartEdge
                          ref={(el: HTMLDivElement) => wkRefs.push({ id: (item as ChoicesCard).id, ref: el })}>
                          <div class={ShadowClass}>
                            <div class={ChoicesCardClass}>
                              <label>{`選択肢${index() + 1}`}</label>
                              <span>
                                {(item as ChoicesCard).choicesLabel}
                              </span>
                            </div>
                          </div>
                        </ChartEdge>
                        <ChartEdge
                          ref={(el: HTMLDivElement) => wkRefs.push({ id: (item as ChoicesCard).toSlide.id, ref: el })}>
                          <Show when={(item as ChoicesCard).toSlide.scenarioTitle !== ""}
                            fallback={
                              <img class={PlusButtonClass} src='/src/assets/image/PlusButton_outline.svg' />
                            }>
                            <div class={ShadowClass}>
                              <SmallSceneCard
                                backGroundColor={(item as ChoicesCard).toSlide.scenarioTitle !== "" ? "#4f4f4f" : "#333333"}
                                width="350px"
                                height="80px"
                                scenarioTitle={(item as ChoicesCard).toSlide.scenarioTitle}
                                sceneImage={(item as ChoicesCard).toSlide.sceneImage}
                                sceneTitle={(item as ChoicesCard).toSlide.sceneTitle}
                                sceneDetail={(item as ChoicesCard).toSlide.sceneDetail} />
                            </div>
                          </Show>
                        </ChartEdge>
                      </div>
                    }
                  </For>
                </div>
              </Match>
            </Switch>
          }
        </For>
        <For each={nodes()} fallback={<></>}>
          {(item) =>
            <ChartNode
              sourceCoordinate={{ x: item.source.x, y: item.source.y, position: item.source.position }}
              targetCoordinate={{ x: item.target.x, y: item.target.y, position: item.target.position }}
            />
          }
        </For>
      </div>
    </div>
  );
};

export default FlowChart;
