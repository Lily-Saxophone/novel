import { Component, ParentProps, Setter } from 'solid-js';
import { css } from "solid-styled-components";

const SearchBoxClass = css`
  margin: 5px;
  margin-top: 0;
  
  .search_box_wrapper {
    width: 200px;
    height: 20px;
    position: relative;
    user-select: none;
  }
  
  .search_box {
    width: 100%;
    height: 100%;
    border-bottom: solid 1px #C5C5C5;
    font-size: .7rem;
    line-height: 200%;
    position: relative;

    .searchInput[contenteditable] {
      position: relative;
      padding-left: 3px;
      font-size: .8rem;
      text-align: left;

      &:focus {
        outline: 0px solid transparent;
      }
    }

    i {
      position: absolute;
      font-size: 1.3rem;
      right: 0;
      bottom: -4px;
    }
  }
`;

export type SearchBoxType = ParentProps & {
  setText: Setter<string>,
  onSubmitButtonClick: () => void,
  defaultValue?: string,
  width?: string
}

const SearchBox: Component<SearchBoxType> = (props: SearchBoxType) => {
  
  const defaultValue = props.defaultValue ?? ''
  const width = props.width ?? '6rem'

  const handleChangeText = (e: KeyboardEvent) => {
    const text = (e.target as HTMLDivElement).innerText
    if (e.key !== 'Enter') {
      props.setText(text)
    } else {
      e.preventDefault()
      props.setText(text.replace('\n', ''))
      props.onSubmitButtonClick()
    }
  }

  const handleButtonClick = () => {
    props.onSubmitButtonClick()
  }

  return (
    <div class={SearchBoxClass}>
      <div class='search_box_wrapper' style={`width:${width};`}>
        <div class='search_box'>
          <div
            class='searchInput'
            contentEditable={true}
            onKeyUp={(e) => handleChangeText(e)}>
            {defaultValue}
          </div>
          <i class="material-symbols-outlined"
             onClick={() => handleButtonClick()}>
            search
          </i>

        </div>
      </div>
    </div>
  );
};

export default SearchBox;
