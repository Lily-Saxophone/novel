import { Component, JSX, ParentProps } from 'solid-js';
import { css } from "solid-styled-components";
import DetailScene from './DetailScene';
import DetailItem from './DetailItem';
import DetailText from './DetailText';
import DetailCharacter from './DetailCharacter';
import { SceneModel } from '../../models/scene/SceneModel';
import { ChoicesEvent } from '../../models/scene/ChoicesEvent';
import { EndEvent } from '../../models/scene/EndEvent';

const BasicSettingsClass = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  `;

export type BasicSettingsType = ParentProps & {
  scene: SceneModel | ChoicesEvent | EndEvent,
  onSceneUpdate?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>,
}

const BasicSettings: Component<BasicSettingsType> = (props: BasicSettingsType) => {
  return (
    <div class={BasicSettingsClass}>
      <DetailItem title='テキスト'>
        <DetailText
          sceneText={(props.scene as SceneModel)?.sceneText?.text}
        />
      </DetailItem>
      <DetailItem title='キャラクター'>
        <DetailCharacter characterList={(props.scene as SceneModel).characterList} />
      </DetailItem>
      <DetailItem title='シーン'>
        <DetailScene
          backGroundName=''
          backGroundSrc={(props.scene as SceneModel).backGroundImage}
          bgmSrc={(props.scene as SceneModel).backGroundMusic}
          motionSrc='effect/scene/切り替えアニメーション１'
          seSrc=''
        />
      </DetailItem>
    </div>
  );
};

export default BasicSettings;
