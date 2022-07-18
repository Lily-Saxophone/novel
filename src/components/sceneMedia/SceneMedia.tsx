import { Component, createEffect, createSignal, For, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';
import SelectItemList from '../common/selectItemList/selectItemList';
import SearchBox from '../common/searchBox/searchBox';

const SceneMediaClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  overflow-y: hidden;

  &> span {
    font-size: .7rem;
    display: inline-block;
    margin: auto 5px;
  }

  .left_sidebar {
    width: 100%;
    height: 100%;

    .characters {
      display: flex;
      flex-wrap: wrap;
      justify-content: start;

      .character_wrapper {
        width: calc(85px + 1.3px * 2);
        height: calc(85px + 1.3px * 2);
        padding: 7px;

        &::after {
          display: block;
          content:"";
          width: calc(85px + 1.3px * 2);
          height: calc(85px + 1.3px * 2);
          padding: 7px;
        }

        &[data-is-active='true'] {
          background-color: #606060;
        }

        .character_thumbnail {
          width: 100%;
          display: flex;
  
          img {
            width: 100%;
            border-radius: 6px;
            border: solid 1.3px #555555;
            box-shadow: 1px 0 4px 2px rgb(0 0 0 / 20%);
          }
        }
      }
    }
  }
`;

const characterList = [
  {
    characterKey: 'characterA-1',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'ぽんぬ',
    characterGroup: 'GroupA'
  },
  {
    characterKey: 'characterA-2',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'やまも',
    characterGroup: 'GroupB'
  },
  {
    characterKey: 'characterA-3',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'こいたん',
    characterGroup: 'GroupA'
  },
  {
    characterKey: 'characterA-4',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'ニャー',
    characterGroup: 'GroupB'
  },
  {
    characterKey: 'characterA-5',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'ニャー',
    characterGroup: 'GroupB'
  },
  {
    characterKey: 'characterA-6',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'ニャー',
    characterGroup: 'GroupB'
  },
  {
    characterKey: 'characterA-7',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'ニャー',
    characterGroup: 'GroupB'
  },
  {
    characterKey: 'characterA-8',
    characterImage: 'https://via.placeholder.com/85x85',
    characterName: 'ニャー',
    characterGroup: 'GroupB'
  },
]

const itemList = [
  {
    itemKey: 'AllItem',
    itemName: '全て'
  },
  {
    itemKey: 'GroupA',
    itemName: 'メインキャラクター'
  },
  {
    itemKey: 'GroupB',
    itemName: 'サブキャラクター'
  },
  {
    itemKey: 'GroupC',
    itemName: 'モブ'
  },
]

const [viewCharacterList, setViewCharacterList]: Signal<{ characterKey: string, characterImage: string, characterName: string, characterGroup: string }[]> = createSignal(characterList)

const characters = () => {  
  const [selectedCharacterKey, setSelectedCharacterKey]: Signal<string> = createSignal(characterList[0].characterKey)

  const handleCharacterClick = (key: string) => {
    setSelectedCharacterKey(key)
    console.log(`SelectedSceneKey: [${key}]`)
  }

  return (
    <div class='characters'>
      <For each={viewCharacterList()} fallback={<div>No Items...</div>}>
        {character => (
          <div class='character_wrapper' data-is-active={character.characterKey === selectedCharacterKey()} onClick={() => handleCharacterClick(character.characterKey)}>
            <div class='character_thumbnail'>
              <img src={character.characterImage} alt="" />
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

const scenarioList = [
  {
    title: 'ぽんぬ',
    contents: characters()
  },
  {
    title: '星野・ニャー',
    contents: <div>コンテンツ２</div>
  },
  {
    title: 'えりちゃん',
    contents: <div>コンテンツ３</div>
  },
  {
    title: 'しなしな',
    contents: <div>コンテンツ４</div>
  },
]

export type SceneMediaType = ParentProps & {
  
}

const SceneMedia: Component<SceneMediaType> = (props: SceneMediaType) => {

  const [ selectedGroupKey, setSelectedGroupKey ]: Signal<string> = createSignal('')
  const [ searchText, setSearchText ]: Signal<string> = createSignal('')
  createEffect(() => {
    console.log(`SelectedCharacterGroup: [${selectedGroupKey()}]`)
    if (selectedGroupKey() === 'AllItem') {
      setViewCharacterList(characterList)
    } else {
      setViewCharacterList(characterList.filter(f => f.characterGroup === selectedGroupKey()))
    }
  })

  const handleSearchSubmit = () => {
    console.log(`SubmitSearch: [${searchText()}]`)
  }

  return (
    <div class={SceneMediaClass}>
      <span>{'グループ： '}</span>
      <SelectItemList 
          itemList={itemList}
          setSelectedItemKey={setSelectedGroupKey}
          defaultValue={'AllItem'} 
          width={190} />

      <SearchBox
        setText={setSearchText}
        onSubmitButtonClick={handleSearchSubmit}
        defaultValue={''}
        width={120} />

      <div class='left_sidebar'>
        <LeftSideBarPage
          menuWidth={25}
          itemList={scenarioList}
        />
      </div>
    </div>
  );
};

export default SceneMedia;