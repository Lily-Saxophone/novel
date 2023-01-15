import { Component, createEffect, createSignal, For, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';
import SelectItemList from '../../components/common/selectItemList/selectItemList';
import SearchBox from '../../components/common/searchBox/searchBox';
import SmallSceneCard from '../../components/common/item/SmallSceneCard';

const SceneScenarioClass = css`
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  .topbar_content {
    margin: 4px 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    &> span {
      font-size: .7rem;
      display: inline-block;
      margin: auto 5px;
    }
  }

  .left_sidebar {
    width: 100%;
    height: 100%;
  }
`;

const scene = [
  {
    sceneKey: 'SceneA-1',
    sceneTitle: 'ルート１ - 木村の演奏会 -',
    sceneDetail: '花びらは舞い上がり、風にたなびく髪は、さらさらと流れ、夕日をいっぺんに浴びて',
    sceneGroup: 'GroupA'
  },
  {
    sceneKey: 'SceneA-2',
    sceneTitle: 'ルート２ - どうしてテスクは残業が多いのか - ',
    sceneDetail: 'え、なんでこんなに残業が多いわけ？本当に信じられない。しんどい。',
    sceneGroup: 'GroupB'
  },
  {
    sceneKey: 'SceneA-3',
    sceneTitle: 'ルート３ - 蠍火、そしてfirefox -',
    sceneDetail: '蠍火？サムネイルがどうみてもfirefoxのそれ。',
    sceneGroup: 'GroupA'
  },
  {
    sceneKey: 'SceneA-4',
    sceneTitle: 'ルート４ - どうしてぽんぬは株を始められないのか - ',
    sceneDetail: 'ゆうちょダイレクトにログイン出来ない？パスワードを忘れた？宮崎さんに先を越されるぽんぬ。',
    sceneGroup: 'GroupB'
  },
]

const itemList = [
  {
    itemKey: 'AllItem',
    itemName: '全て'
  },
  {
    itemKey: 'GroupA',
    itemName: 'ぽんぬ１'
  },
  {
    itemKey: 'GroupB',
    itemName: 'ぽんぬ２'
  },
  {
    itemKey: 'GroupC',
    itemName: 'ぽんぬ３'
  },
]


export type SceneScenarioType = ParentProps & {

}

const SceneScenario: Component<SceneScenarioType> = (props: SceneScenarioType) => {
  const [viewScene, setviewScene]: Signal<{ sceneKey: string, sceneTitle: string, sceneDetail: string, sceneGroup: string }[]> = createSignal(scene)

  const scenes = () => {
    const [selectedSceneKey, setSelectedSceneKey]: Signal<string> = createSignal(scene[0].sceneKey)

    const handleSlideClick = (key: string) => {
      setSelectedSceneKey(key)
      // console.log(`SelectedSceneKey: [${key}]`)
    }

    return (
      <div class='scenes'>
        <For each={viewScene()} fallback={<div>No Items...</div>}>
          {scene => (
            <div style="max-height=65px">
              <SmallSceneCard
                backGroundColor={scene.sceneKey === selectedSceneKey() ? "#606060" : "none"}
                onClick={() => handleSlideClick(scene.sceneKey)}
                sceneImage="https://via.placeholder.com/110x65"
                sceneTitle={scene.sceneTitle}
                sceneDetail={scene.sceneDetail}
                width="100%"
                height="65px" />
            </div>
          )}
        </For>
      </div>
    )
  }

  const scenarioList = [
    {
      title: '第1章',
      contents: scenes()
    },
    {
      title: '第2章',
      contents: <div>コンテンツ２</div>
    },
    {
      title: 'エンディング用',
      contents: <div>コンテンツ３</div>
    },
    {
      title: '日常(汎用)',
      contents: <div>コンテンツ４</div>
    },
  ]

  const [selectedGroup, setSelectedGroup]: Signal<{ key: string, value: string }> = createSignal({ key: '', value: '' })
  const [searchText, setSearchText]: Signal<string> = createSignal('')
  createEffect(() => {
    // console.log(`SelectedGroup: [`, selectedGroup(), ']')
    if (selectedGroup().key === 'AllItem') {
      setviewScene(scene)
    } else {
      setviewScene(scene.filter(f => f.sceneGroup === selectedGroup().key))
    }
  })

  const handleSearchSubmit = () => {
    // console.log(`SubmitSearch: [${searchText()}]`)
  }

  return (
    <div class={SceneScenarioClass}>
      <div class='topbar_content'>
        <span>{'グループ： '}</span>
        <SelectItemList
          itemList={itemList}
          setSelectedItem={setSelectedGroup}
          hasCustom={true}
          width={'10rem'} />

        <SearchBox
          setText={setSearchText}
          onSubmitButtonClick={handleSearchSubmit}
          defaultValue={''}
          width={'7rem'} />
      </div>

      <div class='left_sidebar'>
        <LeftSideBarPage
          menuWidth={25}
          itemList={scenarioList}
        />
      </div>
    </div>
  );
};

export default SceneScenario;
