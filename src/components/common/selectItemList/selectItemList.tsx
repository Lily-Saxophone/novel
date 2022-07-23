import { Component, createSignal, For, ParentProps, Setter, Show, Signal } from 'solid-js';
import { css } from "solid-styled-components";

const SelectItemListClass = css`
  margin: 5px;
  margin-top: 0;

  .select_items {
    width: 200px;
    height: 20px;
    position: relative;
    user-select: none;
  }

  .select_list {
    width: 100%;
    height: 100%;
    border-bottom: solid 1px #C5C5C5;
    font-size: .7rem;
    line-height: 200%;
    position: relative;

    &_opener:before {
      position: absolute;
      top: 8px;
      right: 5px;
      width: 0;
      height: 0;
      padding: 0;
      content: '';
      z-index: 2;
      pointer-events: none;
      -webkit-transition: all 100ms cubic-bezier(.4, .25, .3, 1);
      transition: all 100ms cubic-bezier(.4, .25, .3, 1);
    }

    &_opener[data-is-open='true']:before {
      border-right: 6px solid transparent;
      border-bottom: 6px solid #C5C5C5;
      border-left: 6px solid transparent;
    }

    &_opener[data-is-open='false']:before {
      border-top: 6px solid #C5C5C5;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
    }

    .selected_item_label {
      margin-left: 10px;
      display: block;

      &[contenteditable] {
        position: relative;
        padding-left: 3px;
        font-size: .8rem;
        text-align: left;

        &:focus {
          outline: 0px solid transparent;
        }
      }
    }

    &_options {
      width: 100%;
      padding-top: 5px;
      background-color: #404040;
      position: absolute;
      z-index: 99;

      & > div {
        transition: .6s;
        padding-left: 10px;
      }

      & > div:hover {
        background-color: #606060;
      }
    }
  }
`;

type ItemType = { itemKey: string, itemName: string }

export type SelectItemListType = ParentProps & {
  itemList: ItemType[]
  setSelectedItem: Setter<{ key: string, value: string }>,
  defaultValue?: { key: string, value: string },
  width?: string,
  hasCustom?: boolean,
  viewCustomLabel?: string
}

const SelectItemList: Component<SelectItemListType> = (props: SelectItemListType) => {

  const defaultCustomLabel = props.viewCustomLabel ?? 'カスタム'
  if (props.hasCustom)
    props.itemList.push({ itemKey: 'custom', itemName: defaultCustomLabel })

  const defaultValue = props.defaultValue ?? { key: 'AllItem', value: '' }
  const width = props.width ?? '10rem'
  const defaultName = props.itemList.find(x => x.itemKey == defaultValue.key)?.itemName
  props.setSelectedItem(defaultValue)

  let selectedItemKey = ''
  const [isEditable, setIsEditable]: Signal<boolean> = createSignal(false)
  const handleItemClick = (obj: { key: string, value: string }) => {
    setSelectedItemName(props.itemList.find(x => x.itemKey == obj.key)?.itemName ?? '')

    selectedItemKey = obj.key
    setIsEditable(obj.key === 'custom')
    if (!isEditable())
      props.setSelectedItem({ key: obj.key, value: obj.value })
  }

  const handleChangeText = (e: KeyboardEvent) => {
    if (e.key === 'Enter')
      e.preventDefault()

    if (isEditable()) {
      const text = (e.target as HTMLDivElement).innerText
      props.setSelectedItem({ key: selectedItemKey, value: text })
    }
  }

  const [selectedItemName, setSelectedItemName]: Signal<string> = createSignal(defaultName ?? '')
  const [isOpen, setIsOpen]: Signal<boolean> = createSignal(false)

  return (
    <div class={SelectItemListClass}>
      <div class='select_items' style={`width:${width};`}>
        <div class='select_list' onClick={() => setIsOpen(!isOpen())}>
          <i class='select_list_opener' data-is-open={isOpen()}></i>
          <label
            class='selected_item_label'
            contentEditable={isEditable()}
            onKeyUp={(e) => handleChangeText(e)}>
            {selectedItemName()}
          </label>
          <Show when={isOpen()}>
            <div class='select_list_options'>
              <For each={props.itemList} fallback={<div>Loading...</div>}>
                {(item: ItemType, index) => (
                  <div data-item-idex={index()}
                    data-item-key={item.itemKey}
                    onClick={() => handleItemClick({ key: item.itemKey, value: item.itemName })}>
                    {item.itemName}
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default SelectItemList;
