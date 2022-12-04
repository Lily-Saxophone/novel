import { SlideCharacter } from "./SlideCharacter";
import { SlideText } from "./SlideText";

export type SlideModel = {
  backGroundImage: string,
  backGroundMusic: string,
  characterList: Array<SlideCharacter>,
  slideText: SlideText,
}