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
  id: number,
  scenarioTitle?: string,
  sceneTitle: string,
  sceneDetail: string,
  sceneImage: string,
}

export type ChoicesCard = {
  id: number,
  choicesLabel: string
  toSlide: SceneCard,
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

const initFlowEdges: Array<FlowEdge | ChoicesCard[]> = [
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
  {
    "toSlide": {
      "id": 5,
      "scenarioTitle": "",
      "sceneTitle": "toタイトル",
      "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
      "sceneImage": "https://via.placeholder.com/110x65",
    },
    "fromSlide": []
  },
  [
    {
      "id": 6,
      "choicesLabel": "えりちゃんってほら、なんかのお花の名前だよ。",
      "toSlide": {
        "id": 12,
        "scenarioTitle": "",
        "sceneTitle": "toタイトル",
        "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
        "sceneImage": "https://via.placeholder.com/110x65",
      },
    },
    {
      "id": 7,
      "choicesLabel": "きむらぁぁぁぁぁぁぁ！！！！！",
      "toSlide": {
        "id": 13,
        "scenarioTitle": "第1章",
        "sceneTitle": "fromタイトル",
        "sceneDetail": "ここに説明文を記載しますきむらきむらきむらきむらきむらきむらきむらきむらきむらきむら",
        "sceneImage": "https://via.placeholder.com/110x65",
      },
    },
    {
      "id": 8,
      "choicesLabel": "きむらぁぁぁぁぁぁぁ！！！！！",
      "toSlide": {
        "id": 14,
        "scenarioTitle": "",
        "sceneTitle": "",
        "sceneDetail": "",
        "sceneImage": "",
      },
    },
    {
      "id": 9,
      "choicesLabel": "きむらぁぁぁぁぁぁぁ！！！！！",
      "toSlide": {
        "id": 15,
        "scenarioTitle": "",
        "sceneTitle": "",
        "sceneDetail": "",
        "sceneImage": "",
      },
    },
    {
      "id": 10,
      "choicesLabel": "きむらぁぁぁぁぁぁぁ！！！！！",
      "toSlide": {
        "id": 16,
        "scenarioTitle": "",
        "sceneTitle": "",
        "sceneDetail": "",
        "sceneImage": "",
      },
    },
    {
      "id": 11,
      "choicesLabel": "きむらぁぁぁぁぁぁぁ！！！！！",
      "toSlide": {
        "id": 17,
        "scenarioTitle": "",
        "sceneTitle": "",
        "sceneDetail": "",
        "sceneImage": "",
      },
    },
  ]
]

const initFlowNodes: FlowNode[] = [
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
  {
    sourceId: 2,
    sourcePosition: "bottom",
    targetId: 5,
    targetPosition: "top",
  },
  {
    sourceId: 5,
    sourcePosition: "bottom",
    targetId: 6,
    targetPosition: "top",
  },
  {
    sourceId: 5,
    sourcePosition: "bottom",
    targetId: 7,
    targetPosition: "top",
  },
  {
    sourceId: 5,
    sourcePosition: "bottom",
    targetId: 8,
    targetPosition: "top",
  },
  {
    sourceId: 5,
    sourcePosition: "bottom",
    targetId: 9,
    targetPosition: "top",
  },
  {
    sourceId: 5,
    sourcePosition: "bottom",
    targetId: 10,
    targetPosition: "top",
  },
  {
    sourceId: 5,
    sourcePosition: "bottom",
    targetId: 11,
    targetPosition: "top",
  },
  {
    sourceId: 6,
    sourcePosition: "bottom",
    targetId: 12,
    targetPosition: "top",
  },
  {
    sourceId: 7,
    sourcePosition: "bottom",
    targetId: 13,
    targetPosition: "top",
  },
  {
    sourceId: 8,
    sourcePosition: "bottom",
    targetId: 14,
    targetPosition: "top",
  },
  {
    sourceId: 9,
    sourcePosition: "bottom",
    targetId: 15,
    targetPosition: "top",
  },
  {
    sourceId: 10,
    sourcePosition: "bottom",
    targetId: 16,
    targetPosition: "top",
  },
  {
    sourceId: 11,
    sourcePosition: "bottom",
    targetId: 17,
    targetPosition: "top",
  },
]
const ScenarioFlow: Component<ScenarioFlowType> = (props: ScenarioFlowType) => {

  const [flowEdges, setFlowEdges]: Signal<Array<FlowEdge | ChoicesCard[]>> = createSignal(initFlowEdges);
  const handleFlowEdgesChange = (edges: FlowEdge[]) => {
    setFlowEdges(edges);
  }
  const [flowNodes, setFlowNodes]: Signal<FlowNode[]> = createSignal(initFlowNodes);


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
                nodes={flowNodes()} />
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
