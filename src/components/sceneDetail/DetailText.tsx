import SelectItemList from '../../components/common/selectItemList/selectItemList';
import { Component, createSignal, ParentProps, Signal } from 'solid-js';
import { css } from "solid-styled-components";
import CustomTextArea from './CustomTextArea';
import FileSelector from './FileSelector';

const TextPropertyClass = css`
  margin-bottom: 5px;
  display:flex;
  width: 100%;
  height: fit-content;
`;

export type DetailTextType = ParentProps & {
  sceneText?: string,
  onSceneUpdate: (text: string | null) => void
}

type selectedListType = {
  key: string,
  value: string
}

const DetailText: Component<DetailTextType> = (props: DetailTextType) => {
  const speakerList = [
    {
      itemKey: 'custom',
      itemName: 'カスタム'
    },
    {
      itemKey: '2',
      itemName: '星野・ニャー'
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

  const fontList = [
    {
      itemKey: 'font0',
      itemName: 'テーマ設定'
    },
    {
      itemKey: 'font1',
      itemName: '木村ゴシック'
    },
    {
      itemKey: 'font2',
      itemName: '木村明朝'
    },
  ]

  const fontSizeList = [
    {
      itemKey: '9',
      itemName: '9pt'
    },
    {
      itemKey: '10',
      itemName: '10pt'
    },
    {
      itemKey: '11',
      itemName: '11pt'
    },
    {
      itemKey: '12',
      itemName: '12pt'
    },
  ]

  const [selectedGroupKey, setSelectedGroupKey]: Signal<selectedListType> = createSignal({ key: '', value: '' })

  return (
    <>
      <div class={TextPropertyClass}>
        <div style='flex-grow: 1;'>
          <SelectItemList
            itemList={speakerList}
            setSelectedItem={setSelectedGroupKey}
            hasCustom={true}
            defaultValue={{ key: 'custom', value: 'カスタム' }}
            width={'10rem'} />
        </div>
        <div style='flex-grow: 3; display: flex; justify-content: flex-end;'>
          <SelectItemList
            itemList={fontList}
            setSelectedItem={setSelectedGroupKey}
            defaultValue={{ key: 'font0', value: 'テーマ設定' }}
            width={'6rem'} />
          <SelectItemList
            itemList={fontSizeList}
            setSelectedItem={setSelectedGroupKey}
            defaultValue={{ key: '9', value: '9pt' }}
            width={'4rem'} />
          <FileSelector default='テキストエフェクトなし' fileName='' />
        </div>
      </div>
      <CustomTextArea onSceneUpdate={props.onSceneUpdate}>
        {props.sceneText === '' ? 'テキストを入力してください' : props.sceneText}
      </CustomTextArea>
    </>
  );
};

export default DetailText;
