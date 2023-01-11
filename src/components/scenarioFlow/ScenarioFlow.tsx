import { ChoicesEvent } from '../../models/slide/ChoicesEvent';
import { EndEvent } from '../../models/slide/EndEvent';
import { SlideModel } from '../../models/slide/SlideModel';
import { Component, createSignal, onMount, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';
import FlowChart from './FlowChart';


const ScenarioFlowClass = css`
  width: 100%;
  height: calc(100% - 20px);
`;

export type ScenarioFlowType = ParentProps & {
  slide: SlideModel | ChoicesEvent | EndEvent,
  onSlideUpdate: (slide: SlideModel) => void
}

export type SceneCard = {
  ref?: any,
  id: number,
  scenarioTitle?: string,
  sceneTitle: string,
  sceneDetail: string,
  sceneImage: string,
}

export type FlowEdge = {
  toSlide: SceneCard,
  fromSlide: SceneCard[],
}

export type FlowNode = {
  sourceId: number,
  sourcePosition: string,
  targetId: number,
  targetPosition: string,
}

const initFlowEdges: FlowEdge[] = [
  {
    "toSlide": {
      "id": 0,
      "scenarioTitle": "",
      "sceneTitle": "toタイトル",
      "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
      "sceneImage": "https://via.placeholder.com/110x65",
    },
    "fromSlide": [
      {
        "id": 1,
        "scenarioTitle": "第1章",
        "sceneTitle": "fromタイトル",
        "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
        "sceneImage": "https://via.placeholder.com/110x65",
      },
    ]
  },
  {
    "toSlide": {
      "id": 2,
      "scenarioTitle": "",
      "sceneTitle": "toタイトル",
      "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
      "sceneImage": "https://via.placeholder.com/110x65",
    },
    "fromSlide": [
      {
        "id": 3,
        "scenarioTitle": "第1章",
        "sceneTitle": "fromタイトル",
        "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
        "sceneImage": "https://via.placeholder.com/110x65",
      },
      {
        "id": 4,
        "scenarioTitle": "第1章",
        "sceneTitle": "fromタイトル",
        "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
        "sceneImage": "https://via.placeholder.com/110x65",
      },
    ]
  },
]

const flowNodes: FlowNode[] = [
  {
    sourceId: 1,
    sourcePosition: "right",
    targetId: 0,
    targetPosition: "left",
  },
  {
    sourceId: 3,
    sourcePosition: "right",
    targetId: 2,
    targetPosition: "left",
  },
  {
    sourceId: 4,
    sourcePosition: "right",
    targetId: 2,
    targetPosition: "left",
  },
  {
    sourceId: 0,
    sourcePosition: "bottom",
    targetId: 2,
    targetPosition: "top",
  },
]
const ScenarioFlow: Component<ScenarioFlowType> = (props: ScenarioFlowType) => {

  const [flowEdges, setFlowEdges]: Signal<FlowEdge[]> = createSignal(initFlowEdges);
  const handleFlowEdgesChange = (edges: FlowEdge[]) => {
    setFlowEdges(edges);
  }

  return (
    <div class={ScenarioFlowClass}>
      <LeftSideBarPage
        menuWidth={15}
        itemList={[
          {
            title: '第１章',
            contents: (
              <FlowChart
                edges={flowEdges()}
                nodes={flowNodes} />
            )
          },
          {
            title: '第２章',
            contents: (
              <>aaaaaaa</>
            )
          },
          {
            title: 'エンディング用',
            contents: (
              <></>
            )
          },
          {
            title: '日常(汎用)',
            contents: (
              <></>
            )
          },
        ]}
      />
    </div>
  );
};

export default ScenarioFlow;
