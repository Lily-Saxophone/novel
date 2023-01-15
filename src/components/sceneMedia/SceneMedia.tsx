import { Component, createEffect, createSignal, For, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import LeftSideBarPage from '../common/sideBarPage/LeftSideBarPage';
import SelectItemList from '../common/selectItemList/selectItemList';
import SearchBox from '../common/searchBox/searchBox';
import VerticalTabPage from '../../components/common/verticalTabPage/VerticalTabPage';

const SceneMediaClass = css`
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

    .characters {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      &::after {
        content: "";
        width: calc(85px + 1.3px * 2);
        height: calc(85px + 1.3px * 2);
        padding: 7px;
      }

      .character_wrapper {
        width: calc(85px + 1.3px * 2);
        height: calc(85px + 1.3px * 2);
        padding: 7px;

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

const musicList = [
  {
    musicKey: 'musicA-1',
    musicPath: '',
    musicName: 'ぽんぬの囁き'
  },
  {
    musicKey: 'musicA-1',
    musicPath: '',
    musicName: 'ぽんぬの嘆き'
  },
  {
    musicKey: 'musicA-1',
    musicPath: '',
    musicName: 'ぽんぬの叫び'
  }
]

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
export type SceneMediaType = ParentProps & {

}

const SceneMedia: Component<SceneMediaType> = (props: SceneMediaType) => {
  const [viewMusicList, setViewMusicList]: Signal<{ musicKey: string, musicPath: string, musicName: string }[]> = createSignal(musicList)

  const music = () => {
    const [selectedMusicKey, setSelectedMusicKey]: Signal<string> = createSignal(musicList[0].musicKey)

    const handlemusicClick = (key: string) => {
      setSelectedMusicKey(key)
    }

    return (
      <div class='music'>
        <For each={viewMusicList()} fallback={<div>No Items...</div>}>
          {music => (
            <div class='music_wrapper' data-is-active={music.musicKey === selectedMusicKey()} onClick={() => handlemusicClick(music.musicKey)}>
              <div class='music_thumbnail'>
                {/* <img src={music.musicImage} alt="" /> */}
              </div>
            </div>
          )}
        </For>
      </div>
    )
  }


  const [viewCharacterList, setViewCharacterList]: Signal<{ characterKey: string, characterImage: string, characterName: string, characterGroup: string }[]> = createSignal(characterList)

  const characters = () => {
    const [selectedCharacterKey, setSelectedCharacterKey]: Signal<string> = createSignal(characterList[0].characterKey)

    const handleCharacterClick = (key: string) => {
      setSelectedCharacterKey(key)
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

  const characterPageItemList = [
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



  const [selectedGroup, setSelectedGroup]: Signal<{ key: string, value: string }> = createSignal({ key: '', value: '' })
  const [searchText, setSearchText]: Signal<string> = createSignal('')
  createEffect(() => {
    if (selectedGroup().key === 'AllItem') {
      setViewCharacterList(characterList)
    } else {
      setViewCharacterList(characterList.filter(f => f.characterGroup === selectedGroup().key))
    }
  })

  const handleSearchSubmit = () => {
  }

  const characterPage = (
    <>
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
          itemList={characterPageItemList}
        />
      </div>
    </>
  )

  const musicPage = (
    <></>
  )

  const motionPage = (
    <></>
  )

  const tabItemList = [
    {
      icon: <span class="material-symbols-outlined">person</span>,
      title: 'キャラクター',
      content: characterPage
    },
    {
      icon: <span class="material-symbols-outlined">music_note</span>,
      title: '音楽・SE',
      content: musicPage
    },
    {
      icon: <span class="material-symbols-outlined">sensors</span>,
      title: 'モーション',
      content: motionPage
    },
  ]

  return (
    <div class={SceneMediaClass}>
      <VerticalTabPage itemList={tabItemList}>

      </VerticalTabPage>
    </div>
  );
};

export default SceneMedia;
