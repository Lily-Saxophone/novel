import { Component, createEffect, createSignal, For, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';
import SelectItemList from '../../components/common/selectItemList/selectItemList';
import SearchBox from '../../components/common/searchBox/searchBox';

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

    .scenes {
      display: flex;
      flex-wrap: wrap;

      &::after {
        content: "";
        flex: auto;
        width: 100%;
        height: 65px;
        padding: 7px;
      }

      .scene_wrapper {
        width: 100%;
        height: 65px;
        display: flex;
        justify-content: space-around;
        padding: 7px;

        &[data-is-active='true'] {
          background-color: #606060;
        }

        .scene_thumbnail {
          width: 35%;
          min-width: 35%;
          height: 100%;
  
          img {
            width: 100%;
            border-radius: 6px;
            border: solid 1.3px #555555;
            box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
          }
        }
  
        .scene_description {
          width: 65%;
          height: 100%;
          padding: 7px;
          margin-left: 7px;
  
          .scene_title {
            width: 100%;
            max-width: 9rem;
            font-size: .75rem;
            font-weight: bold;
            margin-bottom: 3px;
            text-overflow: ellipsis;
            white-space : nowrap;
            overflow: hidden;
          }
  
          .scene_detail {
            width: 100%;
            max-height: 30px;
            font-size: .6rem;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: normal;
          }
        }
      }
    }
  }
`;

const sceneList = [
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


const [viewSceneList, setviewSceneList]: Signal<{ sceneKey: string, sceneTitle: string, sceneDetail: string, sceneGroup: string }[]> = createSignal(sceneList)

const scenes = () => {  
  const [selectedSceneKey, setSelectedSceneKey]: Signal<string> = createSignal(sceneList[0].sceneKey)

  const handleSceneClick = (key: string) => {
    setSelectedSceneKey(key)
    console.log(`SelectedSceneKey: [${key}]`)
  }

  return (
    <div class='scenes'>
      <For each={viewSceneList()} fallback={<div>No Items...</div>}>
        {scene => (
          <div class='scene_wrapper' data-is-active={scene.sceneKey === selectedSceneKey()} onClick={() => handleSceneClick(scene.sceneKey)}>
            <div class='scene_thumbnail'>
              <img src="https://via.placeholder.com/110x65" alt="" />
            </div>
            <div class='scene_description'>
              <div class='scene_title'>{scene.sceneTitle}</div>
              <div class='scene_detail'>{scene.sceneDetail}</div>
            </div>
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

export type SceneScenarioType = ParentProps & {
  
}

const SceneScenario: Component<SceneScenarioType> = (props: SceneScenarioType) => {

  const [ selectedGroup, setSelectedGroup ]: Signal<{key: string, value: string}> = createSignal({key: '', value: ''})
  const [ searchText, setSearchText ]: Signal<string> = createSignal('')
  createEffect(() => {
    console.log(`SelectedGroup: [`, selectedGroup(), ']')
    if (selectedGroup().key === 'AllItem') {
      setviewSceneList(sceneList)
    } else {
      setviewSceneList(sceneList.filter(f => f.sceneGroup === selectedGroup().key))
    }
  })

  const handleSearchSubmit = () => {
    console.log(`SubmitSearch: [${searchText()}]`)
  }

  return (
    <div class={SceneScenarioClass}>
      <div class='topbar_content'>
        <span>{'グループ： '}</span>
        <SelectItemList
            itemList={itemList}
            setSelectedItem={setSelectedGroup}
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
