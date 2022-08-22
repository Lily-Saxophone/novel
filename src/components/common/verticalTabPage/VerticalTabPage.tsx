import { Component, createSignal, For, JSXElement, ParentProps, Show, Signal } from 'solid-js'
import { css } from "solid-styled-components"

const VerticalTabPageClass = css`
  height: 100%;
  background-color: #333333;
  z-index: 11;
  box-shadow:
  2px 0 2px 2px rgba(0, 0, 0, .15),
  3px 0 3px 3px rgba(0, 0, 0, .08),
  4px 0 4px 4px rgba(0, 0, 0, .05);

  & > ul {
    list-style: none;
    padding-inline-start: 0;
    margin: 0;
    overflow-y: scroll;
    max-height: 100%;
    cursor: default;
    display: flex;

    & > li {
      text-align: center;
      color: #cccccc;
      height: fit-content;
      transition-duration: 0.5s;
      font-size: 1rem;
      margin-top: -1em;
      padding: 1.2em 1em 1em 1em;

      &:hover {
        background-color: #4d4d4d;
      }

      & > .text {
        margin-top: 5em;
      }
    }

    & > li:not(:last-child) {
      border-right: solid 0.5px #cccccc;
    }

    .isSelected {
      background-color: #4d4d4d;
    }
  }
`

export type TabItem = {
  icon?: JSXElement,
  title: string,
  content: JSXElement
}

export type VerticalTabPageType = ParentProps & {
  height?: number,
  itemList: TabItem[]
}

const VerticalTabPage: Component<VerticalTabPageType> = (props: VerticalTabPageType) => {

  const [ selectedItemKey, setSelectedItemKey ]: Signal<number> = createSignal(0)

  const handleItemClick = (obj: { key: number, value: string }) => {
    setSelectedItemKey(obj.key)
  }

  const height = props.height === undefined ? 30 : props.height

  return (
    <div class={VerticalTabPageClass} style={'height:' + height + 'px'}>
      <ul>
        <For each={props.itemList} fallback={<div>Loading...</div>}>
          {(item: TabItem, index) => (
            <li data-item-idex={index()} classList={{ isSelected: index() === selectedItemKey() }}
              onClick={() => handleItemClick({ key: index(), value: item.title })}>
              {item.icon}
              <span class='text'>{item.title}</span>
            </li>
          )}
        </For>
      </ul>
      <div>
        <For each={props.itemList} fallback={<div>Loading...</div>}>
          {(item: TabItem, index) => (
            <Show when={index() === selectedItemKey()}>
              <div data-item-idex={index()}>
                {item.content}
              </div>
            </Show>
          )}
        </For>
      </div>
    </div>
  )
}

export default VerticalTabPage
