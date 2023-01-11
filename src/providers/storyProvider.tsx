import { Story } from "../models/scenario/Story"
import { createSignal, createContext, useContext, ParentProps, Component, Signal } from "solid-js"
import { createStore, Store } from "solid-js/store"
import { ScenarioModel } from "../models/scenario/Scenario"

export type StoryProviderType = ParentProps & {
  story?: number
}
const StoryContext = createContext([{ story: {} }, {}])

const models: ScenarioModel[] = []

const StoryProvider: Component<StoryProviderType> = (props: StoryProviderType) => {
  // const [count, setCount] = createSignal(props.story || 0),
  const [story, setStory]: Signal<Story> = createSignal({ story: models })
  const store = [
    story,
    {}
  ]

  return (
    <StoryContext.Provider value={store}>
      {props.children}
    </StoryContext.Provider>
  )
}

export const useStory = () => {
  return useContext(StoryContext)
}

export default StoryProvider